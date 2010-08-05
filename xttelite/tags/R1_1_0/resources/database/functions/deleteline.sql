-- Function: te.deleteline(integer, integer)

-- DROP FUNCTION te.deleteline(integer, integer);

CREATE OR REPLACE FUNCTION te.deleteline(integer, integer)
  RETURNS integer AS
$BODY$
DECLARE
  pSheetheadid ALIAS FOR $1;
  pLine ALIAS FOR $2;
BEGIN

  DELETE FROM te.timedtl
  WHERE (timedtl_timehead_id=pSheetheadid and timedtl_linenumber=pLine);

  RETURN pSheetheadid;

END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.deleteline(integer, integer) OWNER TO "admin";
