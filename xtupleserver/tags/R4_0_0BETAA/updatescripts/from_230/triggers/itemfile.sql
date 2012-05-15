CREATE OR REPLACE FUNCTION _itemfileTrigger () RETURNS TRIGGER AS '
BEGIN

-- Privilege Checks
   IF (NOT checkPrivilege(''MaintainItemMasters'') ) THEN
     RAISE EXCEPTION ''You do not have privileges to maintain Item Files.'';
   END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER itemfileTrigger ON itemfile;
CREATE TRIGGER itemfileTrigger AFTER INSERT OR UPDATE ON itemfile FOR EACH ROW EXECUTE PROCEDURE _itemfileTrigger();
