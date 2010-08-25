-- Function: te.minline(integer)

-- DROP FUNCTION te.minline(integer);

CREATE OR REPLACE FUNCTION te.minline(integer)
  RETURNS integer AS
$BODY$
DECLARE
  pHeadID ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN

  SELECT min(teitem_linenumber) INTO _returnVal
  FROM te.teitem
  WHERE (teitem_tehead_id=pHeadID);

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION 'Sheet % not found.', pHeadID;
  END IF;

  RETURN _returnVal;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.minline(integer) OWNER TO "admin";
