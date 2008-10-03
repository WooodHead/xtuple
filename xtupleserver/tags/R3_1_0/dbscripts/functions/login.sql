
CREATE OR REPLACE FUNCTION login() RETURNS integer AS '
DECLARE 
  _p RECORD;

BEGIN

  SELECT usr_id, usr_active INTO _p
  FROM usr
  WHERE (usr_username=CURRENT_USER);

  IF (NOT FOUND) THEN
    RETURN -1;

  ELSIF (NOT _p.usr_active) THEN
    RETURN -2;

  ELSE
    RETURN _p.usr_id;
  END IF;

END;
' LANGUAGE 'plpgsql';


