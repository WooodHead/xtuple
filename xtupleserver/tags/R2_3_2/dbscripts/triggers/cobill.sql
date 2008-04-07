CREATE OR REPLACE FUNCTION _cobillTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    IF((COALESCE(OLD.cobill_tax_ratea,0.0)
      + COALESCE(OLD.cobill_tax_rateb,0.0)
      + COALESCE(OLD.cobill_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateCobmiscTaxTotal(OLD.cobill_cobmisc_id);
    END IF;
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    IF((COALESCE(NEW.cobill_tax_ratea,0.0)
      + COALESCE(NEW.cobill_tax_rateb,0.0)
      + COALESCE(NEW.cobill_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateCobmiscTaxTotal(NEW.cobill_cobmisc_id);
    END IF;
  ELSE
    IF((COALESCE(NEW.cobill_tax_ratea,0.0)
      + COALESCE(NEW.cobill_tax_rateb,0.0)
      + COALESCE(NEW.cobill_tax_ratec,0.0))
       <> 
       (COALESCE(OLD.cobill_tax_ratea,0.0)
      + COALESCE(OLD.cobill_tax_rateb,0.0)
      + COALESCE(OLD.cobill_tax_ratec,0.0)) ) THEN
      PERFORM recalculateCobmiscTaxTotal(NEW.cobill_cobmisc_id);
    END IF;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER cobilltrigger ON cobill;
CREATE TRIGGER cobilltrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON cobill
  FOR EACH ROW
  EXECUTE PROCEDURE _cobillTrigger();
