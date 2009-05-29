CREATE OR REPLACE FUNCTION _invcitemTrigger() RETURNS "trigger" AS '
DECLARE
  _r RECORD;

BEGIN
  IF (TG_OP = ''DELETE'') THEN
    RETURN OLD;
  END IF;

-- Cache Invoice Head
  SELECT * INTO _r
  FROM invchead
  WHERE (invchead_id=NEW.invcitem_invchead_id);
  IF (NOT FOUND) THEN
    RAISE EXCEPTION ''Invoice head not found'';
  END IF;

-- Insert new row
  IF (TG_OP = ''INSERT'') THEN

  -- Calculate Tax
      PERFORM calculateTaxHist( ''invcitemtax'',
                                NEW.invcitem_id,
                                COALESCE(_r.invchead_taxzone_id, -1),
                                NEW.invcitem_taxtype_id,
                                COALESCE(_r.invchead_invcdate, CURRENT_DATE),
                                COALESCE(_r.invchead_curr_id, -1),
                                (NEW.invcitem_billed * NEW.invcitem_qty_invuomratio) *
                                (NEW.invcitem_price / NEW.invcitem_price_invuomratio) );
  END IF;

-- Update row
  IF (TG_OP = ''UPDATE'') THEN

  -- Calculate Tax
    IF ( (NEW.invcitem_billed <> OLD.invcitem_billed) OR
         (NEW.invcitem_qty_invuomratio <> OLD.invcitem_qty_uomratio) OR
         (NEW.invcitem_price <> OLD.invcitem_price) OR
         (NEW.invcitem_price_invuomratio <> OLD.invcitem_price_uomratio) OR
         (NEW.invcitem_taxtype_id <> OLD.invcitem_taxtype_id) ) THEN
      PERFORM calculateTaxHist( ''invcitemtax'',
                                NEW.invcitem_id,
                                COALESCE(_r.invchead_taxzone_id, -1),
                                NEW.invcitem_taxtype_id,
                                COALESCE(_r.invchead_invcdate, CURRENT_DATE),
                                COALESCE(_r.invchead_curr_id, -1),
                                (NEW.invcitem_billed * NEW.invcitem_qty_invuomratio) *
                                (NEW.invcitem_price / NEW.invcitem_price_invuomratio) );
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
