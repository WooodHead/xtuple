CREATE OR REPLACE FUNCTION setuserCanCreateUsers(TEXT, BOOLEAN) RETURNS BOOLEAN AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pUsername ALIAS FOR $1;
  pCreateUser ALIAS FOR $2;

BEGIN

  IF (pCreateUser) THEN
    EXECUTE ''ALTER USER '' || pUsername || '' CREATEUSER;'';
  ELSE
    EXECUTE ''ALTER USER '' || pUsername || '' NOCREATEUSER;'';
  END IF;

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
