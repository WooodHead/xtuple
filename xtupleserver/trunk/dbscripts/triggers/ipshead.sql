CREATE OR REPLACE FUNCTION _ipsheadBeforeTrigger () RETURNS TRIGGER AS '
BEGIN

  --  Checks
  IF NOT (checkPrivilege(''MaintainPriceSchedules'')) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Price Schedules.'';
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'ipsheadBeforeTrigger');
CREATE TRIGGER ipsheadBeforeTrigger BEFORE INSERT OR UPDATE OR DELETE ON ipshead FOR EACH ROW EXECUTE PROCEDURE _ipsheadBeforeTrigger();
