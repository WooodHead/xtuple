CREATE OR REPLACE FUNCTION _cobmiscTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    -- Something can go here
    RETURN OLD;
  END IF;

-- Insert new row
  IF (TG_OP = ''INSERT'') THEN

  -- Calculate Freight Tax
    IF (NEW.cobmisc_freight <> 0) THEN
      PERFORM calculateTaxHist( ''cobmisctax'',
                                NEW.cobmisc_id,
                                NEW.cobmisc_taxzone_id,
                                getFreightTaxtypeId(),
                                NEW.cobmisc_invcdate,
                                NEW.cobmisc_curr_id,
                                NEW.cobmisc_freight );
    END IF;
  END IF;

-- Update row
  IF (TG_OP = ''UPDATE'') THEN

  -- Calculate Freight Tax
    IF ( (NEW.cobmisc_freight <> OLD.cobmisc_freight) OR
         (NEW.cobmisc_taxzone_id <> OLD.cobmisc_taxzone_id) OR
         (NEW.cobmisc_invcdate <> OLD.cobmisc_invcdate) OR
         (NEW.cobmisc_curr_id <> OLD.cobmisc_curr_id) ) THEN
      PERFORM calculateTaxHist( ''cobmisctax'',
                                NEW.cobmisc_id,
                                NEW.cobmisc_taxzone_id,
                                getFreightTaxtypeId(),
                                NEW.cobmisc_invcdate,
                                NEW.cobmisc_curr_id,
                                NEW.cobmisc_freight );
      PERFORM calculateTaxHist( ''cobilltax'',
                                cobill_id,
                                NEW.cobmisc_taxzone_id,
                                cobill_taxtype_id,
                                NEW.cobmisc_invcdate,
                                NEW.cobmisc_curr_id,
                                (cobill_qty * coitem_qty_invuomratio) *
                                (coitem_price / coitem_price_invuomratio) )
      FROM cobill JOIN coitem ON (coitem_id = cobill_coitem_id)
      WHERE (cobill_cobmisc_id = NEW.cobmisc_id);
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
