CREATE OR REPLACE FUNCTION invhistTrig() RETURNS TRIGGER AS $$
BEGIN

  IF (NEW.invhist_qoh_after < 0 AND NEW.invhist_costmethod = 'A') THEN
    RAISE EXCEPTION 'Invhist (%) is recording with average costing and is not allowed to have a negative quantity on hand.', NEW.itemsite_id;
  END IF;

  IF ( ( SELECT itemsite_freeze
         FROM itemsite
         WHERE (itemsite_id=NEW.invhist_itemsite_id) ) ) THEN
    NEW.invhist_posted = FALSE;
  END IF;

  -- never change the created timestamp, which defaults to CURRENT_TIMESTAMP
  IF (TG_OP != 'INSERT') THEN
    NEW.invhist_created = OLD.invhist_created;
  END IF;

  RETURN NEW;

END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'invhistTrigger');
CREATE TRIGGER invhistTrigger BEFORE INSERT OR UPDATE ON invhist FOR EACH ROW EXECUTE PROCEDURE invhistTrig();
