CREATE OR REPLACE FUNCTION _charassTrigger () RETURNS TRIGGER AS '
BEGIN

-- Privilege Checks
   IF (NEW.charass_target_type = ''I'' AND NOT checkPrivilege(''MaintainItemMasters'')) THEN
     RAISE EXCEPTION ''You do not have privileges to maintain Items.'';
   END IF;

   IF (NEW.charass_target_type = ''C'' AND NOT checkPrivilege(''MaintainCustomerMasters'')) THEN
     RAISE EXCEPTION ''You do not have privileges to maintain Customers.'';
   END IF;

-- Data check
  IF (NEW.charass_char_id IS NULL) THEN
	RAISE EXCEPTION ''You must supply a valid Characteristic ID.'';
  END IF;

-- Default Logic
  IF (NEW.charass_default) THEN
    UPDATE charass
    SET charass_default = false 
    WHERE ((charass_target_id=NEW.charass_target_id)
    AND  (charass_target_type=NEW.charass_target_type)
    AND  (charass_char_id=NEW.charass_char_id)
    AND  (charass_id <> NEW.charass_ID));
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER charassTrigger ON charass;
CREATE TRIGGER charassTrigger AFTER INSERT OR UPDATE ON charass FOR EACH ROW EXECUTE PROCEDURE _charassTrigger();
