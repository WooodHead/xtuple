SELECT dropIfExists('TRIGGER', 'pkgheadbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgheadbeforetrigger() RETURNS "trigger" AS '
  BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      NEW.pkghead_created := OLD.pkghead_created;
      NEW.pkghead_updated := CURRENT_TIMESTAMP;
    ELSIF (TG_OP = ''INSERT'') THEN
      NEW.pkghead_created := CURRENT_TIMESTAMP;
      NEW.pkghead_updated := NEW.pkghead_created;
    ELSIF (TG_OP = ''DELETE'') THEN
      -- enforce an order here to avoid dependency errors
      DELETE FROM pkgitem
      WHERE ((pkgitem_pkghead_id=OLD.pkghead_id)
        AND  (pkgitem_type=''V''));
      DELETE FROM pkgitem
      WHERE ((pkgitem_pkghead_id=OLD.pkghead_id)
        AND  (pkgitem_type=''G''));
      DELETE FROM pkgitem
      WHERE ((pkgitem_pkghead_id=OLD.pkghead_id)
        AND  (pkgitem_type=''T''));
      DELETE FROM pkgitem
      WHERE ((pkgitem_pkghead_id=OLD.pkghead_id)
        AND  (pkgitem_type=''F''));
      DELETE FROM pkgitem
      WHERE ((pkgitem_pkghead_id=OLD.pkghead_id)
        AND  (pkgitem_type=''S''));

      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

CREATE TRIGGER pkgheadbeforetrigger
  BEFORE  INSERT OR
	  UPDATE OR
          DELETE
  ON pkghead
  FOR EACH ROW
  EXECUTE PROCEDURE _pkgheadbeforetrigger();
