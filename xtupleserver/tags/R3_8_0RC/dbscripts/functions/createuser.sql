CREATE OR REPLACE FUNCTION createUser(TEXT, BOOLEAN) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pUsername ALIAS FOR $1;
  pCreateUsers ALIAS FOR $2;
  _sql TEXT;

BEGIN

  _sql := ''CREATE USER '' || pUsername;

  IF (pCreateUsers) THEN
    _sql := _sql || '' CREATEUSER '';
  ELSE
    _sql := _sql || '' NOCREATEUSER '';
  END IF;

  _sql := _sql || ''IN GROUP xtrole;'';

  EXECUTE _sql;

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
