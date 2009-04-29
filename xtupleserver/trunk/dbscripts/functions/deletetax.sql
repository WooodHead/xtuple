CREATE OR REPLACE FUNCTION public.deletetax(integer)
  RETURNS integer AS
$BODY$
DECLARE
  ptaxid	ALIAS FOR $1;
BEGIN
  -- these checks allow nice error reporting instead of throwing an SQL error
  IF EXISTS(SELECT taxass_id FROM taxass WHERE (taxass_tax_id=ptaxid)) THEN
    RETURN -10;
  END IF;

  DELETE FROM taxrate WHERE (taxrate_tax_id = ptaxid);
  DELETE FROM tax WHERE (tax_id = ptaxid);

  RETURN ptaxid;

END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE