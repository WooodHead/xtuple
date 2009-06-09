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

  -- Calculate Freight Tax
    IF ( (NEW.invchead_freight <> OLD.invchead_freight) OR
         (NEW.invchead_taxzone_id <> OLD.invchead_taxzone_id) OR
         (NEW.invchead_invcdate <> OLD.invchead_invcdate) OR
         (NEW.invchead_curr_id <> OLD.invchead_curr_id) ) THEN
      PERFORM calculateTaxHist( 'invcheadtax',
                                NEW.invchead_id,
                                NEW.invchead_taxzone_id,
                                getFreightTaxtypeId(),
                                NEW.invchead_invcdate,
                                NEW.invchead_curr_id,
                                NEW.invchead_freight );
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

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER invcheadtrigger ON invchead;
CREATE TRIGGER invcheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON invchead
  FOR EACH ROW
  EXECUTE PROCEDURE _invcheadTrigger();
