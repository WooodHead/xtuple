-- Function: te.getsheetid(text)

-- DROP FUNCTION te.getsheetid(text);

CREATE OR REPLACE FUNCTION te.getsheetid(text)
  RETURNS integer AS
$BODY$
DECLARE
  pSheet ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (COALESCE(pSheet, '') = '') THEN
    RETURN NULL;
  END IF;

  SELECT tehead_id INTO _returnVal
  FROM te.tehead
  WHERE (tehead_number=pSheet) LIMIT 1;

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION 'Sheet % not found.', pSheet;
  END IF;

  RETURN _returnVal;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.getsheetid(text) OWNER TO "admin";
