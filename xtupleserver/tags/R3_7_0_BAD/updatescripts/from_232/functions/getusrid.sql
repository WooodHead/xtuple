CREATE OR REPLACE FUNCTION getUsrId(text) RETURNS INTEGER AS '
DECLARE
  pUsername ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (COALESCE(TRIM(pUsername), '''') = '''') THEN
    RETURN NULL;
  END IF;

  SELECT usr_id INTO _returnVal
  FROM usr
  WHERE (UPPER(usr_username)=UPPER(pUsername));

  IF (_returnVal IS NULL) THEN
    RAISE EXCEPTION ''User % not found.'', pUsername;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
