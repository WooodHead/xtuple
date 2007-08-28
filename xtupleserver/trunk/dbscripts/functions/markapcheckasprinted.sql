CREATE OR REPLACE FUNCTION markAPCheckAsPrinted(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;

BEGIN

  UPDATE apchk
  SET apchk_printed=TRUE
  WHERE (apchk_id=pApchkid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
