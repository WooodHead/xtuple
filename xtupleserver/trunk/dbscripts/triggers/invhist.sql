CREATE OR REPLACE FUNCTION invhistTrig() RETURNS TRIGGER AS '
BEGIN

  IF ( ( SELECT itemsite_freeze
         FROM itemsite
         WHERE (itemsite_id=NEW.invhist_itemsite_id) ) ) THEN
    NEW.invhist_posted = FALSE;
  END IF;

  RETURN NEW;

END;
' LANGUAGE 'plpgsql';

DROP TRIGGER invhistTrigger ON invhist;
CREATE TRIGGER invhistTrigger BEFORE INSERT ON invhist FOR EACH ROW EXECUTE PROCEDURE invhistTrig();
