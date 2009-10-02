CREATE OR REPLACE FUNCTION _opheadBeforeTrigger () RETURNS TRIGGER AS $$
DECLARE
  _test text;
BEGIN

  --  Checks
  IF NOT (checkPrivilege('MaintainOpportunities')) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain Opportunities.';
  END IF;

  --  Auto inactivate
  IF ( (NEW.ophead_opstage_id != OLD.ophead_opstage_id) AND
       (SELECT opstage_opinactive FROM opstage WHERE opstage_id=NEW.ophead_opstage_id) ) THEN
    NEW.ophead_active := FALSE;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'opheadBeforeTrigger');
CREATE TRIGGER opheadBeforeTrigger BEFORE INSERT OR UPDATE ON ophead 
FOR EACH ROW EXECUTE PROCEDURE _opheadBeforeTrigger();
