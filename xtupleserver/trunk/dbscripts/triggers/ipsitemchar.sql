CREATE OR REPLACE FUNCTION _ipsitemcharBeforeTrigger () RETURNS TRIGGER AS '
BEGIN

  --  Checks
  IF NOT (checkPrivilege(''MaintainPriceSchedules'')) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Price Schedules.'';
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'ipsitemcharBeforeTrigger');
CREATE TRIGGER ipsitemcharBeforeTrigger BEFORE INSERT OR UPDATE OR DELETE ON ipsitemchar FOR EACH ROW EXECUTE PROCEDURE _ipsitemcharBeforeTrigger();
