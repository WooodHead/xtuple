CREATE OR REPLACE FUNCTION _vendTrigger () RETURNS TRIGGER AS '
DECLARE
  _check      BOOLEAN;
  _vendname   TEXT;
  _crmacctid  INTEGER;

BEGIN

--  Checks
  SELECT checkPrivilege(''MaintainVendors'') INTO _check;
  IF NOT (_check) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Vendors.'';
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN

    IF (LENGTH(COALESCE(NEW.vend_number, ''''))=0) THEN
      RAISE EXCEPTION ''You must supply a valid Vendor Number.'';
    END IF;

    IF (LENGTH(COALESCE(NEW.vend_name, ''''))=0) THEN
      RAISE EXCEPTION ''You must supply a valid Vendor Name.'';
    END IF;

    IF (NEW.vend_vendtype_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a valid Vendor Type ID.'';
    END IF;

    IF (NEW.vend_terms_id IS NULL) THEN
      RAISE EXCEPTION ''You must supply a valid Terms Code ID.'';
    END IF;

    SELECT vend_name INTO _vendname
    FROM vendinfo
    WHERE ( (UPPER(vend_number)=UPPER(NEW.vend_number))
      AND   (vend_id<>NEW.vend_id) );
    IF (FOUND) THEN
      RAISE EXCEPTION ''The Vendor Number entered cannot be used as it is in use by Vendor %.'', _vendname;
    END IF;

    SELECT crmacct_id INTO _crmacctid
    FROM crmacct
    WHERE crmacct_vend_id = NEW.vend_id;

    IF (crmAcctNumberUsed(NEW.vend_number, _crmacctid)) THEN
      RAISE EXCEPTION ''Vendor Number % is already in use by another CRM entity'', NEW.vend_number;
    END IF;

  END IF;

  IF (TG_OP = ''DELETE'') THEN
    UPDATE crmacct SET crmacct_vend_id = NULL WHERE crmacct_vend_id = OLD.vend_id;
    RETURN OLD;
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'vendTrigger');
CREATE TRIGGER vendTrigger BEFORE INSERT OR UPDATE OR DELETE ON vendinfo FOR EACH ROW EXECUTE PROCEDURE _vendTrigger();


CREATE OR REPLACE FUNCTION _vendAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _crmacctid	INTEGER;
  _cmnttypeid   INTEGER;

BEGIN

  IF (TG_OP = ''INSERT'') THEN
    SELECT crmacct_id INTO _crmacctid
    FROM crmacct
    WHERE crmacct_number=NEW.vend_number;
    IF (FOUND) THEN
      UPDATE crmacct 
      SET crmacct_vend_id=NEW.vend_id,crmacct_name=NEW.vend_name,crmacct_prospect_id=NULL
      WHERE crmacct_id=_crmacctid;
    ELSE
      PERFORM createCrmAcct(NEW.vend_number, NEW.vend_name, NEW.vend_active, ''O'', NULL,
                            NULL, NULL, NULL, NEW.vend_id, NULL, NEW.vend_cntct1_id, NEW.vend_cntct2_id); 
    END IF;
  END IF;

  IF (TG_OP = ''UPDATE'') THEN
    UPDATE crmacct SET crmacct_number = NEW.vend_number
    WHERE ( (crmacct_vend_id=NEW.vend_id)
      AND   (crmacct_number!=NEW.vend_number) );
    UPDATE crmacct SET crmacct_name = NEW.vend_name
    WHERE ( (crmacct_vend_id=NEW.vend_id)
      AND  (crmacct_name!=NEW.vend_name) );
  END IF;

  IF (fetchMetricBool(''VendorChangeLog'')) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''V'', NEW.vend_id, ''Created'');

      ELSIF (TG_OP = ''DELETE'') THEN
	PERFORM postComment(_cmnttypeid, ''V'', OLD.vend_id,
			    (''Deleted "'' || OLD.vend_number || ''"''));

      ELSIF (TG_OP = ''UPDATE'') THEN

--  Handle vend_number
        IF (OLD.vend_number <> NEW.vend_number) THEN
          PERFORM postComment( _cmnttypeid, ''V'', NEW.vend_id,
                               (''Number Changed from "'' || OLD.vend_number || ''" to "'' || NEW.vend_number || ''"'') );
        END IF;

        IF (OLD.vend_name <> NEW.vend_name) THEN
          PERFORM postComment( _cmnttypeid, ''V'', NEW.vend_id,
                               (''Name Changed from "'' || OLD.vend_name || ''" to "'' || NEW.vend_name || ''"'') );
        END IF;

--  Handle vend_active
        IF (OLD.vend_active <> NEW.vend_active) THEN
          IF (NEW.vend_active) THEN
            PERFORM postComment(_cmnttypeid, ''V'', NEW.vend_id, ''Activated'');
          ELSE
            PERFORM postComment(_cmnttypeid, ''V'', NEW.vend_id, ''Deactivated'');
          END IF;
        END IF;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'vendAfterTrigger');
CREATE TRIGGER vendAfterTrigger AFTER INSERT OR UPDATE ON vendinfo FOR EACH ROW EXECUTE PROCEDURE _vendAfterTrigger();
