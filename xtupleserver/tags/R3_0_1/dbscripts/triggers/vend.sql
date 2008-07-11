CREATE OR REPLACE FUNCTION _vendAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _crmacctid	INTEGER;
  _cmnttypeid   INTEGER;
BEGIN
  SELECT crmacct_id INTO _crmacctid
  FROM crmacct
  WHERE crmacct_vend_id = NEW.vend_id;

  IF (crmAcctNumberUsed(NEW.vend_number, _crmacctid)) THEN
    RAISE EXCEPTION ''Vendor Number % is already in use by another CRM entity'',
      NEW.vend_number;
  END IF;

  IF (TG_OP = ''INSERT'' OR TG_OP = ''UPDATE'') THEN
    UPDATE crmacct SET crmacct_number = NEW.vend_number
    WHERE ((crmacct_vend_id=NEW.vend_id)
      AND  (crmacct_number!=NEW.vend_number));
    UPDATE crmacct SET crmacct_name = NEW.vend_name
    WHERE ((crmacct_vend_id=NEW.vend_id)
      AND  (crmacct_name!=NEW.vend_name));
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

DROP TRIGGER vendAfterTrigger ON vendinfo;
CREATE TRIGGER vendAfterTrigger AFTER INSERT OR UPDATE ON vendinfo FOR EACH ROW EXECUTE PROCEDURE _vendAfterTrigger();
