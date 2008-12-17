CREATE OR REPLACE FUNCTION _invcitemTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    IF((COALESCE(OLD.invcitem_tax_ratea,0.0)
      + COALESCE(OLD.invcitem_tax_rateb,0.0)
      + COALESCE(OLD.invcitem_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateInvcheadTaxTotal(OLD.invcitem_invchead_id);
    END IF;
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    IF((COALESCE(NEW.invcitem_tax_ratea,0.0)
      + COALESCE(NEW.invcitem_tax_rateb,0.0)
      + COALESCE(NEW.invcitem_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateInvcheadTaxTotal(NEW.invcitem_invchead_id);
    END IF;
  ELSE
    IF((COALESCE(NEW.invcitem_tax_ratea,0.0)
      + COALESCE(NEW.invcitem_tax_rateb,0.0)
      + COALESCE(NEW.invcitem_tax_ratec,0.0))
       <> 
       (COALESCE(OLD.invcitem_tax_ratea,0.0)
      + COALESCE(OLD.invcitem_tax_rateb,0.0)
      + COALESCE(OLD.invcitem_tax_ratec,0.0)) ) THEN
      PERFORM recalculateInvcheadTaxTotal(NEW.invcitem_invchead_id);
    END IF;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER invcitemtrigger ON invcitem;
CREATE TRIGGER invcitemtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON invcitem
  FOR EACH ROW
  EXECUTE PROCEDURE _invcitemTrigger();
