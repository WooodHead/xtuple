CREATE OR REPLACE FUNCTION getCntctId(text) RETURNS INTEGER AS '
DECLARE
  pContactNumber ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (COALESCE(TRIM(pContactNumber), '''') = '''') THEN
    RETURN NULL;
  END IF;

  SELECT cntct_id INTO _returnVal
  FROM cntct
  WHERE (cntct_number=pContactNumber);

  IF (_returnVal IS NULL) THEN
    RAISE EXCEPTION ''Contact Number % not found.'', pContactNumber;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
