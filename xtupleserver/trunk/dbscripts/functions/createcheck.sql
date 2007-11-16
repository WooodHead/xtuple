CREATE OR REPLACE FUNCTION createCheck(INTEGER, TEXT, INTEGER, DATE, NUMERIC, INTEGER, INTEGER, INTEGER, TEXT, TEXT, BOOL) RETURNS INTEGER AS '
DECLARE
  pBankaccntid		ALIAS FOR  $1;
  pRecipType		ALIAS FOR  $2;
  pRecipId		ALIAS FOR  $3;
  pCheckDate		ALIAS FOR  $4;
  pAmount		ALIAS FOR  $5;
  pCurrid		ALIAS FOR  $6;
  pExpcatid		ALIAS FOR  $7;
  _journalNumber	INTEGER := $8;
  pFor			ALIAS FOR  $9;
  pNotes		ALIAS FOR $10;
  pMisc			ALIAS FOR $11;
  _checkid INTEGER;
BEGIN

  SELECT createCheck(pBankaccntid,pRecipType,pRecipId,pCheckDate,pAmount,pCurrid,pExpcatid,_journalNumber,pFor,pNotes,pMisc,NULL) INTO _checkid;
  RETURN _checkid;

END;
' LANGUAGE 'plpgsql';



CREATE OR REPLACE FUNCTION createCheck(INTEGER, TEXT, INTEGER, DATE, NUMERIC, INTEGER, INTEGER, INTEGER, TEXT, TEXT, BOOL, INTEGER) RETURNS INTEGER AS '
DECLARE
  pBankaccntid		ALIAS FOR  $1;
  pRecipType		ALIAS FOR  $2;
  pRecipId		ALIAS FOR  $3;
  pCheckDate		ALIAS FOR  $4;
  pAmount		ALIAS FOR  $5;
  pCurrid		ALIAS FOR  $6;
  pExpcatid		ALIAS FOR  $7;
  _journalNumber	INTEGER := $8;
  pFor			ALIAS FOR  $9;
  pNotes		ALIAS FOR $10;
  pMisc			ALIAS FOR $11;
  pRaid                 ALIAS FOR $12;
  _checkid		INTEGER;
  _bankaccnt_currid	INTEGER;

BEGIN
  SELECT bankaccnt_curr_id INTO _bankaccnt_currid
  FROM bankaccnt
  WHERE bankaccnt_id = pBankaccntid;
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  IF (pRecipType NOT IN (''C'', ''T'', ''V'')) THEN
    RETURN -2;
  END IF;

  IF (pCheckDate IS NULL) THEN
    RETURN -3;
  END IF;

  IF (pAmount <= 0) THEN
    RETURN -4;
  END IF;

  IF (pCurrid IS NULL
      OR NOT EXISTS(SELECT * FROM curr_symbol WHERE (curr_id=pCurrid))) THEN
    RETURN -5;
  END IF;

  IF (pExpcatid IS NOT NULL
      AND NOT EXISTS(SELECT * FROM expcat WHERE (expcat_id=pExpcatid))) THEN
    RETURN -6;
  END IF;

  if (_journalNumber IS NULL) THEN
    _journalNumber := fetchJournalNumber(''AP-CK'');
  END IF;

  _checkid := NEXTVAL(''checkhead_checkhead_id_seq'');

  INSERT INTO checkhead
  ( checkhead_id,		checkhead_recip_type,	checkhead_recip_id,
    checkhead_bankaccnt_id,	checkhead_number,
    checkhead_amount,
    checkhead_checkdate,	checkhead_misc,		checkhead_expcat_id,
    checkhead_journalnumber,	checkhead_for,		checkhead_notes,
    checkhead_curr_id,          checkhead_rahead_id )
  VALUES
  ( _checkid,			pRecipType,		pRecipId,
    pBankaccntid,		fetchNextCheckNumber(pBankaccntid),
    currToCurr(pCurrid, _bankaccnt_currid, pAmount, pCheckDate),
    pCheckDate,			COALESCE(pMisc, FALSE),	pExpcatid,
    _journalNumber,		pFor,			pNotes,
    _bankaccnt_currid,          pRaid );

  RETURN _checkid;

END;
' LANGUAGE 'plpgsql';
