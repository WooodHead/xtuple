CREATE OR REPLACE FUNCTION replaceVoidedAPCheck(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;
  _apchkid INTEGER;

BEGIN

  IF ( ( SELECT ( (NOT apchk_void) OR apchk_posted OR apchk_replaced )
         FROM apchk
         WHERE (apchk_id=pApchkid) ) ) THEN
    RETURN -1;
  END IF;

  SELECT NEXTVAL(''apchk_apchk_id_seq'') INTO _apchkid;

  INSERT INTO apchk
  ( apchk_id, apchk_vend_id, apchk_bankaccnt_id,
    apchk_checkdate, apchk_number, apchk_amount,
    apchk_misc, apchk_expcat_id,
    apchk_printed, apchk_posted, apchk_void, apchk_replaced,
    apchk_curr_id )
  SELECT _apchkid, apchk_vend_id, apchk_bankaccnt_id,
         apchk_checkdate, fetchNextCheckNumber(apchk_bankaccnt_id), apchk_amount,
         apchk_misc, apchk_expcat_id,
         FALSE, FALSE, FALSE, FALSE, apchk_curr_id
  FROM apchk
  WHERE (apchk_id=pApchkid);

  INSERT INTO apchkitem
  ( apchkitem_apchk_id, apchkitem_apopen_id,
    apchkitem_vouchernumber, apchkitem_ponumber, apchkitem_invcnumber,
    apchkitem_amount, apchkitem_discount, apchkitem_curr_id )
  SELECT _apchkid, apchkitem_apopen_id,
         apchkitem_vouchernumber, apchkitem_ponumber, apchkitem_invcnumber,
         apchkitem_amount, apchkitem_discount, apchkitem_curr_id
  FROM apchkitem
  WHERE (apchkitem_apchk_id=pApchkid);

  UPDATE apchk
  SET apchk_replaced=TRUE
  WHERE (apchk_id=pApchkid);

  RETURN _apchkid;

END;
' LANGUAGE 'plpgsql';
