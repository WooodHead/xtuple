CREATE OR REPLACE FUNCTION getEffectiveXtUser() RETURNS TEXT AS $$
BEGIN
  -- this needs to be expanded to determine what the effective user
  -- may be, returning that value otherwise fall back to CURRENT_USER
  RETURN CURRENT_USER;
END;
$$ LANGUAGE 'plpgsql' STABLE;
