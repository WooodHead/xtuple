CREATE OR REPLACE FUNCTION postCCcredit(INTEGER) RETURNS INTEGER AS '
DECLARE
  pCCpay	ALIAS FOR $1;
  _sequence	INTEGER;
  _c		RECORD;
  _notes	TEXT := ''Credit Customer via Credit Card'';
  _ccOrderDesc	TEXT;
  _glaccnt	INTEGER;

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

  IF (_c.ccpay_yp_r_ref IS NOT NULL) THEN
    _ccOrderDesc := (_c.ccard_type || ''-'' || _c.ccpay_yp_r_ref);
  ELSE
    _ccOrderDesc := (_c.ccard_type || ''-'' || _c.ccpay_order_number::TEXT ||
		     ''-'' || COALESCE(_c.ccpay_order_number_seq::TEXT, ''''));
  END IF;

  PERFORM insertIntoGLSeries(_sequence, ''A/R'', ''CC'', _ccOrderDesc,
			     findARAccount(_c.ccpay_cust_id),
			     round(currToBase(_c.ccpay_curr_id,
					      _c.ccpay_amount,
					      _c.ccpay_transaction_datetime::DATE), 2) * -1,
			     CURRENT_DATE, _notes );

  PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CC'', _ccOrderDesc,
			      _glaccnt,
			      round(currToBase(_c.ccpay_curr_id,
					       _c.ccpay_amount,
					       _c.ccpay_transaction_datetime::DATE),2),
			      CURRENT_DATE, _notes );

  PERFORM postGLSeries(_sequence, fetchJournalNumber(''C/R'') );


  RETURN 0;

END;
'
LANGUAGE 'plpgsql';
