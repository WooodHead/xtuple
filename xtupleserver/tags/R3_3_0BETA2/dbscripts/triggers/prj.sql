CREATE OR REPLACE FUNCTION _prjTrigger () RETURNS TRIGGER AS $$
DECLARE
  _test text;
BEGIN

  --  Checks
  IF NOT (checkPrivilege('MaintainProjects')) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain Projects.';
  END IF;

  SELECT usrpref_username INTO _test
  FROM usrpref
  WHERE ((usrpref_username=NEW.prj_username)
  AND (usrpref_name='active')
  AND (usrpref_value='t'));

  IF NOT (FOUND) THEN
    RAISE EXCEPTION 'Assigned to is not an active user.';
  END IF;

  SELECT usrpref_username INTO _test
  FROM usrpref
  WHERE ((usrpref_username=NEW.prj_owner_username)
  AND (usrpref_name='active')
  AND (usrpref_value='t'));

  IF NOT (FOUND) THEN
    RAISE EXCEPTION 'Owner is not an active user.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'prjTrigger');
CREATE TRIGGER prjTrigger BEFORE INSERT OR UPDATE ON prj FOR EACH ROW EXECUTE PROCEDURE _prjTrigger();