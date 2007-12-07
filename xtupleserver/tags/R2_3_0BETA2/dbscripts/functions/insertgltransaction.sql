
CREATE OR REPLACE FUNCTION insertGLTransaction(TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, INTEGER, NUMERIC(12,2), DATE) RETURNS INTEGER AS '
DECLARE
  pSource ALIAS FOR $1;
  pDocType ALIAS FOR $2;
  pDocNumber ALIAS FOR $3;
  pNotes ALIAS FOR $4;
  pCreditid ALIAS FOR $5;
  pDebitid ALIAS FOR $6;
  pMiscid ALIAS FOR $7;
  pAmount ALIAS FOR $8;
  pDistDate ALIAS FOR $9;
  _return INTEGER;

BEGIN

  SELECT insertGLTransaction( fetchJournalNumber(''GL-MISC''),
                              pSource, pDocType, pDocNumber, pNotes,
                              pCreditid, pDebitid, pMiscid, pAmount, pDistDate) INTO _return;

  RETURN _return;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION insertGLTransaction(INTEGER, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, INTEGER, NUMERIC(12,2), DATE) RETURNS INTEGER AS '
DECLARE
  pJournalNumber ALIAS FOR $1;
  pSource ALIAS FOR $2;
  pDocType ALIAS FOR $3;
  pDocNumber ALIAS FOR $4;
  pNotes ALIAS FOR $5;
  pCreditid ALIAS FOR $6;
  pDebitid ALIAS FOR $7;
  pMiscid ALIAS FOR $8;
  pAmount ALIAS FOR $9;
  pDistDate ALIAS FOR $10;
  _debitid INTEGER;
  _creditid INTEGER;
  _sequence INTEGER;
  _check INTEGER;

BEGIN

--  Is there anything to post?
--  ToDo - 2 should really be the scale of the base currency
  IF (round(pAmount, 2) = 0) THEN
    RETURN -3;
  END IF;

--  Validate pDebitid
  IF (pDebitid IN (SELECT accnt_id FROM accnt)) THEN
    _debitid := pDebitid;
  ELSE
    SELECT metric_value::INTEGER INTO _debitid
    FROM metric
    WHERE (metric_name=''UnassignedAccount'');
  END IF;

--  Validate pCreditid
  IF (pCreditid IN (SELECT accnt_id FROM accnt)) THEN
    _creditid := pCreditid;
  ELSE
    SELECT metric_value::INTEGER INTO _creditid
    FROM metric
    WHERE (metric_name=''UnassignedAccount'');
  END IF;

-- refuse to accept postings into closed periods if any of the accounts disallow it
  IF (SELECT NOT BOOL_AND(accnt_closedpost) AND
             BOOL_AND(COALESCE(period_closed, FALSE))
      FROM accnt LEFT OUTER JOIN
           period ON (pDistDate BETWEEN period_start AND period_end)
      WHERE (accnt_id IN (_creditid, _debitid))) THEN
    RAISE EXCEPTION ''Cannot post to closed period (%).'', pDistDate;
    RETURN -4;  -- remove raise exception when all callers check return code
  END IF;

--  Grab a sequence for the pair
  SELECT fetchGLSequence() INTO _sequence;

--  First the credit
  INSERT INTO gltrans
  ( gltrans_journalnumber, gltrans_posted, gltrans_exported, gltrans_created, gltrans_date,
    gltrans_sequence, gltrans_accnt_id, gltrans_source,
    gltrans_doctype, gltrans_docnumber, gltrans_notes,
    gltrans_misc_id, gltrans_amount )
  VALUES
  ( pJournalNumber, FALSE, FALSE, CURRENT_TIMESTAMP, pDistDate,
    _sequence, _creditid, pSource,
    pDocType, pDocNumber, pNotes,
    pMiscid, pAmount );

--  Now the debit
  INSERT INTO gltrans
  ( gltrans_journalnumber, gltrans_posted, gltrans_exported, gltrans_created, gltrans_date,
    gltrans_sequence, gltrans_accnt_id, gltrans_source,
    gltrans_doctype, gltrans_docnumber, gltrans_notes,
    gltrans_misc_id, gltrans_amount )
  VALUES
  ( pJournalNumber, FALSE, FALSE, CURRENT_TIMESTAMP, pDistDate,
    _sequence, _debitid, pSource,
    pDocType, pDocNumber, pNotes,
    pMiscid, (pAmount * -1) );

  PERFORM postIntoTrialBalance(_sequence);

  RETURN _sequence;

END;
' LANGUAGE 'plpgsql';

