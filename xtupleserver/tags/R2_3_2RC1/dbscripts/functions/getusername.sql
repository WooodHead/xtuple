CREATE OR REPLACE FUNCTION getUsername(INTEGER) RETURNS TEXT AS '
DECLARE
  pUserid ALIAS FOR $1;
  _username TEXT;

BEGIN

  SELECT usename INTO _username
  FROM pg_user
  WHERE (usesysid=pUserid);

  IF (FOUND) THEN
    RETURN _username;
  END IF;

  RETURN ''?'';

END;
' LANGUAGE 'plpgsql';
