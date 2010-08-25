
-- Function: te.maxline(integer)

-- DROP FUNCTION te.maxline(integer);

CREATE OR REPLACE FUNCTION te.maxline(integer)
  RETURNS integer AS
$BODY$
DECLARE
  pHeadID ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN

  SELECT max(teitem_linenumber) INTO _returnVal
  FROM te.teitem
  WHERE (teitem_tehead_id=pHeadID);

  IF (_returnVal IS NULL) THEN
	--RAISE EXCEPTION 'Sheet % not found.', pHeadID;
	_returnVal = 1;
  END IF;

  RETURN _returnVal;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.maxline(integer) OWNER TO "admin";
