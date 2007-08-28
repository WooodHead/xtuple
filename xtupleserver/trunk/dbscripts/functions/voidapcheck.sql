CREATE OR REPLACE FUNCTION voidAPCheck(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;

BEGIN

  IF ( ( SELECT (apchk_void OR apchk_posted OR apchk_replaced)
         FROM apchk
         WHERE (apchk_id=pApchkid) ) ) THEN
    RETURN -1;
  END IF;

  UPDATE apchk
  SET apchk_void=TRUE
  WHERE (apchk_id=pApchkid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
