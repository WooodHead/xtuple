CREATE OR REPLACE FUNCTION getEffectiveXtUser() RETURNS TEXT AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _value TEXT := null;
BEGIN
  PERFORM initEffectiveXtUser();

  SELECT effective_value
    INTO _value
    FROM effective_user
   WHERE effective_key = 'username';

  IF FOUND AND _value IS NOT NULL THEN
    RETURN _value;
  END IF;

  RETURN CURRENT_USER;
END;
$$ LANGUAGE 'plpgsql' STABLE;

