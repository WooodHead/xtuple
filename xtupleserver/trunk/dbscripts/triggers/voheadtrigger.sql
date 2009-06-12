CREATE OR REPLACE FUNCTION _voheadtrigger()
  RETURNS "trigger" AS
$BODY$
DECLARE
_t RECORD;
_distAmt numeric;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    -- Something can go here
    RETURN OLD;
  END IF;

-- Insert new row
  IF (TG_OP = 'INSERT') THEN

  -- Insert Tax Adjustment From vodist to voheadtax
    IF (NEW.vohead_pohead_id = -1) THEN
      FOR _t IN SELECT * FROM vodist WHERE (vodist_vohead_id=NEW.vohead_id) AND (vodist_poitem_id=-1) AND COALESCE(vodist_tax_id, -1) <> -1
      LOOP
       INSERT INTO voheadtax (taxhist_basis,taxhist_percent,taxhist_amount,taxhist_docdate,taxhist_tax_id, taxhist_tax, taxhist_taxtype_id, taxhist_parent_id) 	   
			 VALUES (0, 0, 0, NEW.vohead_docdate, _t.vodist_tax_id, _t.vodist_amount, getadjustmenttaxtypeid(), NEW.vohead_id);
      END LOOP;   
    END IF;
  END IF;

-- Update row
  IF (TG_OP = 'UPDATE') THEN
-- Update Tax Adjustment From vodist to voheadtax
    IF (NEW.vohead_pohead_id = -1) THEN
      DELETE FROM voheadtax WHERE (taxhist_parent_id=NEW.vohead_id) AND (taxhist_taxtype_id=getadjustmenttaxtypeid());
      FOR _t IN SELECT * FROM vodist WHERE (vodist_vohead_id=NEW.vohead_id) AND (vodist_poitem_id=-1) AND COALESCE(vodist_tax_id, -1) <> -1
      LOOP
        INSERT INTO voheadtax (taxhist_basis,taxhist_percent,taxhist_amount,taxhist_docdate,taxhist_tax_id, taxhist_tax, taxhist_taxtype_id, taxhist_parent_id) 	   
			 VALUES (0, 0, 0, NEW.vohead_docdate, _t.vodist_tax_id, _t.vodist_amount, getadjustmenttaxtypeid(), NEW.vohead_id);
      END LOOP;   
    END IF;

    IF ( (NEW.vohead_taxzone_id <> OLD.vohead_taxzone_id) OR
         (NEW.vohead_docdate <> OLD.vohead_docdate) OR
         (NEW.vohead_curr_id <> OLD.vohead_curr_id) ) THEN
      FOR _t IN SELECT voitem_id, voitem_poitem_id, voitem_taxtype_id FROM voitem WHERE voitem_vohead_id = NEW.vohead_id
      LOOP
       
       SELECT COALESCE(SUM(vodist_amount),0) INTO _distAmt FROM vodist WHERE vodist_vohead_id=NEW.vohead_id AND vodist_poitem_id=_t.voitem_poitem_id;
              
       PERFORM calculateTaxHist( 'voitemtax', _t.voitem_id, NEW.vohead_taxzone_id, _t.voitem_taxtype_id,
                                NEW.vohead_docdate, NEW.vohead_curr_id, _distAmt);
       
     END LOOP;  
    END IF;
   END IF;
  RETURN NEW;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;



DROP TRIGGER voheadtrigger ON vohead;

CREATE TRIGGER voheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON vohead
  FOR EACH ROW
  EXECUTE PROCEDURE _voheadtrigger();