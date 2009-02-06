CREATE OR REPLACE FUNCTION _cobmiscTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    -- Something can go here
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    -- Something can go here
  ELSE
    IF((COALESCE(NEW.cobmisc_adjtax_ratea,0.0)
      + COALESCE(NEW.cobmisc_adjtax_rateb,0.0)
      + COALESCE(NEW.cobmisc_adjtax_ratec,0.0)
      + COALESCE(NEW.cobmisc_freighttax_ratea,0.0)
      + COALESCE(NEW.cobmisc_freighttax_rateb,0.0)
      + COALESCE(NEW.cobmisc_freighttax_ratec,0.0))
       <> 
       (COALESCE(OLD.cobmisc_adjtax_ratea,0.0)
      + COALESCE(OLD.cobmisc_adjtax_rateb,0.0)
      + COALESCE(OLD.cobmisc_adjtax_ratec,0.0)
      + COALESCE(OLD.cobmisc_freighttax_ratea,0.0)
      + COALESCE(OLD.cobmisc_freighttax_rateb,0.0)
      + COALESCE(OLD.cobmisc_freighttax_ratec,0.0)) ) THEN
      PERFORM recalculateCobmiscTaxTotal(NEW.cobmisc_id);
    END IF;
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
