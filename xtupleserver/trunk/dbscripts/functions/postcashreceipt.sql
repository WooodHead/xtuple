CREATE OR REPLACE FUNCTION postCashReceipt(INTEGER, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pCashrcptid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  _ccpayid  INTEGER;
  _p RECORD;
  _r RECORD;
  _t RECORD;
  _v RECORD;
  _postToAR NUMERIC;
  _postToMisc NUMERIC;
  _postToCM NUMERIC;
  _posted_base NUMERIC := 0;
  _posted NUMERIC := 0;
  _sequence INTEGER;
  _aropenid INTEGER;
  _ardiscountid INTEGER;
  _arMemoNumber TEXT;
  _arAccntid INTEGER;
  _closed BOOLEAN;
  _debitAccntid INTEGER;
  _discountAccntid INTEGER;
  _exchGain NUMERIC;
  _comment      TEXT;
  _predist BOOLEAN;
  _discprcnt NUMERIC;
  _check INTEGER;

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

  SELECT cashrcpt_cust_id, (cust_number||'-'||cust_name) AS custnote,
         cashrcpt_fundstype, cashrcpt_docnumber,
         cashrcpt_distdate, cashrcpt_amount, cashrcpt_discount,
         currToBase(cashrcpt_curr_id, cashrcpt_amount, cashrcpt_distdate) AS cashrcpt_amount_base,
	 currToBase(cashrcpt_curr_id, cashrcpt_discount, cashrcpt_distdate) AS cashrcpt_discount_base,
         cashrcpt_notes,
         cashrcpt_bankaccnt_id AS bankaccnt_id,
         accnt_id AS prepaid_accnt_id,
         cashrcpt_usecustdeposit,
         COALESCE(cashrcpt_applydate, cashrcpt_distdate) AS applydate,
         cashrcpt_curr_id INTO _p
  FROM accnt, cashrcpt LEFT OUTER JOIN cust ON (cashrcpt_cust_id=cust_id)
  WHERE ( (findPrepaidAccount(cashrcpt_cust_id)=accnt_id)
   AND (cashrcpt_id=pCashrcptid) );
  IF (NOT FOUND) THEN
    RETURN -7;
  END IF;

  IF (COALESCE(_p.cashrcpt_distdate > _p.applydate, false)) THEN
    RAISE EXCEPTION 'Cannot post cashrcpt % because application date is before distribution date.', _p.cashrcpt_docnumber;
  END IF;

  _predist := COALESCE(_p.cashrcpt_distdate < _p.applydate, false);

  IF (_p.cashrcpt_fundstype IN ('A', 'D', 'M', 'V')) THEN
    SELECT ccpay_id INTO _ccpayid
    FROM ccpay
    WHERE ((ccpay_r_ordernum IN (CAST(pCashrcptid AS TEXT), _p.cashrcpt_docnumber))
       AND (ccpay_status IN ('C', 'A')));

    IF NOT FOUND THEN
      -- the following select seems to work except for xikar - bug 8848. why?
      -- raise warning so there is some visibility if people fall into this path.
      SELECT ccpay_id INTO _ccpayid
      FROM ccpay
      WHERE ((ccpay_order_number IN (CAST(pCashrcptid AS TEXT), _p.cashrcpt_docnumber))
         AND (ccpay_status IN ('C', 'A')));
      IF (NOT FOUND) THEN
        RETURN -8;
      ELSE
        RAISE NOTICE 'PostCashReceipt() found ccpay_id % for order number %/% (ref 8848).',
                      _ccpayid, pCashrcptid, _p.cashrcpt_docnumber;
      END IF;
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

  _discountAccntid := findardiscountaccount(_p.cashrcpt_cust_id);

--  Determine the amount to post to A/R Open Items
  SELECT COALESCE(SUM(cashrcptitem_amount), 0) INTO _postToAR
  FROM cashrcptitem JOIN aropen ON ( (aropen_id=cashrcptitem_aropen_id) AND (aropen_doctype IN ('I', 'D')) )
  WHERE (cashrcptitem_cashrcpt_id=pCashrcptid);
  IF (NOT FOUND) THEN
    _postToAR := 0;
  END IF;

--  Determine the amount to post to Misc. Distributions
  SELECT COALESCE(SUM(cashrcptmisc_amount), 0) INTO _postToMisc
  FROM cashrcptmisc
  WHERE (cashrcptmisc_cashrcpt_id=pCashrcptid);
  IF (NOT FOUND) THEN
    _postToMisc := 0;
  END IF;

--  Determine the amount to post to Discount Credit Memo
  SELECT COALESCE(SUM(cashrcptitem_discount), 0) INTO _postToCM
  FROM cashrcptitem JOIN aropen ON ( (aropen_id=cashrcptitem_aropen_id) AND (aropen_doctype IN ('I', 'D')) )
  WHERE (cashrcptitem_cashrcpt_id=pCashrcptid);
  IF (NOT FOUND) THEN
    _postToCM := 0;
  END IF;
  
--  Check to see if the C/R is over applied
  IF ((_postToAR + _postToMisc) > _p.cashrcpt_amount) THEN
    RETURN -1;
  END IF;

--  Check to see if the C/R is positive amount
  IF (_p.cashrcpt_amount <= 0) THEN
    RETURN -2;
  END IF;

--  Distribute A/R Applications
  IF (_predist=false) THEN
    FOR _r IN SELECT aropen_id, aropen_doctype, aropen_docnumber, aropen_docdate,
                     aropen_duedate, aropen_curr_id, aropen_curr_rate, aropen_amount,
                     round(aropen_amount - aropen_paid, 2) <=
                        round(currToCurr(_p.cashrcpt_curr_id, aropen_curr_id,(cashrcptitem_amount + cashrcptitem_discount),_p.cashrcpt_distdate),2)
                                 AS closed,
                     cashrcptitem_id, cashrcptitem_amount, cashrcptitem_discount,
                       currToBase(_p.cashrcpt_curr_id, cashrcptitem_amount,
                                _p.cashrcpt_distdate) AS cashrcptitem_amount_base,
		       currToBase(_p.cashrcpt_curr_id, cashrcptitem_discount,
                                _p.cashrcpt_distdate) AS cashrcptitem_discount_base,
                     round(aropen_paid + 
                       currToCurr(_p.cashrcpt_curr_id, aropen_curr_id,cashrcptitem_amount,_p.cashrcpt_distdate),2) AS new_paid,
                     round(currToCurr(_p.cashrcpt_curr_id, aropen_curr_id,cashrcptitem_discount,_p.cashrcpt_distdate),2) AS new_discount
              FROM cashrcptitem JOIN aropen ON ( (aropen_id=cashrcptitem_aropen_id) AND (aropen_doctype IN ('I', 'D')) )
              WHERE (cashrcptitem_cashrcpt_id=pCashrcptid) LOOP
  
  --  Determine discount percentage
      IF (_r.cashrcptitem_discount_base > 0) THEN
        _discprcnt := _r.new_discount / _r.aropen_amount;

    --  proportional tax credits calculated and implemented for the credit memo generated by the discount
        SELECT fetchArMemoNumber() INTO _arMemoNumber;
        _comment := ('Terms Discount Credit Memo for ' || _p.cashrcpt_docnumber);

        -- Create misc credit memo record
        _ardiscountid := nextval('aropen_aropen_id_seq');
        INSERT INTO aropen ( aropen_id, aropen_docdate, aropen_duedate, aropen_doctype, 
          aropen_docnumber, aropen_curr_id, aropen_posted, aropen_amount ) 
        VALUES 
        ( _ardiscountid, _p.cashrcpt_distdate, _p.cashrcpt_distdate, 'C', 
          _arMemoNumber, _p.cashrcpt_curr_id, false,_p.cashrcpt_discount);
        
        IF (_r.aropen_doctype  = 'I') THEN
      
          SELECT aropen_cobmisc_id AS invcheadid, 
                 invchead_curr_id, 
                 invchead_invcdate INTO _t
          FROM aropen LEFT OUTER JOIN invchead ON (aropen_cobmisc_id = invchead_id) 
               LEFT OUTER JOIN invcitem ON (invchead_id = invcitem_invchead_id)
          WHERE aropen_id = _r.aropen_id;

          FOR _v IN SELECT tax_sales_accnt_id,
                           tax_id, 
                           round(sum(taxdetail_tax), 2) AS tax,
                           currToBase(_t.invchead_curr_id, round(sum(taxdetail_tax), 2), _t.invchead_invcdate) AS taxbasevalue
            FROM tax 
                 JOIN calculateTaxDetailSummary('I', _t.invcheadid, 'T') ON (taxdetail_tax_id=tax_id)
            GROUP BY tax_id, tax_sales_accnt_id LOOP
  
              INSERT INTO aropentax(taxhist_parent_id, taxhist_tax_id, taxhist_basis,
                 taxhist_percent, taxhist_amount, taxhist_tax, taxhist_docdate)
              VALUES (_ardiscountid, _v.tax_id, 0.00, 
                 0.00, 0.00, (round((_v.tax * _discprcnt), 2) * -1), _r.aropen_docdate);
          END LOOP;

        ELSE 
          IF (_r.aropen_doctype  = 'D') THEN
            UPDATE aropentax
            SET taxhist_tax = round((taxhist_tax - taxhist_tax * _discprcnt), 2)
            WHERE taxhist_parent_id = _r.aropen_id;
          END IF;
        END IF;

        -- Create credit memo for discount
        SELECT createARCreditMemo(_ardiscountid, _p.cashrcpt_cust_id, _arMemoNumber, '',
                                  _p.cashrcpt_distdate, _p.cashrcpt_discount,
                                  _comment, -1, -1, _discountAccntid, _p.cashrcpt_distdate, -1, -1, 0,
                                  pJournalNumber, _p.cashrcpt_curr_id) INTO _ardiscountid;

        -- Apply discount credit memo
        INSERT INTO arcreditapply
        ( arcreditapply_source_aropen_id, arcreditapply_target_aropen_id,
          arcreditapply_amount, arcreditapply_curr_id )
        VALUES
        ( _ardiscountid, _r.aropen_id, _p.cashrcpt_discount, _p.cashrcpt_curr_id );
 
        SELECT postARCreditMemoApplication(_ardiscountid, _p.cashrcpt_distdate) INTO _check;
        IF (_check < 0) THEN
          RAISE EXCEPTION 'Error posting discount credit memo application. Code %', _check;
        END IF;
        
      END IF; -- End handle Discount
     
  --  Update the aropen item to post the paid amount
      UPDATE aropen
      SET aropen_paid = _r.new_paid + _r.new_discount,
          aropen_open = (NOT _r.closed),
          aropen_closedate = CASE WHEN _r.closed THEN _p.cashrcpt_distdate END
      WHERE (aropen_id=_r.aropen_id);
  
  --  Cache the running amount posted
      _posted_base := _posted_base + _r.cashrcptitem_amount_base + _r.cashrcptitem_discount_base;
      _posted := _posted + _r.cashrcptitem_amount + _r.cashrcptitem_discount;
 
  --  Record the cashrcpt application
      INSERT INTO arapply
      ( arapply_cust_id,
        arapply_source_aropen_id, arapply_source_doctype, arapply_source_docnumber,
        arapply_target_aropen_id, arapply_target_doctype, arapply_target_docnumber,
        arapply_fundstype, arapply_refnumber, arapply_reftype, arapply_ref_id,
        arapply_applied, arapply_closed,
        arapply_postdate, arapply_distdate, arapply_journalnumber, arapply_username,
        arapply_curr_id )
      VALUES
      ( _p.cashrcpt_cust_id,
        -1, 'K', '',
        _r.aropen_id, _r.aropen_doctype, _r.aropen_docnumber,
        _p.cashrcpt_fundstype, _p.cashrcpt_docnumber, 'CRA', _r.cashrcptitem_id,
        round(_r.cashrcptitem_amount, 2), _r.closed,
        _p.applydate, _p.cashrcpt_distdate, pJournalNumber, CURRENT_USER, _p.cashrcpt_curr_id);
  
  
      _exchGain := arCurrGain(_r.aropen_id,_p.cashrcpt_curr_id, _r.cashrcptitem_amount,
                             _p.cashrcpt_distdate);

       PERFORM insertIntoGLSeries( _sequence, 'A/R', 'CR',
                          (_r.aropen_doctype || '-' || _r.aropen_docnumber),
                          _arAccntid, round(_r.cashrcptitem_amount_base + _exchGain, 2),
                          _p.cashrcpt_distdate, _p.custnote );
                          
      IF (_exchGain <> 0) THEN
          PERFORM insertIntoGLSeries(_sequence, 'A/R', 'CR',
                 _r.aropen_doctype || '-' || _r.aropen_docnumber,
                 getGainLossAccntId(), round(_exchGain, 2) * -1,
                 _p.cashrcpt_distdate, _p.custnote);
      END IF;

    END LOOP;
  END IF;

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
      arapply_curr_id, arapply_reftype, arapply_ref_id )
    VALUES
    ( _p.cashrcpt_cust_id,
      -1, 'K', '',
      -1, 'Misc.', '',
      _p.cashrcpt_fundstype, _p.cashrcpt_docnumber,
      round(_r.cashrcptmisc_amount, 2), TRUE,
      _p.applydate, _p.cashrcpt_distdate, pJournalNumber, CURRENT_USER, 
      _r.cashrcpt_curr_id, 'CRD', _r.cashrcptmisc_id );
    PERFORM insertIntoGLSeries( _sequence, 'A/R', 'CR', _r.cashrcptmisc_notes,
                                _r.cashrcptmisc_accnt_id,
                                round(_r.cashrcptmisc_amount_base, 2),
                                _p.cashrcpt_distdate, _p.custnote );

  END LOOP;

--  Post any remaining Cash to an A/R Cash Despoit (Credit Memo)
--  this credit memo may absorb an occasional currency exchange rounding error
  IF (round(_posted_base, 2) < round(_p.cashrcpt_amount_base, 2)) THEN
    _comment := ('Unapplied from ' || _p.cashrcpt_fundstype || '-' || _p.cashrcpt_docnumber);
    PERFORM insertIntoGLSeries( _sequence, 'A/R', 'CR',
                                _comment,
                                _p.prepaid_accnt_id,
                                round(_p.cashrcpt_amount_base, 2) -
                                                        round(_posted_base, 2),
                                _p.cashrcpt_distdate, _p.custnote );
    SELECT fetchArMemoNumber() INTO _arMemoNumber;
    IF(_p.cashrcpt_usecustdeposit) THEN
      -- Post Customer Deposit
      SELECT createARCashDeposit(_p.cashrcpt_cust_id, _arMemoNumber, '',
                                 _p.cashrcpt_distdate, (_p.cashrcpt_amount - _posted),
                                 _comment, pJournalNumber, _p.cashrcpt_curr_id) INTO _aropenid;
    ELSE
      -- Post A/R Credit Memo
      SELECT createARCreditMemo(_p.cashrcpt_cust_id, _arMemoNumber, '',
                                _p.cashrcpt_distdate, (_p.cashrcpt_amount - _posted),
                                _comment, -1, -1, -1, _p.cashrcpt_distdate, -1, -1, 0,
                                pJournalNumber, _p.cashrcpt_curr_id) INTO _aropenid;
    END IF;

    IF (_ccpayid IS NOT NULL) THEN
      INSERT INTO payaropen (payaropen_ccpay_id, payaropen_aropen_id,
                             payaropen_amount,   payaropen_curr_id
                   ) VALUES (_ccpayid,           _aropenid,
                             _p.cashrcpt_amount, _p.cashrcpt_curr_id);
    END IF;

    -- Create Cash Receipt Item to capture posting
    IF (_predist=false) THEN
      INSERT INTO cashrcptitem
        ( cashrcptitem_cashrcpt_id, cashrcptitem_aropen_id, cashrcptitem_amount )
      VALUES
        ( pCashrcptid, _aropenid, (_p.cashrcpt_amount - _posted) );
    END IF;

  ELSIF (round(_posted_base, 2) > round((_p.cashrcpt_amount_base + _p.cashrcpt_discount_base), 2)) THEN
    PERFORM insertIntoGLSeries(_sequence, 'A/R', 'CR',
                   'Currency Exchange Rounding - ' || _p.cashrcpt_docnumber,
                   getGainLossAccntId(),
                   round(_posted_base, 2) - round((_p.cashrcpt_amount_base + _p.cashrcpt_discount_base), 2),
                   _p.cashrcpt_distdate, _p.custnote);
  END IF;

--  Debit Cash
  PERFORM insertIntoGLSeries( _sequence, 'A/R', 'CR',
                    (_p.cashrcpt_fundstype || '-' || _p.cashrcpt_docnumber),
                     _debitAccntid, round(_p.cashrcpt_amount_base, 2) * -1, 
                     _p.cashrcpt_distdate,
                     _p.custnote );

  PERFORM postGLSeries(_sequence, pJournalNumber);

  -- convert the cashrcptitem records to applications against the cm/cd if we are _predist
  IF(_predist=true) THEN
    FOR _r IN SELECT *
                FROM cashrcptitem
               WHERE(cashrcptitem_cashrcpt_id=pCashrcptid) LOOP
      INSERT INTO arcreditapply (arcreditapply_source_aropen_id, arcreditapply_target_aropen_id,
                                 arcreditapply_amount, arcreditapply_curr_id)
                          VALUES(_aropenid, _r.cashrcptitem_aropen_id,
                                 _r.cashrcptitem_amount, _p.cashrcpt_curr_id);
      _posted := (_posted + _r.cashrcptitem_amount);
    END LOOP;
    PERFORM postArCreditMemoApplication(_aropenid, _p.applydate);
    -- If there is any left over go ahead and create an additional cashrcptitem record for it with the amount
    IF (round(_posted, 2) < round(_p.cashrcpt_amount, 2)) THEN
      INSERT INTO cashrcptitem
        ( cashrcptitem_cashrcpt_id, cashrcptitem_aropen_id, cashrcptitem_amount )
      VALUES
        ( pCashrcptid, _aropenid, (_p.cashrcpt_amount - _posted) );
    END IF;
  END IF;

--  Update the posted cashrcpt
  UPDATE cashrcpt SET cashrcpt_posted=TRUE,
                      cashrcpt_posteddate=CURRENT_DATE,
                      cashrcpt_postedby=CURRENT_USER
  WHERE (cashrcpt_id=pCashrcptid);

  RETURN 1;

END;
$$ LANGUAGE 'plpgsql';
