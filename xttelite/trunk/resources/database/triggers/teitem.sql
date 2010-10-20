CREATE OR REPLACE FUNCTION te.triggerteitem() RETURNS "trigger" AS $$
DECLARE
_r RECORD;
_status CHAR(1) := 'C';

BEGIN

  -- Update header status, default is to close if all processing complete
  IF (TG_OP = 'UPDATE') THEN
    IF ((COALESCE(OLD.teitem_invcitem_id,-1) != COALESCE(NEW.teitem_invcitem_id,-1))
      OR (COALESCE(OLD.teitem_vodist_id,-1) != COALESCE(NEW.teitem_vodist_id,-1))
      OR (OLD.teitem_posted != NEW.teitem_posted)) THEN

      SELECT 
        te.sheetstate(NEW.teitem_tehead_id, 'I') AS invoiced,
        te.sheetstate(NEW.teitem_tehead_id, 'V') AS vouchered,
        te.sheetstate(NEW.teitem_tehead_id, 'P') AS posted
      INTO _r;

      IF (_r.invoiced = 0 OR _r.vouchered = 0 OR _r.posted = 0) THEN
        _status := 'A'; -- Something is still open, so approved
      END IF;
    
      UPDATE te.tehead SET tehead_status = _status WHERE (tehead_id=NEW.teitem_tehead_id);
    END IF;
  END IF;

  -- Update header with last use info
  IF (TG_OP = 'DELETE') THEN
    UPDATE te.tehead SET
      tehead_lastupdated=('now'::text)::timestamp(6) with time zone
    WHERE (tehead_id=OLD.teitem_tehead_id);
  ELSE
    UPDATE te.tehead SET
      tehead_lastupdated=('now'::text)::timestamp(6) with time zone
    WHERE (tehead_id=NEW.teitem_tehead_id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'teitemtrigger', 'te');
CREATE TRIGGER teitemTrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON te.teitem
  FOR EACH ROW
  EXECUTE PROCEDURE te.triggerteitem();
