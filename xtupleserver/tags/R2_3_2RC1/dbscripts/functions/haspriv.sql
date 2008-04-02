CREATE OR REPLACE FUNCTION hasPriv(TEXT) RETURNS BOOLEAN AS '
DECLARE
  pPrivName	ALIAS FOR $1;

  _returnVal	BOOLEAN;

BEGIN
  SELECT COALESCE(usrpriv_id, 0) != 0 INTO _returnVal
  FROM priv LEFT OUTER JOIN
       usrpriv ON (priv_id=usrpriv_priv_id AND usrpriv_username = CURRENT_USER)
  WHERE (priv_name=pPrivName);
  IF (_returnVal IS NULL) THEN
    _returnVal := FALSE;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
