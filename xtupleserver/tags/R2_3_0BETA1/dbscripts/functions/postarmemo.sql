
CREATE OR REPLACE FUNCTION postARMemo(INTEGER) RETURNS INTEGER
    AS '
DECLARE
  pArmemoid ALIAS FOR $1;
  _p RECORD;
  _r RECORD;
  _posted NUMERIC := 0;

BEGIN

  SELECT armemo_docnumber, armemo_accnt_id, armemo_amount, armemo_curr_id,
         accnt_id AS ar_accnt_id INTO _p
  FROM armemo, accnt
  WHERE ( (findARAccount(armemo_cust_id)=accnt_id)
   AND (armemo_id=pArmemoid) );
  IF (NOT FOUND) THEN
    RETURN -5;
  END IF;

  FOR _r IN SELECT armemoitem_id, armemoitem_aropen_id, armemoitem_amount
            FROM armemoitem
            WHERE (armemoitem_armemo_id=pArmemoid) LOOP

--  Update the aropen item to post the paid amount
    UPDATE aropen
    SET aropen_paid = round(aropen_paid + currToCurr(_p.armemo_curr_id,
                                                     aropen_curr_id,
                                                     _r.armemoitem_amount,
                                                     aropen_docdate), 2)
    WHERE (aropen_id=_r.armemoitem_aropen_id);

    UPDATE aropen
    SET aropen_open = (round(aropen_amount, 2) > round(aropen_paid, 2))
    WHERE (aropen_id=_r.armemoitem_aropen_id);

--  Cache the running amount posted
    _posted := (_posted + _r.armemoitem_amount);

--  Delete the posted armemoitem
    DELETE FROM armemoitem
    WHERE (armemoitem_id=_r.armemoitem_id);

  END LOOP;

-- ToDo: is CURRENT_DATE the right date to use for this currToBase?
  PERFORM insertGLTransaction( ''A/R'', ''MM'', _p.armemo_docnumber, ''Post A/R Credit Memo'',
                               _p.ar_accnt_id, _p.armemo_accnt_id, -1,
                               currToBase(_p.armemo_curr_id, _posted,
                                          CURRENT_DATE),
                               CURRENT_DATE );

--  Delete the armemo if it is completely posted
  IF (round(_posted, 2) = round(_p.armemo_amount, 2)) THEN
    DELETE FROM armemo
    WHERE (armemo_id=pArmemoid);
  ELSE
--  Reset the armemo amount
    UPDATE armemo
    SET armemo_amount = round(armemo_amount - _posted, 2)
    WHERE (armemo_id=pArmemoid);
  END IF;

  RETURN 1;

END;
' LANGUAGE plpgsql;

