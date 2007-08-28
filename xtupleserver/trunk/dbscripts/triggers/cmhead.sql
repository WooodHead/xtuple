CREATE OR REPLACE FUNCTION _cmheadTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    -- Something can go here
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    -- Something can go here
  ELSE
    IF((COALESCE(NEW.cmhead_adjtax_ratea,0.0)
      + COALESCE(NEW.cmhead_adjtax_rateb,0.0)
      + COALESCE(NEW.cmhead_adjtax_ratec,0.0)
      + COALESCE(NEW.cmhead_freighttax_ratea,0.0)
      + COALESCE(NEW.cmhead_freighttax_rateb,0.0)
      + COALESCE(NEW.cmhead_freighttax_ratec,0.0))
       <> 
       (COALESCE(OLD.cmhead_adjtax_ratea,0.0)
      + COALESCE(OLD.cmhead_adjtax_rateb,0.0)
      + COALESCE(OLD.cmhead_adjtax_ratec,0.0)
      + COALESCE(OLD.cmhead_freighttax_ratea,0.0)
      + COALESCE(OLD.cmhead_freighttax_rateb,0.0)
      + COALESCE(OLD.cmhead_freighttax_ratec,0.0)) ) THEN
      PERFORM recalculateCmheadTaxTotal(NEW.cmhead_id);
    END IF;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER cmheadtrigger ON cmhead;
CREATE TRIGGER cmheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON cmhead
  FOR EACH ROW
  EXECUTE PROCEDURE _cmheadTrigger();
