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

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'prjtaskTrigger');
CREATE TRIGGER prjtaskTrigger BEFORE INSERT OR UPDATE ON prjtask FOR EACH ROW EXECUTE PROCEDURE _prjtaskTrigger();