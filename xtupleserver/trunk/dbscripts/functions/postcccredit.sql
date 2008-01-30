CREATE OR REPLACE FUNCTION postCCcredit(INTEGER) RETURNS INTEGER AS '
DECLARE
  pCCpay	ALIAS FOR $1;
  _sequence	INTEGER;
  _c		RECORD;
  _r		RECORD;
  _notes	TEXT := ''Credit Customer via Credit Card'';
  _ccOrderDesc	TEXT;
  _glaccnt	INTEGER;
  _journalNum	INTEGER;

BEGIN
  SELECT bankaccnt_accnt_id INTO _glaccnt
  FROM bankaccnt
  WHERE bankaccnt_id = fetchMetricText(''CCDefaultBank'');

  IF (NOT FOUND) THEN
    RETURN -1;
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

  SELECT aropen.*,
	 currToBase(_c.ccpay_curr_id, _c.ccpay_amount,
		    aropen_docdate) AS amount_base,
	 (ROUND(aropen_paid + currToCurr(_c.ccpay_curr_id,
					 aropen_curr_id,
					 _c.ccpay_amount,
					 _c.ccpay_transaction_datetime::DATE), 2) >= ROUND(aropen_amount, 2)) AS closed
		    INTO _r
  FROM aropen
  WHERE ((aropen_doctype IN (''C'', ''R''))
    AND  (aropen_docnumber=_c.ccpay_r_ref)
    AND  (ROUND(aropen_amount - aropen_paid, 2) <=
	      ROUND(currToCurr(_c.ccpay_curr_id, aropen_curr_id,_c.ccpay_amount,
			       _c.ccpay_transaction_datetime::DATE), 2))
	);

  IF (FOUND) THEN
    UPDATE aropen
    SET aropen_paid=ROUND(aropen_paid + currToCurr(_c.ccpay_curr_id,
						   _r.aropen_curr_id,
						   _c.ccpay_amount,
						   _c.ccpay_transaction_datetime::DATE), 2),
	aropen_open=(NOT _r.closed)
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
      ROUND(_c.ccpay_amount, 2), _r.closed,
      CURRENT_DATE, fetchJournalNumber(''AR-CM''), CURRENT_USER,
      _c.ccpay_curr_id );
  END IF;

  RETURN 0;

END;
'
LANGUAGE 'plpgsql';
