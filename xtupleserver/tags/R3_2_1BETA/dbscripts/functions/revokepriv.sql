CREATE OR REPLACE FUNCTION revokePriv(TEXT, INTEGER) RETURNS BOOL AS '
DECLARE
  pUsername ALIAS FOR $1;
  pPrivid ALIAS FOR $2;

BEGIN

  DELETE FROM usrpriv
  WHERE ( (usrpriv_username=pUsername)
   AND (usrpriv_priv_id=pPrivid) );

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION revokePriv(INTEGER, INTEGER) RETURNS BOOL AS '
DECLARE
  pUserId ALIAS FOR $1;
  pPrivid ALIAS FOR $2;

BEGIN

  DELETE FROM usrpriv
  WHERE ((usrpriv_usr_id=pUserId)
   AND (usrpriv_priv_id=pPrivid));

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
