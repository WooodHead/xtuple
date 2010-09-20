CREATE OR REPLACE FUNCTION te.triggerteitem() RETURNS "trigger" AS $$
BEGIN

  -- Reset status if any processing reversed
  IF ((OLD.teitem_invchead_id IS NOT NULL AND NEW.teitem_invchead_id IS NULL)
    OR (OLD.teitem_vohead_id IS NOT NULL AND NEW.teitem_vohead_id IS NULL)
    OR (OLD.teitem_posted AND NOT NEW.teitem_posted)) THEN

    NEW.teitem_status = 'A';
    
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
