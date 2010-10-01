CREATE OR REPLACE FUNCTION _voheadBeforeTrigger() RETURNS "trigger" AS $$
DECLARE

BEGIN
  IF (TG_OP = 'DELETE') THEN
    DELETE FROM voheadtax
    WHERE (taxhist_parent_id=OLD.vohead_id);

    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'voheadBeforeTrigger');
CREATE TRIGGER voheadBeforeTrigger
  BEFORE INSERT OR UPDATE OR DELETE
  ON vohead
  FOR EACH ROW
  EXECUTE PROCEDURE _voheadBeforeTrigger();

CREATE OR REPLACE FUNCTION _voheadTrigger() RETURNS "trigger" AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    -- Something can go here
    RETURN OLD;
  END IF;

-- Insert new row
  IF (TG_OP = 'INSERT') THEN
    -- Something can go here
    RETURN NEW;
  END IF;

-- Update row
  IF (TG_OP = 'UPDATE') THEN

  -- Calculate Tax
    IF ( (COALESCE(NEW.vohead_taxzone_id,-1) <> COALESCE(OLD.vohead_taxzone_id,-1)) OR
         (NEW.vohead_docdate <> OLD.vohead_docdate) OR
         (NEW.vohead_curr_id <> OLD.vohead_curr_id) ) THEN
      PERFORM calculateTaxHist( 'voitemtax',
                                voitem_id,
                                NEW.vohead_taxzone_id,
                                voitem_taxtype_id,
                                NEW.vohead_docdate,
                                NEW.vohead_curr_id,
                                (vodist_amount * -1) )
      FROM voitem JOIN vodist ON ( (vodist_vohead_id=voitem_vohead_id) AND
                                   (vodist_poitem_id=voitem_poitem_id) )
      WHERE (voitem_vohead_id = NEW.vohead_id);
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'voheadtrigger');
CREATE TRIGGER voheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON vohead
  FOR EACH ROW
  EXECUTE PROCEDURE _voheadTrigger();
