
CREATE OR REPLACE FUNCTION applyARMemoToBalance(INTEGER) RETURNS INTEGER
    AS '
DECLARE
  pArmemoid ALIAS FOR $1;
  _amount NUMERIC;
  _applyAmount NUMERIC;
  _armemoitemid INTEGER;
  _r RECORD;
  _p RECORD;

BEGIN

--  Find the balance to apply
  SELECT (armemo_amount - COALESCE(SUM(armemoitem_amount), 0)) INTO _amount
  FROM armemo LEFT OUTER JOIN armemoitem ON (armemoitem_armemo_id=armemo_id)
  WHERE (armemo_id=pArmemoid)
  GROUP BY armemo_amount;

--  Loop through the aropen item in order of due date
  FOR _r IN SELECT aropen_id,
               currToCurr(aropen_curr_id, armemo_curr_id,
                          aropen_amount - aropen_paid, aropen_docdate) AS balance,
               armemo_curr_id
            FROM aropen, armemo
            WHERE ( (aropen_cust_id=armemo_cust_id)
             AND (aropen_doctype=''I'')
             AND (aropen_open)
             AND (armemo_id=pArmemoid) )
            ORDER BY aropen_duedate, (aropen_amount - aropen_paid) LOOP

--  Determine the amount to apply
    IF (_r.balance > _amount) THEN
      _applyAmount := _amount;
    ELSE
      _applyAmount := _r.balance;
    END IF;

--  Does an armemoitem already exist?
--  ToDo - this does not look right: the join is not restricted!
    SELECT armemoitem_id, armemoitem_amount INTO _p
    FROM armemoitem, armemo
    WHERE ( (armemoitem_aropen_id=_r.aropen_id)
     AND (armemoitem_armemo_id=pArmemoid) );

    IF (FOUND) THEN
--  Offset the amount to apply by the amount already applied
      _applyAmount := (_applyAmount - _p.armemoitem_amount);
      IF (_applyAmount < 0) THEN
        _applyAmount := 0;
      END IF;

--  Update the armemoitem with the new amount to apply
      UPDATE armemoitem
      SET armemoitem_amount = round(armemoitem_amount + _applyAmount, 2)
      WHERE (armemoitem_id=_p.armemoitem_id);

    ELSE
--  Create a new armemoitem
      SELECT NEXTVAL(''armemoitem_armemoitem_id_seq'') INTO _armemoitemid;
      INSERT INTO armemoitem
      ( armemoitem_id, armemoitem_aropen_id, armemoitem_armemo_id,
        armemoitem_amount, armemo_curr_id )
      VALUES
      ( _armemoitemid, _r.aropen_id, pArmemoid,
        round(_applyAmount, 2), _r.armemo_curr_id );
    END IF;

    _amount := (_amount - _applyAmount);
    IF round(_amount, 2) = 0 THEN
      EXIT;
    END IF;

  END LOOP;

  RETURN 1;

END;
' LANGUAGE plpgsql;

