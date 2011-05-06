CREATE OR REPLACE FUNCTION _invcheadBeforeTrigger() RETURNS "trigger" AS $$
DECLARE

BEGIN
  IF (TG_OP = 'DELETE') THEN
    DELETE FROM invcheadtax
    WHERE (taxhist_parent_id=OLD.invchead_id);

    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'invcheadBeforeTrigger');
CREATE TRIGGER invcheadBeforeTrigger
  BEFORE INSERT OR UPDATE OR DELETE
  ON invchead
  FOR EACH ROW
  EXECUTE PROCEDURE _invcheadBeforeTrigger();

CREATE OR REPLACE FUNCTION _invcheadTrigger() RETURNS "trigger" AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    -- Something can go here
    RETURN OLD;
  END IF;

-- Insert new row
  IF (TG_OP = 'INSERT') THEN

  -- Calculate Freight Tax
    IF (NEW.invchead_freight <> 0) THEN
      PERFORM calculateTaxHist( 'invcheadtax',
                                NEW.invchead_id,
                                NEW.invchead_taxzone_id,
                                getFreightTaxtypeId(),
                                NEW.invchead_invcdate,
                                NEW.invchead_curr_id,
                                NEW.invchead_freight );
    END IF;
  END IF;

-- Update row
  IF (TG_OP = 'UPDATE') THEN

    IF ( (NEW.invchead_freight <> OLD.invchead_freight) OR
         (COALESCE(NEW.invchead_taxzone_id,-1) <> COALESCE(OLD.invchead_taxzone_id,-1)) OR
         (NEW.invchead_invcdate <> OLD.invchead_invcdate) OR
         (NEW.invchead_curr_id <> OLD.invchead_curr_id) ) THEN
  -- Calculate invchead Tax
      PERFORM calculateTaxHist( 'invcheadtax',
                                NEW.invchead_id,
                                NEW.invchead_taxzone_id,
                                getFreightTaxtypeId(),
                                NEW.invchead_invcdate,
                                NEW.invchead_curr_id,
                                NEW.invchead_freight );
    END IF;

    IF ( (COALESCE(NEW.invchead_taxzone_id,-1) <> COALESCE(OLD.invchead_taxzone_id,-1)) OR
         (NEW.invchead_invcdate <> OLD.invchead_invcdate) OR
         (NEW.invchead_curr_id <> OLD.invchead_curr_id) ) THEN
  -- Calculate invcitem Tax
      IF (COALESCE(NEW.invchead_taxzone_id,-1) <> COALESCE(OLD.invchead_taxzone_id,-1)) THEN
    -- Invcitem trigger will calculate tax
        UPDATE invcitem SET invcitem_taxtype_id=getItemTaxType(invcitem_item_id,NEW.invchead_taxzone_id)
        WHERE (invcitem_invchead_id=NEW.invchead_id);
      ELSE
        PERFORM calculateTaxHist( 'invcitemtax',
                                  invcitem_id,
                                  NEW.invchead_taxzone_id,
                                  invcitem_taxtype_id,
                                  NEW.invchead_invcdate,
                                  NEW.invchead_curr_id,
                                  (invcitem_billed * invcitem_qty_invuomratio) *
                                  (invcitem_price / invcitem_price_invuomratio) )
        FROM invcitem
        WHERE (invcitem_invchead_id = NEW.invchead_id);
      END IF;
    END IF;

  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'invcheadtrigger');
CREATE TRIGGER invcheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON invchead
  FOR EACH ROW
  EXECUTE PROCEDURE _invcheadTrigger();
