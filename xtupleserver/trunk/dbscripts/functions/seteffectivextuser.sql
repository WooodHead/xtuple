CREATE OR REPLACE FUNCTION setEffectiveXtUser(TEXT) RETURNS BOOL AS $$
DECLARE
  pUsername ALIAS FOR $1;
BEGIN
  -- this currently does nothing
  RETURN false;
END;
$$ LANGUAGE 'plpgsql';
