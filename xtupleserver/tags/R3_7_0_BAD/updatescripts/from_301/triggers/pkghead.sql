SELECT dropIfExists('TRIGGER', 'pkgheadbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgheadbeforetrigger() RETURNS "trigger" AS '
  BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      NEW.pkghead_created := OLD.pkghead_created;
      NEW.pkghead_updated := CURRENT_TIMESTAMP;
    ELSIF (TG_OP = ''INSERT'') THEN
      NEW.pkghead_created := CURRENT_TIMESTAMP;
      NEW.pkghead_updated := NEW.pkghead_created;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

CREATE TRIGGER pkgheadbeforetrigger
  BEFORE  INSERT OR
	  UPDATE -- OR DELETE
  ON pkghead
  FOR EACH ROW
  EXECUTE PROCEDURE _pkgheadbeforetrigger();
