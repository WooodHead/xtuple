
CREATE OR REPLACE FUNCTION createAROpenItem (integer, text, character, text, date, date, numeric, text) RETURNS integer
    AS '
DECLARE
  pCustid ALIAS FOR $1;
  pDocNumber ALIAS FOR $2;
  pDocType ALIAS FOR $3;
  pOrderNumber ALIAS FOR $4;
  pDocDate ALIAS FOR $5;
  pDueDate ALIAS FOR $6;
  pAmount ALIAS FOR $7;
  pNotes ALIAS FOR $8;
  _glSequence INTEGER;
  _aropenid INTEGER;

BEGIN

  SELECT NEXTVAL(''aropen_aropen_id_seq'') INTO _aropenid;

  SELECT insertGLTransaction( ''A/R'',
                              CASE WHEN (pDocType = ''C'') THEN ''CM''
                                   WHEN (pDocType = ''D'') THEN ''DM''
                                   ELSE ''Error''
                              END,
                              pDocNumber, pNotes, cr.accnt_id, db.accnt_id,
                              _aropenid,
                              CASE WHEN (pDocType = ''C'') THEN (pAmount * -1)
                                   WHEN (pDocType = ''D'') THEN pAmount
                                   ELSE pAmount
                              END,
                              pDocDate ) INTO _glSequence
  FROM accnt AS db, accnt AS cr
  WHERE ( (db.accnt_id = findARAccount(pCustid))
   AND (cr.accnt_id = findPrepaidAccount(pCustid)) );
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  INSERT INTO aropen
  ( aropen_id, aropen_cust_id, aropen_docnumber, aropen_doctype, aropen_ordernumber,
    aropen_docdate, aropen_duedate, aropen_distdate, aropen_terms_id, aropen_salesrep_id,
    aropen_amount, aropen_paid, aropen_commission_due, aropen_commission_paid,
    aropen_applyto, aropen_ponumber, aropen_cobmisc_id, aropen_journalnumber,
    aropen_open, aropen_notes )
  VALUES
  ( _aropenid, pCustid, pDocNumber, pDocType, pOrderNumber,
    pDocDate, pDueDate, pDocDate, -1, -1,
    pAmount, 0, 0, FALSE,
    '''', '''', -1, 0,
    TRUE, pNotes );

  RETURN _aropenid;

END;
' LANGUAGE plpgsql;

