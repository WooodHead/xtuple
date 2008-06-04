CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pPoNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  _result INTEGER;

BEGIN

  SELECT createAPCreditMemo( pVendid, fetchJournalNumber('AP-MISC'),
                             pDocNumber, pPoNumber, pDocDate, pAmount, pNotes, -1, pDocDate, -1, baseCurrId() ) INTO _result;

  RETURN _result;

END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pPoNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  pAccntid ALIAS FOR $7;
  _result INTEGER;

BEGIN

  SELECT createAPCreditMemo( pVendid, fetchJournalNumber('AP-MISC'),
                             pDocNumber, pPoNumber, pDocDate, pAmount, pNotes, pAccntid, pDocDate, -1, baseCurrId() ) INTO _result;

  RETURN _result;

END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, DATE, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pPoNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  pAccntid ALIAS FOR $7;
  pDueDate ALIAS FOR $8;
  pTermsid ALIAS FOR $9;
  _result INTEGER;

BEGIN

  SELECT createAPCreditMemo( pVendid, fetchJournalNumber('AP-MISC'),
                             pDocNumber, pPoNumber, pDocDate, pAmount, pNotes, pAccntid, pDueDate, pTermsid, baseCurrId() ) INTO _result;

  RETURN _result;

END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  pDocNumber ALIAS FOR $3;
  pPoNumber ALIAS FOR $4;
  pDocDate ALIAS FOR $5;
  pAmount ALIAS FOR $6;
  pNotes ALIAS FOR $7;

BEGIN
  RETURN createAPCreditMemo(pVendid, pJournalNumber, pDocNumber, pPoNumber, pDocDate, pAmount, pNotes, -1, pDocDate, -1, baseCurrId() );
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  pDocNumber ALIAS FOR $3;
  pPoNumber ALIAS FOR $4;
  pDocDate ALIAS FOR $5;
  pAmount ALIAS FOR $6;
  pNotes ALIAS FOR $7;
  pAccntid ALIAS FOR $8;
BEGIN
  RETURN createAPCreditMemo( pVendid, pJournalNumber,
                             pDocNumber, pPoNumber, pDocDate, pAmount, pNotes, pAccntid, pDocDate, -1, baseCurrId() );
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, DATE, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  pDocNumber ALIAS FOR $3;
  pPoNumber ALIAS FOR $4;
  pDocDate ALIAS FOR $5;
  pAmount ALIAS FOR $6;
  pNotes ALIAS FOR $7;
  pAccntid ALIAS FOR $8;
  pDueDate ALIAS FOR $9;
  pTermsid ALIAS FOR $10;
BEGIN
  RETURN createAPCreditMemo( pVendid, pJournalNumber, pDocNumber, pPoNumber, pDocDate, pAmount, pNotes, pAccntid, pDueDate, pTermsid, baseCurrId() );
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createAPCreditMemo(INTEGER, INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, DATE, INTEGER, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pVendid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  pDocNumber ALIAS FOR $3;
  pPoNumber ALIAS FOR $4;
  pDocDate ALIAS FOR $5;
  pAmount ALIAS FOR $6;
  pNotes ALIAS FOR $7;
  pAccntid ALIAS FOR $8;
  pDueDate ALIAS FOR $9;
  pTermsid ALIAS FOR $10;
  pCurrId ALIAS FOR $11;
  _prepaidAccntid INTEGER;
  _accntid INTEGER;
  _glSequence INTEGER;
  _apopenid INTEGER;

BEGIN

  SELECT findAPPrepaidAccount(pVendid) INTO _prepaidAccntid;

  _accntid := pAccntid;

  PERFORM accnt_id
     FROM accnt
    WHERE (accnt_id=_accntid);
  IF (FOUND) THEN
    _prepaidAccntid := _accntid;
  ELSE
    _accntid := -1;
  END IF;

  SELECT NEXTVAL('apopen_apopen_id_seq') INTO _apopenid;

  SELECT insertGLTransaction( pJournalNumber, 'A/P', 'CM',
                              pDocNumber, pNotes, cr.accnt_id, db.accnt_id,
                              _apopenid, currToBase(pCurrId, pAmount, pDocDate), pDocDate) INTO _glSequence
  FROM accnt AS db, accnt AS cr
  WHERE ( (cr.accnt_id = _prepaidAccntid)
   AND (db.accnt_id = findAPAccount(pVendid)) );
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  INSERT INTO apopen
  ( apopen_id, apopen_username, apopen_journalnumber,
    apopen_vend_id, apopen_docnumber, apopen_doctype, apopen_ponumber,
    apopen_docdate, apopen_duedate, apopen_distdate, apopen_terms_id,
    apopen_amount, apopen_paid, apopen_open, apopen_notes, apopen_accnt_id, apopen_curr_id )
  VALUES
  ( _apopenid, CURRENT_USER, pJournalNumber,
    pVendid, pDocNumber, 'C', pPoNumber,
    pDocDate, pDueDate, pDocDate, pTermsid,
    pAmount, 0, (pAmount <> 0), pNotes, _accntid, pCurrId );

  RETURN pJournalNumber;

END;
$$ LANGUAGE 'plpgsql';
