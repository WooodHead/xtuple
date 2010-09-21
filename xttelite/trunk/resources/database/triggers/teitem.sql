CREATE OR REPLACE FUNCTION te.triggerteitem() RETURNS "trigger" AS $$
BEGIN

  -- Reset status if any processing reversed
  IF ((OLD.teitem_invcitem_id IS NOT NULL AND NEW.teitem_invcitem_id IS NULL)
    OR (OLD.teitem_vohead_id IS NOT NULL AND NEW.teitem_vohead_id IS NULL)
    OR (OLD.teitem_posted AND NOT NEW.teitem_posted)) THEN

    UPDATE te.tehead SET tehead_status = 'A' WHERE (tehead_id=NEW.teitem_tehead_id);
    
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'teitemtrigger', 'te');
CREATE TRIGGER teitemTrigger
  BEFORE UPDATE
  ON te.teitem
  FOR EACH ROW
  EXECUTE PROCEDURE te.triggerteitem();
