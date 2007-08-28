CREATE OR REPLACE FUNCTION _cmitemTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    IF((COALESCE(OLD.cmitem_tax_ratea,0.0)
      + COALESCE(OLD.cmitem_tax_rateb,0.0)
      + COALESCE(OLD.cmitem_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateCmheadTaxTotal(OLD.cmitem_cmhead_id);
    END IF;
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    IF((COALESCE(NEW.cmitem_tax_ratea,0.0)
      + COALESCE(NEW.cmitem_tax_rateb,0.0)
      + COALESCE(NEW.cmitem_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateCmheadTaxTotal(NEW.cmitem_cmhead_id);
    END IF;
  ELSE
    IF((COALESCE(NEW.cmitem_tax_ratea,0.0)
      + COALESCE(NEW.cmitem_tax_rateb,0.0)
      + COALESCE(NEW.cmitem_tax_ratec,0.0))
       <> 
       (COALESCE(OLD.cmitem_tax_ratea,0.0)
      + COALESCE(OLD.cmitem_tax_rateb,0.0)
      + COALESCE(OLD.cmitem_tax_ratec,0.0)) ) THEN
      PERFORM recalculateCmheadTaxTotal(NEW.cmitem_cmhead_id);
    END IF;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER cmitemtrigger ON cmitem;
CREATE TRIGGER cmitemtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON cmitem
  FOR EACH ROW
  EXECUTE PROCEDURE _cmitemTrigger();
