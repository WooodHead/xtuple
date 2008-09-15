CREATE OR REPLACE FUNCTION _prospectTrigger() RETURNS TRIGGER AS $$
DECLARE
  _check BOOLEAN;
  _returnVal INTEGER;
BEGIN
  SELECT checkPrivilege('MaintainProspectMasters') OR checkPrivilege('MaintainProspects')
    INTO _check;
  IF (NOT _check) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain Prospects.';
  END IF;

  _check := false;
  IF (TG_OP = 'INSERT') THEN
    _check := true;
  ELSIF (TG_OP = 'UPDATE') THEN
    IF(OLD.prospect_number != NEW.prospect_number) THEN
      _check := true;
    END IF;
  END IF;
  IF (_check) THEN
    SELECT cust_id INTO _returnVal
      FROM custinfo
     WHERE (UPPER(cust_number)=UPPER(NEW.prospect_number));
    IF (_returnVal IS NULL) THEN
      SELECT prospect_id INTO _returnVal
        FROM prospect
       WHERE (UPPER(prospect_number)=UPPER(NEW.prospect_number));
      IF (_returnVal IS NOT NULL) THEN
        RAISE EXCEPTION 'The Number % is not unique for Prospects for Customers.', NEW.prospect_number;
      END IF;
    END IF;
  END IF;
  IF (TG_OP = 'DELETE') THEN
    UPDATE crmacct SET crmacct_prospect_id = NULL WHERE crmacct_prospect_id = OLD.prospect_id;
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('trigger', 'prospectTrigger');
CREATE TRIGGER prospectTrigger BEFORE INSERT OR UPDATE OR DELETE ON prospect FOR EACH ROW EXECUTE PROCEDURE _prospectTrigger();


CREATE OR REPLACE FUNCTION _prospectAfterTrigger () RETURNS TRIGGER AS $$
DECLARE
  _crmacctid	INTEGER;
BEGIN
  SELECT crmacct_id INTO _crmacctid
  FROM crmacct
  WHERE crmacct_prospect_id = NEW.prospect_id;

  IF (crmAcctNumberUsed(NEW.prospect_number, _crmacctid)) THEN
    RAISE EXCEPTION 'Prospect Number % is already in use by another CRM entity',
      NEW.prospect_number;
  END IF;

  IF (TG_OP = 'INSERT') THEN
    SELECT crmacct_id INTO _crmacctid
    FROM crmacct
    WHERE crmacct_number=NEW.prospect_number;
    IF (FOUND) THEN
      UPDATE crmacct
      SET crmacct_prospect_id=NEW.prospect_id,crmacct_name=NEW.prospect_name
      WHERE crmacct_id=_crmacctid;
    ELSE
      PERFORM createCrmAcct(NEW.prospect_number, NEW.prospect_name, NEW.prospect_active, 'O', NULL,
                            NULL, NULL, NEW.prospect_id, NULL, NULL, NEW.prospect_cntct_id, NULL);
    END IF;
  ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE crmacct SET crmacct_number = NEW.prospect_number
    WHERE ((crmacct_prospect_id=NEW.prospect_id)
      AND  (crmacct_number!=NEW.prospect_number));
    UPDATE crmacct SET crmacct_name = NEW.prospect_name
    WHERE ((crmacct_prospect_id=NEW.prospect_id)
      AND  (crmacct_name!=NEW.prospect_name));
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER prospectAfterTrigger ON prospect;
CREATE TRIGGER prospectAfterTrigger AFTER INSERT OR UPDATE ON prospect FOR EACH ROW EXECUTE PROCEDURE _prospectAfterTrigger();
