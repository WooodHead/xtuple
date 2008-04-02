CREATE OR REPLACE FUNCTION checkPrivilege(text) RETURNS BOOLEAN AS '
DECLARE
  pPrivilege ALIAS FOR $1;
  _result TEXT;
BEGIN
  SELECT priv_id INTO _result
  FROM priv, usrpriv
  WHERE ((priv_id=usrpriv_priv_id)
  AND (priv_name=pPrivilege)
  AND (usrpriv_username=current_user));
  
  IF (FOUND) THEN
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
' LANGUAGE 'plpgsql';
