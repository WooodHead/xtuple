CREATE OR REPLACE FUNCTION _invcheadTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    -- Something can go here
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    -- Something can go here
  ELSE
    IF((COALESCE(NEW.invchead_adjtax_ratea,0.0)
      + COALESCE(NEW.invchead_adjtax_rateb,0.0)
      + COALESCE(NEW.invchead_adjtax_ratec,0.0)
      + COALESCE(NEW.invchead_freighttax_ratea,0.0)
      + COALESCE(NEW.invchead_freighttax_rateb,0.0)
      + COALESCE(NEW.invchead_freighttax_ratec,0.0))
       <> 
       (COALESCE(OLD.invchead_adjtax_ratea,0.0)
      + COALESCE(OLD.invchead_adjtax_rateb,0.0)
      + COALESCE(OLD.invchead_adjtax_ratec,0.0)
      + COALESCE(OLD.invchead_freighttax_ratea,0.0)
      + COALESCE(OLD.invchead_freighttax_rateb,0.0)
      + COALESCE(OLD.invchead_freighttax_ratec,0.0)) ) THEN
      PERFORM recalculateInvcheadTaxTotal(NEW.invchead_id);
    END IF;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER invcheadtrigger ON invchead;
CREATE TRIGGER invcheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON invchead
  FOR EACH ROW
  EXECUTE PROCEDURE _invcheadTrigger();
