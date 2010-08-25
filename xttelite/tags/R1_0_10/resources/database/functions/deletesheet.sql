-- Function: te.deletesheet(integer)

-- DROP FUNCTION te.deletesheet(integer);

CREATE OR REPLACE FUNCTION te.deletesheet(integer)
  RETURNS integer AS
$BODY$
DECLARE
  pSheetheadid ALIAS FOR $1;

BEGIN

  DELETE FROM te.teitem
  WHERE (teitem_tehead_id=pSheetheadid);

  DELETE FROM te.tehead
  WHERE (tehead_id=pSheetheadid);

  RETURN pSheetheadid;

END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.deletesheet(integer) OWNER TO "admin";
