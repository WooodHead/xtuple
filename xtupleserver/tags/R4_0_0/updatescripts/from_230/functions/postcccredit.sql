CREATE OR REPLACE FUNCTION postCCcredit(INTEGER, TEXT, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCCpay	ALIAS FOR $1;
  preftype      ALIAS FOR $2;
  prefid        ALIAS FOR $3;
  _amountclosed NUMERIC;
  _c		RECORD;
  _ccOrderDesc	TEXT;
  _closed       BOOLEAN;
  _glaccnt	INTEGER;
  _journalNum	INTEGER;
  _notes	TEXT := ''Credit Customer via Credit Card'';
  _r		aropen%ROWTYPE;
  _sequence	INTEGER;

BEGIN
  SELECT bankaccnt_accnt_id INTO _glaccnt
  FROM bankaccnt
  WHERE bankaccnt_id = fetchMetricText(''CCDefaultBank'');

  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  IF ((preftype = ''cohead'') AND NOT EXISTS(SELECT cohead_id
					     FROM cohead
					     WHERE (cohead_id=prefid))) THEN
    RETURN -2;
  ELSIF ((preftype = ''aropen'') AND NOT EXISTS(SELECT aropen_id
                                                FROM aropen
                                                WHERE (aropen_id=prefid))) THEN
    RETURN -2;
  END IF;

  SELECT * INTO _c
     FROM ccpay, ccard
     WHERE ( (ccpay_id = pCCpay)
       AND   (ccpay_ccard_id = ccard_id) );

  IF (NOT FOUND) THEN
    RETURN -3;
  END IF;

  IF (_c.ccpay_type != ''R'') THEN
    RETURN -4;
  END IF;

  _sequence := fetchGLSequence();

  IF (_c.ccpay_r_ref IS NOT NULL) THEN
    _ccOrderDesc := (_c.ccard_type || ''-'' || _c.ccpay_r_ref);
  ELSE
    _ccOrderDesc := (_c.ccard_type || ''-'' || _c.ccpay_order_number::TEXT ||
		     ''-'' || COALESCE(_c.ccpay_order_number_seq::TEXT, ''''));
  END IF;

  PERFORM insertIntoGLSeries(_sequence, ''A/R'', ''CC'', _ccOrderDesc,
			     findARAccount(_c.ccpay_cust_id),
			     ROUND(currToBase(_c.ccpay_curr_id,
					      _c.ccpay_amount,
					      _c.ccpay_transaction_datetime::DATE), 2) * -1,
			     CURRENT_DATE, _notes );

  PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CC'', _ccOrderDesc,
			      _glaccnt,
			      ROUND(currToBase(_c.ccpay_curr_id,
					       _c.ccpay_amount,
					       _c.ccpay_transaction_datetime::DATE),2),
			      CURRENT_DATE, _notes );

  PERFORM postGLSeries(_sequence, fetchJournalNumber(''C/R'') );

  IF (preftype = ''aropen'') THEN
    SELECT * INTO _r
    FROM aropen
    WHERE (aropen_id=prefid);

  ELSE
    SELECT aropen.* INTO _r
    FROM aropen
    WHERE ((aropen_doctype IN (''C'', ''R''))
      AND  (aropen_docnumber=_c.ccpay_r_ref)
      AND  (ROUND(aropen_amount - aropen_paid, 2) <=
                ROUND(currToCurr(_c.ccpay_curr_id, aropen_curr_id,_c.ccpay_amount,
                                 _c.ccpay_transaction_datetime::DATE), 2))
          );
  END IF;

  IF (FOUND) THEN
    _amountclosed := ROUND(currToCurr(_c.ccpay_curr_id,
                                      _r.aropen_curr_id,
                                      _c.ccpay_amount,
                                      _c.ccpay_transaction_datetime::DATE), 2);
    _closed := ROUND(_r.aropen_paid + _amountclosed, 2) >= ROUND(_r.aropen_amount, 2);
    UPDATE aropen
    SET aropen_paid=ROUND(aropen_paid + _amountclosed, 2),
	aropen_open=(NOT _closed)
    WHERE (aropen_id=_r.aropen_id);

    INSERT INTO arapply (
      arapply_cust_id,
      arapply_source_aropen_id, arapply_source_doctype, arapply_source_docnumber,
      arapply_target_aropen_id, arapply_target_doctype, arapply_target_docnumber,
      arapply_fundstype, arapply_refnumber,
      arapply_applied, arapply_closed,
      arapply_postdate, arapply_journalnumber, arapply_username,
      arapply_curr_id )
    VALUES
    ( _c.ccpay_cust_id,
      _r.aropen_id, _r.aropen_doctype, _r.aropen_docnumber,
      -1, ''R'', ''Credit Card Credit'',
      _c.ccard_type, _c.ccpay_order_number,
      ROUND(_c.ccpay_amount, 2), _closed,
      CURRENT_DATE, fetchJournalNumber(''AR-CM''), CURRENT_USER,
      _c.ccpay_curr_id );
  END IF;

  IF (preftype = ''cohead'') THEN
    INSERT INTO payco (
      payco_ccpay_id, payco_cohead_id, payco_amount, payco_curr_id 
    ) VALUES (
      pCCpay, prefid, 0 - _c.ccpay_amount, _c.ccpay_curr_id
    );
  END IF;

  RETURN 0;

END;
'
LANGUAGE 'plpgsql';
