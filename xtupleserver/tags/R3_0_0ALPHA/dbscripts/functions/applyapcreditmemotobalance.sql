CREATE OR REPLACE FUNCTION applyAPCreditMemoToBalance(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApopenid ALIAS FOR $1;
  _amount NUMERIC;
  _curr_id INTEGER;
  _docdate DATE;
  _applyAmount NUMERIC;
  _r RECORD;
  _p RECORD;

BEGIN

--  Find the balance to apply
  SELECT (apopen_amount - COALESCE(SUM(currToCurr(apcreditapply_curr_id,
                                                  apopen_curr_id,
                                                  apcreditapply_amount,
                                                  apopen_docdate)), 0)),
          apopen_curr_id, apopen_docdate INTO _amount, _curr_id, _docdate
  FROM apopen LEFT OUTER JOIN apcreditapply ON (apcreditapply_source_apopen_id=apopen_id)
  WHERE (apopen_id=pApopenid)
  GROUP BY apopen_amount, apopen_curr_id, apopen_docdate;

  IF (_amount < 0) THEN
    RETURN -1;
  END IF;

--  Loop through the apopen items in order of due date
  FOR _r IN SELECT target.apopen_id AS apopenid,
                   currToCurr(target.apopen_curr_id, _curr_id,
                              target.apopen_amount - target.apopen_paid,
                              _docdate) AS balance
           FROM apopen AS target, apopen AS source
            WHERE ( (source.apopen_vend_id=target.apopen_vend_id)
             AND (target.apopen_doctype IN (''V'', ''D''))
             AND (target.apopen_open)
             AND (source.apopen_id=pApopenid) )
            ORDER BY target.apopen_duedate, (target.apopen_amount - target.apopen_paid) LOOP

--  Determine the amount to apply
    IF (_r.balance > _amount) THEN
      _applyAmount := _amount;
    ELSE
      _applyAmount := _r.balance;
    END IF;

--  Does an apcreditapply record already exist?
    SELECT apcreditapply_id, currToCurr(apcreditapply_curr_id, _curr_id,
                                        apcreditapply_amount, _docdate) AS apcreditapply_amount INTO _p
    FROM apcreditapply
    WHERE ( (apcreditapply_target_apopen_id=_r.apopenid)
     AND (apcreditapply_source_apopen_id=pApopenid) );

    IF (FOUND) THEN
--  Offset the amount to apply by the amount already applied
      _applyAmount := (_applyAmount - _p.apcreditapply_amount);
      IF (_applyAmount < 0) THEN
        _applyAmount := 0;
      END IF;

--  Update the apcreditapply with the new amount to apply
      UPDATE apcreditapply
      SET apcreditapply_amount = (apcreditapply_amount + currToCurr(_curr_id,
                                                        apcreditapply_curr_id,
                                                        _applyAmount, _docdate))
      WHERE (apcreditapply_id=_p.apcreditapply_id);

    ELSE
--  Create a new apcreditapply record
      INSERT INTO apcreditapply
      ( apcreditapply_source_apopen_id, apcreditapply_target_apopen_id,
        apcreditapply_amount, apcreditapply_curr_id )
      VALUES
      ( pApopenid, _r.apopenid, _applyAmount, _curr_id );
    END IF;

    _amount := (_amount - _applyAmount);
    IF (_amount = 0) THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
