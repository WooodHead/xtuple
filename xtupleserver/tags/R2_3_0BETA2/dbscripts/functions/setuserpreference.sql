CREATE OR REPLACE FUNCTION setUserPreference(TEXT, TEXT) RETURNS BOOLEAN AS '
DECLARE
  pPrefName ALIAS FOR $1;
  pPrefValue ALIAS FOR $2;

BEGIN

  PERFORM setUserPreferences(CURRENT_USER, pPrefName, pPrefValue);
  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION setUserPreference(INTEGER, TEXT, TEXT) RETURNS BOOLEAN AS '
DECLARE
  pUserid ALIAS FOR $1;
  pPrefName ALIAS FOR $2;
  pPrefValue ALIAS FOR $3;
  _usrprefid INTEGER;

BEGIN

  SELECT usrpref_id INTO _usrprefid
  FROM usrpref
  WHERE ((usrpref_usr_id=pUserid)
   AND (usrpref_name=pPrefName));

  IF (FOUND) THEN
    UPDATE usrpref
    SET usrpref_value=pPrefValue
    WHERE (usrpref_id=_usrprefid);

  ELSE
    INSERT INTO usrpref
    (usrpref_usr_id, usrpref_name, usrpref_value)
    VALUES
    (pUserid, pPrefName, pPrefValue);
  END IF;

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION setUserPreference(TEXT, TEXT, TEXT) RETURNS BOOLEAN AS '
DECLARE
  pUsername ALIAS FOR $1;
  pPrefName ALIAS FOR $2;
  pPrefValue ALIAS FOR $3;
  _usrprefid INTEGER;

BEGIN

  SELECT usrpref_id INTO _usrprefid
  FROM usrpref
  WHERE ( (usrpref_username=pUsername)
   AND (usrpref_name=pPrefName) );

  IF (FOUND) THEN
    UPDATE usrpref
    SET usrpref_value=pPrefValue
    WHERE (usrpref_id=_usrprefid);

  ELSE
    INSERT INTO usrpref
    (usrpref_username, usrpref_name, usrpref_value)
    VALUES
    (pUsername, pPrefName, pPrefValue);
  END IF;

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
