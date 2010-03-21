CREATE OR REPLACE FUNCTION _cmheadBeforeTrigger() RETURNS "trigger" AS '
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

  IF ( (NEW.cmhead_number IS NULL) OR (LENGTH(NEW.cmhead_number) = 0) ) THEN
    RAISE EXCEPTION ''You must enter a valid Memo # for this Credit Memo.'';
  END IF;

  IF (TG_OP = ''INSERT'') THEN
    SELECT cmhead_id INTO _id
    FROM cmhead
    WHERE (cmhead_number=NEW.cmhead_number);
    IF (FOUND) THEN
      RAISE EXCEPTION ''The Memo # is already in use.'';
    END IF;
  END IF;

  IF (NEW.cmhead_cust_id IS NOT NULL) THEN
    SELECT cust_id INTO _id
    FROM custinfo
    WHERE (cust_id=NEW.cmhead_cust_id);
    IF (NOT FOUND) THEN
      RAISE EXCEPTION ''You must enter a valid Customer # for this Credit Memo.'';
    END IF;
  END IF;

  IF ( (NEW.cmhead_misc > 0) AND (NEW.cmhead_misc_accnt_id = -1) ) THEN
    RAISE EXCEPTION ''You may not enter a Misc. Charge without indicating the G/L Sales Account.'';
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'cmheadbeforetrigger');
CREATE TRIGGER cmheadbeforetrigger
  BEFORE INSERT OR UPDATE OR DELETE
  ON cmhead
  FOR EACH ROW
  EXECUTE PROCEDURE _cmheadBeforeTrigger();


CREATE OR REPLACE FUNCTION _cmheadTrigger() RETURNS "trigger" AS '
BEGIN
  IF (TG_OP = ''DELETE'') THEN
    -- If this was created by a return, then reset the return
    IF (OLD.cmhead_rahead_id IS NOT NULL) THEN
      UPDATE rahead SET
        rahead_headcredited=false
      WHERE (rahead_id=OLD.cmhead_rahead_id);
      DELETE FROM rahist
      WHERE ((rahist_rahead_id=OLD.cmhead_rahead_id)
      AND (rahist_source=''CM'')
      AND (rahist_source_id=OLD.cmhead_id));
    END IF;
    RETURN OLD;
  END IF;
  IF (TG_OP = ''INSERT'') THEN
    -- Something can go here
  ELSE
    IF((COALESCE(NEW.cmhead_adjtax_ratea,0.0)
      + COALESCE(NEW.cmhead_adjtax_rateb,0.0)
      + COALESCE(NEW.cmhead_adjtax_ratec,0.0)
      + COALESCE(NEW.cmhead_freighttax_ratea,0.0)
      + COALESCE(NEW.cmhead_freighttax_rateb,0.0)
      + COALESCE(NEW.cmhead_freighttax_ratec,0.0))
       <> 
       (COALESCE(OLD.cmhead_adjtax_ratea,0.0)
      + COALESCE(OLD.cmhead_adjtax_rateb,0.0)
      + COALESCE(OLD.cmhead_adjtax_ratec,0.0)
      + COALESCE(OLD.cmhead_freighttax_ratea,0.0)
      + COALESCE(OLD.cmhead_freighttax_rateb,0.0)
      + COALESCE(OLD.cmhead_freighttax_ratec,0.0)) ) THEN
      PERFORM recalculateCmheadTaxTotal(NEW.cmhead_id);
    END IF;
  END IF;
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'cmheadtrigger');
CREATE TRIGGER cmheadtrigger
  AFTER INSERT OR UPDATE OR DELETE
  ON cmhead
  FOR EACH ROW
  EXECUTE PROCEDURE _cmheadTrigger();
