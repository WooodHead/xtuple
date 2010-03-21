CREATE OR REPLACE FUNCTION postCashReceipt(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCashrcptid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  _p RECORD;
  _r RECORD;
  _postToAR NUMERIC;
  _postToMisc NUMERIC;
  _posted_base NUMERIC := 0;
  _posted NUMERIC := 0;
  _sequence INTEGER;
  _aropenid INTEGER;
  _arMemoNumber TEXT;
  _arAccntid INTEGER;
  _debitAccntid INTEGER;
  _exchGain NUMERIC;
  _comment      TEXT;

BEGIN
  _posted := 0;
  _posted_base := 0;

  SELECT fetchGLSequence() INTO _sequence;

  SELECT accnt_id INTO _arAccntid
  FROM cashrcpt, accnt, salescat
  WHERE ((cashrcpt_salescat_id=salescat_id)
    AND  (salescat_ar_accnt_id=accnt_id)
    AND  (cashrcpt_id=pCashrcptid));
  IF (NOT FOUND) THEN
    SELECT accnt_id INTO _arAccntid
    FROM cashrcpt, accnt
    WHERE ( (findARAccount(cashrcpt_cust_id)=accnt_id)
     AND (cashrcpt_id=pCashrcptid) );
    IF (NOT FOUND) THEN
      RETURN -5;
    END IF;
  END IF;

  SELECT cashrcpt_cust_id, (cust_number||''-''||cust_name) AS custnote,
         cashrcpt_fundstype, cashrcpt_docnumber,
         cashrcpt_distdate, cashrcpt_amount,
         currToBase(cashrcpt_curr_id, cashrcpt_amount, cashrcpt_distdate) AS cashrcpt_amount_base,
         cashrcpt_notes,
         cashrcpt_bankaccnt_id AS bankaccnt_id,
         accnt_id AS prepaid_accnt_id,
         cashrcpt_usecustdeposit,
         cashrcpt_curr_id INTO _p
  FROM accnt, cashrcpt LEFT OUTER JOIN cust ON (cashrcpt_cust_id=cust_id)
  WHERE ( (findPrepaidAccount(cashrcpt_cust_id)=accnt_id)
   AND (cashrcpt_id=pCashrcptid) );
  IF (NOT FOUND) THEN
    RETURN -7;
  END IF;

  IF (_p.cashrcpt_fundstype IN (''A'', ''D'', ''M'', ''V'')) THEN
    IF NOT EXISTS(SELECT ccpay_id
                  FROM ccpay
                  WHERE ((ccpay_order_number=CAST(pCashrcptid AS TEXT))
                     AND (ccpay_status IN (''C'', ''A'')))) THEN
      RETURN -8;
    END IF;
    _debitAccntid := findPrepaidAccount(_p.cashrcpt_cust_id);
  ELSE
    SELECT accnt_id INTO _debitAccntid
    FROM cashrcpt, bankaccnt, accnt
    WHERE ( (cashrcpt_bankaccnt_id=bankaccnt_id)
     AND (bankaccnt_accnt_id=accnt_id)
     AND (cashrcpt_id=pCashrcptid) );
    IF (NOT FOUND) THEN
      RETURN -6;
    END IF;
  END IF;

--  Determine the amount to post to A/R Open Items
  SELECT COALESCE(SUM(cashrcptitem_amount),0) INTO _postToAR
  FROM cashrcptitem
  WHERE (cashrcptitem_cashrcpt_id=pCashrcptid);
  IF (NOT FOUND) THEN
    _postToAR := 0;
  END IF;

--  Determine the amount to post to Misc. Distributions
  SELECT COALESCE(SUM(cashrcptmisc_amount),0) INTO _postToMisc
  FROM cashrcptmisc
  WHERE (cashrcptmisc_cashrcpt_id=pCashrcptid);
  IF (NOT FOUND) THEN
    _postToMisc := 0;
  END IF;

--  Check to see if the C/R is over applied
  IF ((_postToAR + _postToMisc) > _p.cashrcpt_amount) THEN
    RETURN -1;
  END IF;

--  Distribute A/R Applications
  FOR _r IN SELECT aropen_id, aropen_doctype, aropen_docnumber, aropen_docdate,
                   aropen_duedate, aropen_curr_id,
                   round(aropen_amount - aropen_paid, 2) <=
                        round(currToCurr(_p.cashrcpt_curr_id, aropen_curr_id,
                                   cashrcptitem_amount, aropen_docdate), 2)
                               AS closed,
                   cashrcptitem_id, cashrcptitem_amount,
                   currToBase(_p.cashrcpt_curr_id, cashrcptitem_amount,
                              aropen_docdate) AS cashrcptitem_amount_base
            FROM aropen, cashrcptitem
            WHERE ( (cashrcptitem_aropen_id=aropen_id)
             AND (cashrcptitem_cashrcpt_id=pCashrcptid) ) LOOP

--  Update the aropen item to post the paid amount
    UPDATE aropen
    SET aropen_paid = round(aropen_paid + currToCurr(_p.cashrcpt_curr_id,
                                                 _r.aropen_curr_id,
                                                 _r.cashrcptitem_amount,
                                                 _r.aropen_docdate), 2),
        aropen_open = (NOT _r.closed)
    WHERE (aropen_id=_r.aropen_id);

--  Cache the running amount posted
    _posted_base := _posted_base + _r.cashrcptitem_amount_base;
    _posted := _posted + _r.cashrcptitem_amount;

--  Record the cashrcpt application
    INSERT INTO arapply
    ( arapply_cust_id,
      arapply_source_aropen_id, arapply_source_doctype, arapply_source_docnumber,
      arapply_target_aropen_id, arapply_target_doctype, arapply_target_docnumber,
      arapply_fundstype, arapply_refnumber,
      arapply_applied, arapply_closed,
      arapply_postdate, arapply_distdate, arapply_journalnumber, arapply_username,
      arapply_curr_id )
    VALUES
    ( _p.cashrcpt_cust_id,
      -1, ''K'', '''',
      _r.aropen_id, _r.aropen_doctype, _r.aropen_docnumber,
      _p.cashrcpt_fundstype, _p.cashrcpt_docnumber,
      round(_r.cashrcptitem_amount, 2), _r.closed,
      CURRENT_DATE, _p.cashrcpt_distdate, pJournalNumber, CURRENT_USER, _p.cashrcpt_curr_id );

    PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CR'',
                        (_r.aropen_doctype || ''-'' || _r.aropen_docnumber),
                        _arAccntid, round(_r.cashrcptitem_amount_base, 2),
                        _p.cashrcpt_distdate, _p.custnote );

    _exchGain := currGain(_p.cashrcpt_curr_id, _r.cashrcptitem_amount,
                          _r.aropen_docdate, _p.cashrcpt_distdate);
    IF (_exchGain <> 0) THEN
        PERFORM insertIntoGLSeries(_sequence, ''A/R'', ''CR'',
               _r.aropen_doctype || ''-'' || _r.aropen_docnumber,
               getGainLossAccntId(), round(_exchGain, 2) * -1,
               _p.cashrcpt_distdate, _p.custnote);
        _posted_base := _posted_base - _exchGain;
    END IF;

  END LOOP;

--  Distribute Misc. Applications
  FOR _r IN SELECT cashrcptmisc_id, cashrcptmisc_accnt_id, cashrcptmisc_amount,
                   currToBase(cashrcpt_curr_id, cashrcptmisc_amount,
                              cashrcpt_distdate) AS cashrcptmisc_amount_base,
                   cashrcptmisc_notes, cashrcpt_curr_id
            FROM cashrcptmisc JOIN
                 cashrcpt ON (cashrcptmisc_cashrcpt_id = cashrcpt_id)
            WHERE (cashrcptmisc_cashrcpt_id=pCashrcptid)  LOOP

--  Cache the running amount posted
    _posted_base := (_posted_base + _r.cashrcptmisc_amount_base);
    _posted := (_posted + _r.cashrcptmisc_amount);

--  Record the cashrcpt application
    INSERT INTO arapply
    ( arapply_cust_id,
      arapply_source_aropen_id, arapply_source_doctype, arapply_source_docnumber,
      arapply_target_aropen_id, arapply_target_doctype, arapply_target_docnumber,
      arapply_fundstype, arapply_refnumber,
      arapply_applied, arapply_closed,
      arapply_postdate, arapply_distdate, arapply_journalnumber, arapply_username,
      arapply_curr_id )
    VALUES
    ( _p.cashrcpt_cust_id,
      -1, ''K'', '''',
      -1, ''Misc.'', '''',
      _p.cashrcpt_fundstype, _p.cashrcpt_docnumber,
      round(_r.cashrcptmisc_amount, 2), TRUE,
      CURRENT_DATE, _p.cashrcpt_distdate, pJournalNumber, CURRENT_USER, _r.cashrcpt_curr_id );

    PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CR'', _r.cashrcptmisc_notes,
                                _r.cashrcptmisc_accnt_id,
                                round(_r.cashrcptmisc_amount_base, 2),
                                _p.cashrcpt_distdate, _p.custnote );

  END LOOP;

--  Post any remaining Cash to an A/R Cash Despoit (Credit Memo)
--  this credit memo may absorb an occasional currency exchange rounding error
  IF (round(_posted_base, 2) < round(_p.cashrcpt_amount_base, 2)) THEN
    _comment := (''Unapplied from '' || _p.cashrcpt_fundstype || ''-'' || _p.cashrcpt_docnumber);
    PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CR'',
                                _comment,
                                _p.prepaid_accnt_id,
                                round(_p.cashrcpt_amount_base, 2) -
                                                        round(_posted_base, 2),
                                _p.cashrcpt_distdate, _p.custnote );
    SELECT fetchArMemoNumber() INTO _arMemoNumber;
    IF(_p.cashrcpt_usecustdeposit) THEN
      -- TODO: post customer deposit
      PERFORM createARCashDeposit(_p.cashrcpt_cust_id, _arMemoNumber, '''',
                                  _p.cashrcpt_distdate, (_p.cashrcpt_amount - _posted),
                                  _comment, pJournalNumber, _p.cashrcpt_curr_id);
    ELSE
      PERFORM createARCreditMemo(_p.cashrcpt_cust_id, _arMemoNumber, '''',
                                 _p.cashrcpt_distdate, (_p.cashrcpt_amount - _posted),
                                 _comment, -1, -1, -1, _p.cashrcpt_distdate, -1, -1, 0,
                                 pJournalNumber, _p.cashrcpt_curr_id);
    END IF;

  ELSIF (round(_posted_base, 2) > round(_p.cashrcpt_amount_base, 2)) THEN
    PERFORM insertIntoGLSeries(_sequence, ''A/R'', ''CR'',
                   ''Currency Exchange Rounding - '' || _p.cashrcpt_docnumber,
                   getGainLossAccntId(),
                   round(_posted_base, 2) - round(_p.cashrcpt_amount_base, 2),
                   _p.cashrcpt_distdate, _p.custnote);
  END IF;

--  Debit Cash
  PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CR'',
                    (_p.cashrcpt_fundstype || ''-'' || _p.cashrcpt_docnumber),
                     _debitAccntid, round(_p.cashrcpt_amount_base, 2) * -1,
                     _p.cashrcpt_distdate,
                     _p.custnote );

  PERFORM postGLSeries(_sequence, pJournalNumber);

--  Delete the posted cashrcpt
  DELETE FROM cashrcptitem
  WHERE (cashrcptitem_cashrcpt_id=pCashrcptid);

  DELETE FROM cashrcptmisc
  WHERE (cashrcptmisc_cashrcpt_id=pCashrcptid);

  DELETE FROM cashrcpt
  WHERE (cashrcpt_id=pCashrcptid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

