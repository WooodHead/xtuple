CREATE OR REPLACE FUNCTION _prospectAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _crmacctid	INTEGER;
BEGIN
  SELECT crmacct_id INTO _crmacctid
  FROM crmacct
  WHERE crmacct_prospect_id = NEW.prospect_id;

  IF (crmAcctNumberUsed(NEW.prospect_number, _crmacctid)) THEN
    RAISE EXCEPTION ''Prospect Number % is already in use by another CRM entity'',
      NEW.prospect_number;
  END IF;

  IF (TG_OP = ''INSERT'' OR TG_OP = ''UPDATE'') THEN
    UPDATE crmacct SET crmacct_number = NEW.prospect_number
    WHERE ((crmacct_prospect_id=NEW.prospect_id)
      AND  (crmacct_number!=NEW.prospect_number));
    UPDATE crmacct SET crmacct_name = NEW.prospect_name
    WHERE ((crmacct_prospect_id=NEW.prospect_id)
      AND  (crmacct_name!=NEW.prospect_name));
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER prospectAfterTrigger ON prospect;
CREATE TRIGGER prospectAfterTrigger AFTER INSERT OR UPDATE ON prospect FOR EACH ROW EXECUTE PROCEDURE _prospectAfterTrigger();
