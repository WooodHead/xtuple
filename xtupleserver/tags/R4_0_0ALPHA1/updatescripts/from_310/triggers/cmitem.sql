CREATE OR REPLACE FUNCTION _cmitemBeforeTrigger() RETURNS "trigger" AS '
DECLARE
  _check BOOLEAN;
  _id INTEGER;
BEGIN
  -- Checks
  -- Start with privileges
  SELECT checkPrivilege(''MaintainCreditMemos'') INTO _check;
  IF NOT (_check) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Credit Memos.'';
  END IF;

  IF (TG_OP = ''DELETE'') THEN
    RETURN OLD;
  END IF;

  IF (TG_OP = ''INSERT'') THEN
    IF ( (NEW.cmitem_qtycredit IS NULL) OR (NEW.cmitem_qtycredit = 0) ) THEN
      RAISE EXCEPTION ''Quantity to Credit must be greater than zero.'';
    END IF;
    SELECT cmitem_id INTO _id
    FROM cmitem
    WHERE ( (cmitem_cmhead_id=NEW.cmitem_cmhead_id) AND (cmitem_linenumber=NEW.cmitem_linenumber) );
    IF (FOUND) THEN
      RAISE EXCEPTION ''The Memo Line Number is already in use.'';
    END IF;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'cmitembeforetrigger');
CREATE TRIGGER cmitembeforetrigger
  BEFORE INSERT OR UPDATE OR DELETE
  ON cmitem
  FOR EACH ROW
  EXECUTE PROCEDURE _cmitemBeforeTrigger();


CREATE OR REPLACE FUNCTION _cmitemTrigger() RETURNS "trigger" AS '
DECLARE
  _ext NUMERIC;

BEGIN
  IF (TG_OP = ''DELETE'') THEN
    IF((COALESCE(OLD.cmitem_tax_ratea,0.0)
      + COALESCE(OLD.cmitem_tax_rateb,0.0)
      + COALESCE(OLD.cmitem_tax_ratec,0.0)) <> 0.0) THEN
      PERFORM recalculateCmheadTaxTotal(OLD.cmitem_cmhead_id);
    END IF;

--  If this was created by a return, reset return values
    IF (OLD.cmitem_raitem_id) IS NOT NULL THEN
      _ext := ROUND((OLD.cmitem_qtycredit * OLD.cmitem_qty_invuomratio) *  (OLD.cmitem_unitprice / OLD.cmitem_price_invuomratio),2);
      UPDATE raitem SET
        raitem_qtycredited = raitem_qtycredited-OLD.cmitem_qtycredit,
        raitem_amtcredited = raitem_amtcredited-_ext
      WHERE (raitem_id=OLD.cmitem_raitem_id);
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

SELECT dropIfExists('TRIGGER', 'cmitemtrigger');
CREATE TRIGGER cmitemtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON cmitem
  FOR EACH ROW
  EXECUTE PROCEDURE _cmitemTrigger();
