CREATE OR REPLACE FUNCTION _prjtaskTrigger () RETURNS TRIGGER AS $$
DECLARE
  _test text;
BEGIN

  --  Checks
  IF NOT (checkPrivilege('MaintainProjects')) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain Projects.';
  ELSIF (LENGTH(COALESCE(NEW.prjtask_number,'')) = 0) THEN
    RAISE EXCEPTION 'You must ender a valid number.';
  ELSIF (LENGTH(COALESCE(NEW.prjtask_name,'')) = 0) THEN
    RAISE EXCEPTION 'You must ender a valid name.';	
  END IF;

  SELECT usrpref_username INTO _test
  FROM usrpref
  WHERE ((usrpref_username=NEW.prjtask_username)
  AND (usrpref_name='active')
  AND (usrpref_value='t'));

  IF NOT (FOUND) THEN
    RAISE EXCEPTION 'Assigned to is not an active user.';
  END IF;

  SELECT usrpref_username INTO _test
  FROM usrpref
  WHERE ((usrpref_username=NEW.prjtask_owner_username)
  AND (usrpref_name='active')
  AND (usrpref_value='t'));

  IF NOT (FOUND) THEN
    RAISE EXCEPTION 'Owner is not an active user.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'prjtaskTrigger');
CREATE TRIGGER prjtaskTrigger BEFORE INSERT OR UPDATE ON prjtask FOR EACH ROW EXECUTE PROCEDURE _prjtaskTrigger();