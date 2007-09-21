CREATE OR REPLACE FUNCTION postCCcashReceipt(integer, integer)
  RETURNS integer AS
'
DECLARE
  pCCpay ALIAS FOR $1;
  _JournalNumber INTEGER;
  _sequence INTEGER;
  _arMemoNumber INTEGER;
  _arAccntid INTEGER;
  _bankAccntid ALIAS FOR $2;
  _c RECORD;
  _prepaid_accnt_id INTEGER;
  _notes TEXT;
  _ccOrderDesc TEXT;
  _aropenid INTEGER;
  _realaccnt INTEGER;

BEGIN

  _notes := ''Cash Receipt from Credit Card'';

--    SELECT metric_value::INTEGER INTO _bankAccntid
--    FROM metric
--    WHERE (metric_name=''UnassignedAccount'');
--  SELECT metric_value::INTEGER AS bankaccnt INTO _bankAccntid
--     FROM metric
--     WHERE (metric_name=''CCDefaultBank'');

--  IF (NOT FOUND) THEN
-- We do not seem to have this value defined
--    RETURN -1;
--  END IF; 

--  IF (_bankAccntid < 1) THEN
-- We do not have the default bank account id defined
--    RETURN -2;
--  END IF;

-- We need to get the "bank account g/l" from the back account

  SELECT bankaccnt_accnt_id INTO _realaccnt FROM bankaccnt WHERE bankaccnt_id = _bankAccntid;

  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

-- OK it appears that we are good to go on the bank account to receive the payments

  SELECT fetchJournalNumber(''C/R'') INTO _JournalNumber;

  SELECT fetchGLSequence() INTO _sequence;

-- Go get the ccpay record.

  SELECT * INTO _c
     FROM ccpay, ccard
     WHERE ( (ccpay_id = pCCpay)
       AND   (ccpay_ccard_id = ccard_id) );

  IF (NOT FOUND) THEN
-- Oops - what did we pass?
    RETURN -3;
  END IF;

  SELECT findPrepaidAccount(_c.ccpay_cust_id) INTO _prepaid_accnt_id;

  _ccOrderDesc := (_c.ccard_type || ''-'' || _c.ccpay_order_number::TEXT ||
		   ''-'' || _c.ccpay_order_number_seq::TEXT);
  PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CR'',
			     ''Unapplied from '' || _ccOrderDesc, _prepaid_accnt_id,
			     round(currToBase(_c.ccpay_curr_id, _c.ccpay_amount,
				      _c.ccpay_transaction_datetime::DATE), 2),
			     CURRENT_DATE, _notes );
  SELECT fetchArMemoNumber() INTO _arMemoNumber;
-- note here that createARCreditMemo returns the aropen_id of the record created
  SELECT createARCreditMemo( _c.ccpay_cust_id, _arMemoNumber, '''',
			    CURRENT_DATE, _c.ccpay_amount,
			    ''Unapplied from '' || _ccOrderDesc ) INTO _aropenid;

--  Debit Cash
  PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CR'', _ccOrderDesc,
			      _realaccnt,
			      round(currToBase(_c.ccpay_curr_id,
					       _c.ccpay_amount * -1,
					       _c.ccpay_transaction_datetime::DATE),2),
			      CURRENT_DATE, _notes );

  PERFORM postGLSeries(_sequence, _JournalNumber);

  RETURN _aropenid;

END;
'
  LANGUAGE 'plpgsql';
