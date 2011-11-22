CREATE OR REPLACE FUNCTION _prjTrigger () RETURNS TRIGGER AS $$
DECLARE
  _test text;
BEGIN

  --  Checks
  IF NOT (checkPrivilege('MaintainProjects')) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain Projects.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'prjTrigger');
CREATE TRIGGER prjTrigger BEFORE INSERT OR UPDATE ON prj FOR EACH ROW EXECUTE PROCEDURE _prjTrigger();
