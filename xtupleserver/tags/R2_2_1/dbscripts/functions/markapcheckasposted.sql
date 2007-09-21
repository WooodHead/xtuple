CREATE OR REPLACE FUNCTION markAPCheckASPosted(INTEGER) RETURNS INTEGER AS '
DECLARE
  pApchkid ALIAS FOR $1;

BEGIN

  UPDATE apchk
  SET apchk_posted=TRUE
  WHERE (apchk_id=pApchkid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
