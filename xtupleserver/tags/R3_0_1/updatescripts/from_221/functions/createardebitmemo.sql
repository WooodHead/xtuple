
CREATE OR REPLACE FUNCTION createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT) RETURNS INTEGER AS '
DECLARE
  pCustid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pOrderNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;

BEGIN
  RETURN createARDebitMemo(pCustid, pDocNumber, pOrderNumber, pDocDate, pAmount, pNotes, -1, -1, -1, pDocDate, -1, -1, 0, baseCurrId() );
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCustid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pOrderNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  pCurrId ALIAS FOR $7;

BEGIN
  RETURN createARDebitMemo(pCustid, pDocNumber, pOrderNumber, pDocDate, pAmount, pNotes, -1, -1, -1, pDocDate, -1, -1, 0, pCurrId);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCustid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pOrderNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  pRsncodeid ALIAS FOR $7;
  pSalescatid ALIAS FOR $8;
  pAccntid ALIAS FOR $9;
BEGIN
  RETURN createARDebitMemo(pCustid, pDocNumber, pOrderNumber, pDocDate, pAmount, pNotes, pRsncodeid, pSalescatid, pAccntid, pDocDate, -1, -1, 0, baseCurrId() );
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pCustid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pOrderNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  pRsncodeid ALIAS FOR $7;
  pSalescatid ALIAS FOR $8;
  pAccntid ALIAS FOR $9;
  pDueDate ALIAS FOR $10;
  pTermsid ALIAS FOR $11;
  pSalesrepid ALIAS FOR $12;
  pCommissiondue ALIAS FOR $13;

BEGIN
  RETURN createARDebitMemo(pCustid, pDocNumber, pOrderNumber, pDocDate, pAmount, pNotes, pRsncodeid, pSalescatid, pAccntid, pDueDate, pTermsid, pSalesrepid, pCommissiondue, baseCurrId() );
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createARDebitMemo(INTEGER, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCustid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pOrderNumber ALIAS FOR $3;
  pDocDate ALIAS FOR $4;
  pAmount ALIAS FOR $5;
  pNotes ALIAS FOR $6;
  pRsncodeid ALIAS FOR $7;
  pSalescatid ALIAS FOR $8;
  pAccntid ALIAS FOR $9;
  pDueDate ALIAS FOR $10;
  pTermsid ALIAS FOR $11;
  pSalesrepid ALIAS FOR $12;
  pCommissiondue ALIAS FOR $13;
  pCurrId ALIAS FOR $14;
BEGIN
  RETURN createARDebitMemo(pCustid, fetchJournalNumber(''AR-MISC''), pDocNumber, pOrderNumber, pDocDate, pAmount, pNotes, pRsncodeid, pSalescatid, pAccntid, pDueDate, pTermsid, pSalesrepid, pCommissiondue, baseCurrId() );
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createARDebitMemo(INTEGER, TEXT, TEXT, TEXT, DATE, NUMERIC, TEXT, INTEGER, INTEGER, INTEGER, DATE, INTEGER, INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCustid		ALIAS FOR $1;
  _journalNumber	TEXT := $2;
  pDocNumber		ALIAS FOR $3;
  pOrderNumber		ALIAS FOR $4;
  pDocDate		ALIAS FOR $5;
  pAmount		ALIAS FOR $6;
  pNotes		ALIAS FOR $7;
  pRsncodeid		ALIAS FOR $8;
  pSalescatid		ALIAS FOR $9;
  pAccntid		ALIAS FOR $10;
  pDueDate		ALIAS FOR $11;
  pTermsid		ALIAS FOR $12;
  pSalesrepid		ALIAS FOR $13;
  pCommissiondue	ALIAS FOR $14;
  pCurrId		ALIAS FOR $15;
  _prepaidAccntid INTEGER;
  _salescatid INTEGER;
  _accntid INTEGER;
  _glSequence INTEGER;
  _aropenid INTEGER;
  _tmp INTEGER;

BEGIN

  IF (pAmount <= 0) THEN
    RETURN 0;
  END IF;

  SELECT findPrepaidAccount(pCustid) INTO _prepaidAccntid;

  _accntid := pAccntid;
  _salescatid := pSalescatid;

  PERFORM accnt_id
     FROM accnt
    WHERE (accnt_id=_accntid);
  IF (FOUND) THEN
    _prepaidAccntid := _accntid;
  ELSE
    _accntid := -1;
  END IF;

  SELECT accnt_id INTO _tmp
    FROM salescat, accnt
   WHERE ((salescat_prepaid_accnt_id=accnt_id)
     AND  (salescat_id=_salescatid));
  IF (FOUND) THEN
    _accntid := -1;
    _prepaidAccntid := _tmp;
  ELSE
    _salescatid = -1;
  END IF;

  IF (_journalNumber IS NULL) THEN
    _journalNumber := fetchJournalNumber(''AR-MISC'');
  END IF;

  SELECT NEXTVAL(''aropen_aropen_id_seq'') INTO _aropenid;

  SELECT insertGLTransaction( _journalNumber, ''A/R'', ''DM'',
                              pDocNumber, pNotes, cr.accnt_id, db.accnt_id,
                              _aropenid,
                              round(currToBase(pCurrId, pAmount, pDocDate), 2),
                              pDocDate) INTO _glSequence
  FROM accnt AS db, accnt AS cr
  WHERE ( (db.accnt_id = findARAccount(pCustid))
   AND (cr.accnt_id = _prepaidAccntid) );
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  INSERT INTO aropen
  ( aropen_id, aropen_username, aropen_journalnumber,
    aropen_cust_id, aropen_docnumber, aropen_doctype, aropen_ordernumber,
    aropen_docdate, aropen_duedate, aropen_terms_id, aropen_salesrep_id,
    aropen_amount, aropen_paid, aropen_commission_due, aropen_commission_paid,
    aropen_applyto, aropen_ponumber, aropen_cobmisc_id,
    aropen_open, aropen_notes, aropen_rsncode_id,
    aropen_salescat_id, aropen_accnt_id, aropen_curr_id )
  VALUES
  ( _aropenid, CURRENT_USER, _journalNumber,
    pCustid, pDocNumber, ''D'', pOrderNumber,
    pDocDate, pDueDate, pTermsid, pSalesrepid,
    round(pAmount, 2), 0, pCommissiondue, FALSE,
    '''', '''', -1,
    TRUE, pNotes, pRsncodeid,
    _salescatid, _accntid, pCurrId );

  RETURN _aropenid;

END;
' LANGUAGE 'plpgsql';

