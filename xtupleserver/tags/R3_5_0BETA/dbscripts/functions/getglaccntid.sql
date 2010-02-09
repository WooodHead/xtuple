CREATE OR REPLACE FUNCTION getGlAccntId(text) RETURNS INTEGER AS '
DECLARE
  pGlAccnt ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (pGlAccnt IS NULL) THEN
	RETURN NULL;
  END IF;

  SELECT accnt_id INTO _returnVal
  FROM accnt
  WHERE (formatglaccount(accnt_id)=pGlAccnt);

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION ''Account Number % not found.'', pGlAccnt;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
