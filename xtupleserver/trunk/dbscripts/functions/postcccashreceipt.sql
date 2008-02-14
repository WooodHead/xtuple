CREATE OR REPLACE FUNCTION postCCcashReceipt(INTEGER, INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN postCCCashReceipt($1, NULL, NULL);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION postCCcashReceipt(INTEGER, INTEGER, TEXT) RETURNS INTEGER AS
'
DECLARE
  pCCpay        ALIAS FOR $1;
  pdocid        ALIAS FOR $2;
  pdoctype      ALIAS FOR $3;
  _aropenid     INTEGER;
  _c            RECORD;
  _ccOrderDesc  TEXT;
  _realaccnt    INTEGER;

BEGIN
  SELECT bankaccnt_accnt_id INTO _realaccnt
  FROM bankaccnt
  WHERE (bankaccnt_id=fetchmetricvalue(''CCDefaultBank'')::INTEGER);

  IF (NOT FOUND) THEN
    RETURN -10;
  END IF;

  SELECT * INTO _c
     FROM ccpay, ccard
     WHERE ( (ccpay_id = pCCpay)
       AND   (ccpay_ccard_id = ccard_id) );

  IF (NOT FOUND) THEN
    RETURN -11;
  END IF;

  _ccOrderDesc := (_c.ccard_type || ''-'' || _c.ccpay_order_number::TEXT ||
		   ''-'' || _c.ccpay_order_number_seq::TEXT);

  _aropenid := createARCreditMemo(_c.ccpay_cust_id, fetchArMemoNumber(),
                                  '''', CURRENT_DATE, _c.ccpay_amount,
                                  ''Unapplied from '' || _ccOrderDesc );
  IF (_aropenid < 0) THEN
    RETURN _aropenid;
  END IF;

  IF (pdoctype = ''cashrcpt'') THEN
    IF (COALESCE(pdocid, -1) < 0) THEN
      INSERT INTO cashrcpt (
        cashrcpt_cust_id,   cashrcpt_amount,     cashrcpt_curr_id,
        cashrcpt_fundstype, cashrcpt_docnumber,  cashrcpt_notes,
        cashrcpt_distdate,  cashrcpt_bankaccnt_id
      ) VALUES (
        _c.ccpay_cust_id,   _c.ccpay_amount,     _c.ccpay_curr_id,
        _c.ccard_type,      _c.ccpay_r_ordernum, _ccOrderDesc,
        CURRENT_DATE,       fetchmetricvalue(''CCDefaultBank'')::INTEGER);
    ELSE
      UPDATE cashrcpt
      SET cashrcpt_cust_id=_c.ccpay_cust_id,
          cashrcpt_amount=_c.ccpay_amount,
          cashrcpt_curr_id=_c.ccpay_curr_id,
          cashrcpt_fundstype=_c.ccard_type,
          cashrcpt_docnumber=_c.ccpay_r_ordernum,
          cashrcpt_notes=_ccOrderDesc,
          cashrcpt_distdate=CURRENT_DATE,
          cashrcpt_bankaccnt_id=fetchmetricvalue(''CCDefaultBank'')::INTEGER
      WHERE (cashrcpt_id=pdocid);
    END IF;

  ELSIF (pdoctype = ''cohead'') THEN
    INSERT INTO payaropen (payaropen_ccpay_id, payaropen_aropen_id,
                           payaropen_amount,   payaropen_curr_id)
                  VALUES  (pccpay,             _aropenid,
                           _c.ccpay_amount,    _c.ccpay_curr_id);
    INSERT INTO aropenco (aropenco_aropen_id, aropenco_cohead_id,
                          aropenco_amount,    aropenco_curr_id)
                  VALUES (_aropenid,          pdocid,
                          _c.ccpay_amount,    _c.ccpay_curr_id);
  END IF;

  PERFORM insertGLTransaction(fetchJournalNumber(''C/R''), ''A/R'', ''CR'',
                              _ccOrderDesc, 
                              ''Cash Receipt from Credit Card'',
                              findPrepaidAccount(_c.ccpay_cust_id),
                              _realaccnt,
                              NULL,
			      ROUND(currToBase(_c.ccpay_curr_id,
					       _c.ccpay_amount,
					       _c.ccpay_transaction_datetime::DATE),2),
                              CURRENT_DATE);

  RETURN _aropenid;
END;
' LANGUAGE 'plpgsql';
