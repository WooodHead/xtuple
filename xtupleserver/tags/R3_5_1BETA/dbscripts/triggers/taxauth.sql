CREATE OR REPLACE FUNCTION _taxauthAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _crmacctid	INTEGER;
BEGIN
  SELECT crmacct_id INTO _crmacctid
  FROM crmacct
  WHERE crmacct_taxauth_id = NEW.taxauth_id;

  IF (crmAcctNumberUsed(NEW.taxauth_code, _crmacctid)) THEN
    RAISE EXCEPTION ''Tax Authority % is already in use by another CRM entity'',
      NEW.taxauth_code;
  END IF;

  IF (TG_OP = ''INSERT'' OR TG_OP = ''UPDATE'') THEN
    UPDATE crmacct SET crmacct_number = NEW.taxauth_code
    WHERE ((crmacct_taxauth_id=NEW.taxauth_id)
      AND  (crmacct_number!=NEW.taxauth_code));
    UPDATE crmacct SET crmacct_name = NEW.taxauth_name
    WHERE ((crmacct_taxauth_id=NEW.taxauth_id)
      AND  (crmacct_name!=NEW.taxauth_name));
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

DROP TRIGGER taxauthAfterTrigger ON taxauth;
CREATE TRIGGER taxauthAfterTrigger AFTER INSERT OR UPDATE ON taxauth FOR EACH ROW EXECUTE PROCEDURE _taxauthAfterTrigger();
