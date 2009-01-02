
CREATE OR REPLACE FUNCTION postARCreditMemoApplication(INTEGER) RETURNS INTEGER AS '
DECLARE
  pAropenid ALIAS FOR $1;
  _p RECORD;
  _r RECORD;
  _totalAmount NUMERIC := 0;
  _exchGain NUMERIC := 0;
  _result NUMERIC;

BEGIN

  SELECT aropen_docnumber,
         ROUND(aropen_amount - aropen_paid, 2) AS balance,
         aropen_open,
         ROUND(SUM(currToCurr(arcreditapply_curr_id, aropen_curr_id,
              COALESCE(arcreditapply_amount, 0), aropen_docdate)), 2) AS toApply INTO _p
  FROM aropen, arcreditapply
  WHERE ( (arcreditapply_source_aropen_id=aropen_id)
   AND (aropen_id=pAropenid) )
  GROUP BY aropen_docnumber, aropen_amount, aropen_paid, aropen_open;
  IF (NOT FOUND) THEN
    RETURN -1;
  ELSIF (_p.toApply = 0) THEN
    RETURN -2;
  ELSIF (_p.toApply > _p.balance) THEN
    RETURN -3;
  END IF;

  SELECT aropen_cust_id, aropen_docnumber, aropen_doctype, aropen_amount,
         aropen_curr_id, aropen_docdate, aropen_accnt_id, aropen_cust_id INTO _p
  FROM aropen
  WHERE (aropen_id=pAropenid);
  IF (NOT FOUND) THEN
    RETURN -5;
  END IF;

  FOR _r IN SELECT arcreditapply_id, arcreditapply_target_aropen_id,
                   arcreditapply_amount AS arcreditapply_amountSource,
                   currToCurr(arcreditapply_curr_id, aropen_curr_id,
                              arcreditapply_amount, aropen_docdate) AS arcreditapply_amountTarget,
                   aropen_id, aropen_doctype, aropen_docnumber, aropen_docdate
            FROM arcreditapply, aropen
            WHERE ( (arcreditapply_source_aropen_id=pAropenid)
             AND (arcreditapply_target_aropen_id=aropen_id) ) LOOP

    IF (_r.arcreditapply_amountTarget IS NULL) THEN
      RETURN -4;
    END IF;

    IF (_r.arcreditapply_amountTarget > 0) THEN

--  Update the aropen item to post the paid amount
      UPDATE aropen
      SET aropen_paid = round(aropen_paid + _r.arcreditapply_amountTarget, 2)
      WHERE (aropen_id=_r.arcreditapply_target_aropen_id);

      UPDATE aropen
      SET aropen_open = (round(aropen_amount, 2) > round(aropen_paid, 2))
      WHERE (aropen_id=_r.arcreditapply_target_aropen_id);

--  Cache the running amount posted
      _totalAmount := (_totalAmount + _r.arcreditapply_amountSource);

--  Record the application
      INSERT INTO arapply
      ( arapply_cust_id,
        arapply_source_aropen_id, arapply_source_doctype, arapply_source_docnumber,
        arapply_target_aropen_id, arapply_target_doctype, arapply_target_docnumber,
        arapply_fundstype, arapply_refnumber,
        arapply_applied, arapply_closed, arapply_postdate, arapply_distdate,
        arapply_journalnumber, arapply_username, arapply_curr_id )
      VALUES
      ( _p.aropen_cust_id,
        pAropenid, _p.aropen_doctype, _p.aropen_docnumber,
        _r.aropen_id, _r.aropen_doctype, _r.aropen_docnumber,
        '''', '''',
        round(_r.arcreditapply_amountSource, 2), TRUE, CURRENT_DATE, CURRENT_DATE,
        0, CURRENT_USER, _p.aropen_curr_id );

    END IF;

--  Delete the posted arcreditapply record
    DELETE FROM arcreditapply
    WHERE (arcreditapply_id=_r.arcreditapply_id);

    _exchGain := round(currGain(_p.aropen_curr_id, _r.arcreditapply_amountSource,
                                _r.aropen_docdate, _p.aropen_docdate), 2);
    IF (_exchGain <> 0) THEN
        PERFORM insertGLTransaction(fetchJournalNumber(''AR-MISC''), ''A/R'',
                                    ''CR'', _p.aropen_doctype,
                                    _p.aropen_docnumber,
                                    getGainLossAccntId(),
                                    CASE WHEN (_p.aropen_accnt_id = -1) THEN
                                        findARAccount(_p.aropen_cust_id)
                                        ELSE _p.aropen_accnt_id
                                        END,
                                    -1, _exchGain * -1, CURRENT_DATE);
    END IF;

  END LOOP;

-- TODO: If this is a Customer Deposit (aropen_doctype=''R'')
--       the we need to convert the total to a base transaction
  IF(_p.aropen_doctype=''R'') THEN
    SELECT insertGLTransaction(fetchJournalNumber(''AR-MISC''), ''A/R'',
                               ''CD'', _p.aropen_doctype, _p.aropen_docnumber,
                               cr.accnt_id, db.accnt_id, -1,
                               currToBase(_p.aropen_curr_id, _totalAmount, _p.aropen_docdate),
                               CURRENT_DATE)
      INTO _result
      FROM accnt AS cr, accnt AS db
     WHERE ((db.accnt_id = findDeferredAccount(_p.aropen_cust_id))
       AND  (cr.accnt_id = findARAccount(_p.aropen_cust_id)) );
    IF(NOT FOUND OR _result < 0) THEN
      RAISE EXCEPTION ''There was an error posting the Customer Deposit GL Transactions.'';
    END IF;
  END IF;

--  Record the amount posted and mark the source aropen as closed if it is completely posted
  UPDATE aropen
  SET aropen_paid = round(aropen_paid + _totalAmount, 2)
  WHERE (aropen_id=pAropenid);

  UPDATE aropen
  SET aropen_open = (round(aropen_amount, 2) > round(aropen_paid, 2))
  WHERE (aropen_id=pAropenid);

  RETURN pAropenid;

END;
' LANGUAGE 'plpgsql';

