CREATE OR REPLACE FUNCTION _alarmtrigger() RETURNS "trigger" AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
  BEGIN
    --- clear the number from the issue cache
    PERFORM clearNumberIssue('AlarmNumber', NEW.alarm_number::INTEGER);

    RETURN NEW;
  END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'alarmtrigger');
CREATE TRIGGER alarmtrigger
  BEFORE  INSERT 
  ON alarm
  FOR EACH ROW
  EXECUTE PROCEDURE _alarmtrigger();
