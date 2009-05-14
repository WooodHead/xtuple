CREATE OR REPLACE FUNCTION _cobmiscTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    -- Something can go here
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER cobmisctrigger ON cobmisc;
CREATE TRIGGER cobmisctrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON cobmisc
  FOR EACH ROW
  EXECUTE PROCEDURE _cobmiscTrigger();
