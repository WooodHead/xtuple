CREATE OR REPLACE FUNCTION _custTrigger () RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid INTEGER;
  _oldCreditStatus TEXT;
  _newCreditStatus TEXT;
  _openAmount NUMERIC;
  _check BOOLEAN;

BEGIN

--  Checks
  SELECT checkPrivilege(''MaintainCustomerMasters'') INTO _check;
  IF NOT (_check) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Customers.'';
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN
    IF (NEW.cust_number IS NULL) THEN
	  RAISE EXCEPTION ''You must supply a valid Customer Number ID.'';
    END IF;

    IF (NEW.cust_custtype_id IS NULL) THEN
	  RAISE EXCEPTION ''You must supply a valid Customer Type ID.'';
    END IF;

    IF (NEW.cust_salesrep_id IS NULL) THEN
  	  RAISE EXCEPTION ''You must supply a valid Sales Rep ID.'';
    END IF;

    IF (NEW.cust_shipform_id IS NULL) THEN
	  RAISE EXCEPTION ''You must supply a valid Ship Form ID.'';
    END IF;

    IF (NEW.cust_terms_id IS NULL) THEN
	  RAISE EXCEPTION ''You must supply a valid Terms Code ID.'';
    END IF;
  END IF;

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''CustomerChangeLog'') ) THEN

--  Cache the cmnttype_id for ChangeLog
    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');
    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''C'', NEW.cust_id, ''Created'');

      ELSIF (TG_OP = ''DELETE'') THEN
	PERFORM postComment(_cmnttypeid, ''C'', OLD.cust_id,
			    (''Deleted "'' || OLD.cust_number || ''"''));

      ELSIF (TG_OP = ''UPDATE'') THEN

--  Handle cust_number
        IF (OLD.cust_number <> NEW.cust_number) THEN
          PERFORM postComment( _cmnttypeid, ''C'', NEW.cust_id,
                               (''Number Changed from "'' || OLD.cust_number || ''" to "'' || NEW.cust_number || ''"'') );
        END IF;

        IF (OLD.cust_name <> NEW.cust_name) THEN
          PERFORM postComment( _cmnttypeid, ''C'', NEW.cust_id,
                               (''Name Changed from "'' || OLD.cust_name || ''" to "'' || NEW.cust_name || ''"'') );
        END IF;

--  Handle cust_active
        IF (OLD.cust_active <> NEW.cust_active) THEN
          IF (NEW.cust_active) THEN
            PERFORM postComment(_cmnttypeid, ''C'', NEW.cust_id, ''Activated'');
          ELSE
            PERFORM postComment(_cmnttypeid, ''C'', NEW.cust_id, ''Deactivated'');
          END IF;
        END IF;

--  Handle cust_creditlmt
        IF (OLD.cust_creditlmt <> NEW.cust_creditlmt) THEN
          PERFORM postComment( _cmnttypeid, ''C'', NEW.cust_id,
                               ( ''Credit Limit Changed from '' || formatMoney(OLD.cust_creditlmt) ||
                                 '' to '' || formatMoney(NEW.cust_creditlmt) ) );
        END IF;

        IF (OLD.cust_creditstatus <> NEW.cust_creditstatus) THEN
          IF (OLD.cust_creditstatus = ''G'') THEN
            _oldCreditStatus := ''In Good Standing'';
          ELSIF (OLD.cust_creditstatus = ''W'') THEN
            _oldCreditStatus := ''Credit Warning'';
          ELSIF (OLD.cust_creditstatus = ''H'') THEN
            _oldCreditStatus := ''Credit Hold'';
          ELSE
            _oldCreditStatus := ''Unknown/Error'';
          END IF;

          IF (NEW.cust_creditstatus = ''G'') THEN
            _newCreditStatus := ''In Good Standing'';
          ELSIF (NEW.cust_creditstatus = ''W'') THEN
            _newCreditStatus := ''Credit Warning'';
          ELSIF (NEW.cust_creditstatus = ''H'') THEN
            _newCreditStatus := ''Credit Hold'';
          ELSE
            _newCreditStatus := ''Unknown/Error'';
          END IF;

          PERFORM postComment( _cmnttypeid, ''C'', NEW.cust_id,
                               (''Credit Status Changed from "'' || _oldCreditStatus || ''" to "'' || _newCreditStatus || ''"'') );
        END IF;

      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''DELETE'') THEN
    UPDATE crmacct SET crmacct_cust_id = NULL WHERE crmacct_cust_id = OLD.cust_id;
    RETURN OLD;
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER custTrigger ON custinfo;
CREATE TRIGGER custTrigger BEFORE INSERT OR UPDATE OR DELETE ON custinfo FOR EACH ROW EXECUTE PROCEDURE _custTrigger();


CREATE OR REPLACE FUNCTION _custAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _crmacctid	INTEGER;
BEGIN
  SELECT crmacct_id INTO _crmacctid
  FROM crmacct
  WHERE crmacct_cust_id = NEW.cust_id;

  IF (crmAcctNumberUsed(NEW.cust_number, _crmacctid)) THEN
    RAISE EXCEPTION ''Customer Number % is already in use by another CRM entity'',
      NEW.cust_number;
  END IF;

  IF (TG_OP = ''INSERT'') THEN
    SELECT crmacct_id INTO _crmacctid
    FROM crmacct
    WHERE crmacct_number=NEW.cust_number;
    IF (FOUND) THEN
      UPDATE crmacct 
      SET crmacct_cust_id=NEW.cust_id,crmacct_name=NEW.cust_name,crmacct_prospect_id=NULL
      WHERE crmacct_id=_crmacctid;
      DELETE FROM prospect WHERE prospect_id=NEW.cust_id;
    ELSE
      PERFORM createCrmAcct(NEW.cust_number, NEW.cust_name, NEW.cust_active, ''O'', NEW.cust_id,
                            NULL, NULL, NULL, NULL, NULL, NEW.cust_cntct_id, NEW.cust_corrcntct_id); 
    END IF;
  END IF;

  IF (TG_OP = ''UPDATE'') THEN
    UPDATE crmacct SET crmacct_number = NEW.cust_number
    WHERE ((crmacct_cust_id=NEW.cust_id)
      AND  (crmacct_number!=NEW.cust_number));
    UPDATE crmacct SET crmacct_name = NEW.cust_name
    WHERE ((crmacct_cust_id=NEW.cust_id)
      AND  (crmacct_name!=NEW.cust_name));
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER custAfterTrigger ON custinfo;
CREATE TRIGGER custAfterTrigger AFTER INSERT OR UPDATE ON custinfo FOR EACH ROW EXECUTE PROCEDURE _custAfterTrigger();
