
CREATE OR REPLACE FUNCTION applyARCreditMemoToBalance(INTEGER) RETURNS INTEGER AS '
DECLARE
  pAropenid ALIAS FOR $1;
  _amount NUMERIC;
  _amountcurrid INTEGER;
  _applyAmount NUMERIC;
  _applycurrid  INTEGER;
  _r RECORD;
  _p RECORD;

BEGIN

--  Find the balance to apply
  SELECT (aropen_amount - COALESCE(SUM(currToCurr(arcreditapply_curr_id,
                                                  aropen_curr_id,
                                                  arcreditapply_amount,
                                                  aropen_docdate)), 0) - aropen_paid),
         aropen_curr_id INTO _amount, _amountcurrid
  FROM aropen LEFT OUTER JOIN arcreditapply ON (arcreditapply_source_aropen_id=aropen_id)
  WHERE (aropen_id=pAropenid)
  GROUP BY aropen_amount, aropen_paid, aropen_curr_id;

  IF (_amount < 0) THEN
    RETURN -1;
  END IF;

--  Loop through the aropen items in order of due date
  FOR _r IN SELECT target.aropen_id AS aropenid,
                   (target.aropen_amount - target.aropen_paid) AS balance,
                   target.aropen_curr_id AS curr_id,
                   target.aropen_docdate AS docdate
            FROM aropen AS target, aropen AS source
            WHERE ( (source.aropen_cust_id=target.aropen_cust_id)
             AND (target.aropen_doctype IN (''D'', ''I''))
             AND (target.aropen_open)
             AND (source.aropen_id=pAropenid) )
            ORDER BY target.aropen_duedate, (target.aropen_amount - target.aropen_paid) LOOP

--  Determine the amount to apply
    IF (_r.balance > _amount) THEN
      _applyAmount := _amount;
      _applycurrid := _amountcurrid;
    ELSE
      _applyAmount := _r.balance;
      _applycurrid := _r.curr_id;
    END IF;

--  Does an arcreditapply record already exist?
    SELECT arcreditapply_id,
           arcreditapply_amount,
           currToCurr(arcreditapply_curr_id, _applycurrid,
                      arcreditapply_amount, _r.docdate) AS
                      arcreditapply_amount_applycurr INTO _p
    FROM arcreditapply
    WHERE ( (arcreditapply_target_aropen_id=_r.aropenid)
     AND (arcreditapply_source_aropen_id=pAropenid) );

    IF (FOUND) THEN
--  Offset the amount to apply by the amount already applied
      _applyAmount := (_applyAmount - _p.arcreditapply_amount_applycurr);
      IF (_applyAmount < 0) THEN
        _applyAmount := 0;
      END IF;

--  Update the arcreditapply with the new amount to apply
      UPDATE arcreditapply
      SET arcreditapply_amount = round(arcreditapply_amount +
                                       currToCurr(_applycurrid,
                                                  arcreditapply_curr_id,
                                                  _applyAmount, _r.docdate), 2)
      WHERE (arcreditapply_id=_p.arcreditapply_id);

    ELSE
--  Create a new arcreditapply record
      INSERT INTO arcreditapply
      ( arcreditapply_source_aropen_id, arcreditapply_target_aropen_id,
        arcreditapply_amount, arcreditapply_curr_id )
      VALUES
      ( pAropenid, _r.aropenid, _applyAmount, _applycurrid );
    END IF;

    _amount := _amount - currToCurr(_applycurrid, _amountcurrid, _applyAmount, _r.docdate);
    IF (_amount = 0) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

