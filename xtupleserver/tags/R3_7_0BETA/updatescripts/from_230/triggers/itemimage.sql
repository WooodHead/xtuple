CREATE OR REPLACE FUNCTION _itemimageTrigger () RETURNS TRIGGER AS '
BEGIN

-- Privilege Checks
   IF (NOT checkPrivilege(''MaintainItemMasters'')) THEN
     RAISE EXCEPTION ''You do not have privileges to maintain Items.'';
   END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER itemimageTrigger ON itemimage;
CREATE TRIGGER itemimageTrigger AFTER INSERT OR UPDATE ON itemimage FOR EACH ROW EXECUTE PROCEDURE _itemimageTrigger();
