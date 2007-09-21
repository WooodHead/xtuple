CREATE OR REPLACE FUNCTION _charassTrigger () RETURNS TRIGGER AS '
BEGIN
  IF (NEW.charass_char_id IS NULL) THEN
	RAISE EXCEPTION ''You must supply a valid Characteristic ID.'';
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER charassTrigger ON charass;
CREATE TRIGGER charassTrigger BEFORE INSERT OR UPDATE ON charass FOR EACH ROW EXECUTE PROCEDURE _charassTrigger();
