CREATE OR REPLACE FUNCTION createMiscAPCheck(INTEGER, INTEGER, DATE, NUMERIC, INTEGER, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pBankaccntid ALIAS FOR $1;
  pVendid ALIAS FOR $2;
  pCheckDate ALIAS FOR $3;
  pAmount ALIAS FOR $4;
  pExpcatid ALIAS FOR $5;
  pFor ALIAS FOR $6;
  pNotes ALIAS FOR $7;

BEGIN
  RETURN createMiscAPCheck(pBankaccntid, pVendid, pCheckDate, pAmount, baseCurrId(), pExpcatid, pFor, pNotes);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION createMiscAPCheck(INTEGER, INTEGER, DATE, NUMERIC, INTEGER, INTEGER, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pBankaccntid ALIAS FOR $1;
  pVendid ALIAS FOR $2;
  pCheckDate ALIAS FOR $3;
  pAmount ALIAS FOR $4;
  pCurrid ALIAS FOR $5;
  pExpcatid ALIAS FOR $6;
  pFor ALIAS FOR $7;
  pNotes ALIAS FOR $8;
  _apchkid INTEGER;
  _bankaccnt_curr_id INTEGER;

BEGIN

  SELECT bankaccnt_curr_id INTO _bankaccnt_curr_id
  FROM bankaccnt
  WHERE bankaccnt_id = pBankaccntid;

  SELECT NEXTVAL(''apchk_apchk_id_seq'') INTO _apchkid;
  INSERT INTO apchk
  ( apchk_id, apchk_vend_id, apchk_bankaccnt_id, apchk_number,
    apchk_amount, apchk_checkdate,
    apchk_misc, apchk_expcat_id,
    apchk_printed, apchk_void, apchk_replaced, apchk_posted,
    apchk_for, apchk_notes, apchk_curr_id )
  VALUES
  ( _apchkid, pVendid, pBankaccntid, fetchNextCheckNumber(pBankaccntid),
    currToCurr(pCurrid, _bankaccnt_curr_id, pAmount, pCheckDate), pCheckDate,
    TRUE, pExpcatid,
    FALSE, FALSE, FALSE, FALSE,
    pFor, pNotes, _bankaccnt_curr_id );

  RETURN _apchkid;

END;
' LANGUAGE 'plpgsql';
