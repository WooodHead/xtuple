CREATE OR REPLACE FUNCTION _invcheadBeforeTrigger() RETURNS "trigger" AS $$
DECLARE
  _recurid     INTEGER;
  _newparentid INTEGER;

BEGIN
  IF (TG_OP = 'DELETE') THEN
    DELETE FROM invcheadtax
    WHERE (taxhist_parent_id=OLD.invchead_id);

    SELECT recur_id INTO _recurid
      FROM recur
     WHERE ((recur_parent_id=OLD.invchead_id)
        AND (recur_parent_type='I'));
    IF (_recurid IS NOT NULL) THEN
      SELECT invchead_id INTO _newparentid
        FROM invchead
       WHERE ((invchead_recurring_invchead_id=OLD.invchead_id)
          AND (invchead_id!=OLD.invchead_id))
       ORDER BY invchead_invcdate
       LIMIT 1;

      IF (_newparentid IS NULL) THEN
        DELETE FROM recur WHERE recur_id=_recurid;
      ELSE
        UPDATE recur SET recur_parent_id=_newparentid
         WHERE recur_id=_recurid;
        UPDATE invchead SET invchead_recurring_invchead_id=_newparentid
         WHERE invchead_recurring_invchead_id=OLD.invchead_id
           AND invchead_id!=OLD.invchead_id;
      END IF;
    END IF;

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

        UPDATE invcitem SET invcitem_taxtype_id=getItemTaxType(invcitem_item_id,NEW.invchead_taxzone_id)
        WHERE (invcitem_invchead_id=NEW.invchead_id);

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
