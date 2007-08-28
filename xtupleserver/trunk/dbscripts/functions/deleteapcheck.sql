CREATE OR REPLACE FUNCTION deleteAPCheck(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;

BEGIN

  IF ( ( SELECT ( (NOT apchk_void) OR apchk_posted OR apchk_replaced OR apchk_deleted)
         FROM apchk
         WHERE (apchk_id=pApchkid) ) ) THEN
    RETURN -1;
  END IF;

  UPDATE apchk
  SET apchk_deleted=TRUE
  WHERE (apchk_id=pApchkid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
