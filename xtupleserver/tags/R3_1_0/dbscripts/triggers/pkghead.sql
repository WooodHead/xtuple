SELECT dropIfExists('TRIGGER', 'pkgheadbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgheadbeforetrigger() RETURNS "trigger" AS $$
  DECLARE
    _r    RECORD;

  BEGIN
    IF (TG_OP = 'UPDATE') THEN
      NEW.pkghead_created := OLD.pkghead_created;
      NEW.pkghead_updated := CURRENT_TIMESTAMP;

    ELSIF (TG_OP = 'INSERT') THEN
      NEW.pkghead_created := CURRENT_TIMESTAMP;
      NEW.pkghead_updated := NEW.pkghead_created;

    ELSIF (TG_OP = 'DELETE') THEN
      DELETE FROM pkgdep WHERE pkgdep_pkghead_id=OLD.pkghead_id;

      -- enforce an order here to avoid dependency errors, saving the schema
      -- for later
      FOR _r IN SELECT *,
                      CASE WHEN pkgitem_type = 'V' THEN 1
                           WHEN pkgitem_type = 'G' THEN 2
                           WHEN pkgitem_type = 'T' THEN 3
                           WHEN pkgitem_type = 'F' THEN 4
                           WHEN pkgitem_type = 'P' THEN 5
                           ELSE 0
                      END AS seq
                FROM pkgitem
                WHERE ((pkgitem_pkghead_id=OLD.pkghead_id)
                   AND (pkgitem_type != 'S'))
                ORDER BY seq LOOP
        DELETE FROM pkgitem WHERE (pkgitem_id=_r.pkgitem_id);
      END LOOP;

      EXECUTE 'DROP SCHEMA ' || OLD.pkghead_name || ' CASCADE';

      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER pkgheadbeforetrigger
  BEFORE  INSERT OR
	  UPDATE OR
          DELETE
  ON pkghead
  FOR EACH ROW
  EXECUTE PROCEDURE _pkgheadbeforetrigger();
