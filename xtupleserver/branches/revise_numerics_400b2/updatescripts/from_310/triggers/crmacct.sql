-- utility function used by triggers for crmacct and related tables
CREATE OR REPLACE FUNCTION crmAcctNumberUsed(TEXT, INTEGER) RETURNS BOOL AS $$
DECLARE
  pnumber	ALIAS FOR $1;
  pcrmacctid	ALIAS FOR $2;	-- skip data related to this crm acct
  r		RECORD;
BEGIN
  IF (pcrmacctid IS NULL) THEN
    -- presumably we're doing an insert on a table other than crmacct and
    -- the dup will get caught when we create the crmacct itself
    RETURN FALSE;
  END IF;

  SELECT * INTO r
  FROM crmacct
  WHERE (crmacct_id=pcrmacctid);

  RETURN (EXISTS(SELECT crmacct_id
	     FROM crmacct
	     WHERE ((crmacct_number=pnumber)
	       AND  (crmacct_id!=r.crmacct_id))
	     UNION
	     SELECT cust_id
	     FROM custinfo
	     WHERE ((cust_number=pnumber)
	       AND  (cust_id!=r.crmacct_cust_id))
	     UNION
	     SELECT prospect_id
	     FROM prospect
	     WHERE ((prospect_number=pnumber)
	       AND  (prospect_id!=r.crmacct_prospect_id))
	     UNION
	     SELECT vend_id
	     FROM vendinfo
	     WHERE ((vend_number=pnumber)
	       AND  (vend_id!=r.crmacct_vend_id))
	     UNION
	     SELECT taxauth_id
	     FROM taxauth
	     WHERE ((taxauth_code=pnumber)
	       AND  (taxauth_id!=r.crmacct_taxauth_id))
	     ));
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION _crmacctBeforeTrigger () RETURNS TRIGGER AS $$
BEGIN
  -- disallow reusing crmacct_numbers
  IF (TG_OP = 'INSERT') THEN
    IF (crmAcctNumberUsed(NEW.crmacct_number, NEW.crmacct_id)) THEN
      RETURN OLD;
    END IF;

  ELSEIF (TG_OP = 'UPDATE' AND OLD.crmacct_number != NEW.crmacct_number) THEN
    IF (crmAcctNumberUsed(NEW.crmacct_number, NEW.crmacct_id)) THEN
      RETURN OLD;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER crmacctBeforeTrigger ON crmacct;
CREATE TRIGGER crmacctBeforeTrigger BEFORE INSERT OR UPDATE ON crmacct FOR EACH ROW EXECUTE PROCEDURE _crmacctBeforeTrigger();

CREATE OR REPLACE FUNCTION _crmacctAfterTrigger () RETURNS TRIGGER AS $$
DECLARE
  _cmnttypeid INTEGER;
BEGIN
  -- propagate crmacct_number change
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    IF (NEW.crmacct_cust_id IS NOT NULL) THEN
      UPDATE custinfo SET cust_number = NEW.crmacct_number
      WHERE ((cust_id=NEW.crmacct_cust_id)
        AND  (cust_number!=NEW.crmacct_number));
      UPDATE custinfo SET cust_name = NEW.crmacct_name
      WHERE ((cust_id=NEW.crmacct_cust_id)
        AND  (cust_name!=NEW.crmacct_name));
    END IF;

    IF (NEW.crmacct_prospect_id IS NOT NULL) THEN
      UPDATE prospect SET prospect_number = NEW.crmacct_number
      WHERE ((prospect_id=NEW.crmacct_prospect_id)
        AND  (prospect_number!=NEW.crmacct_number));
      UPDATE prospect SET prospect_name = NEW.crmacct_name
      WHERE ((prospect_id=NEW.crmacct_prospect_id)
        AND  (prospect_name!=NEW.crmacct_name));
    END IF;

    IF (NEW.crmacct_vend_id IS NOT NULL) THEN
      UPDATE vendinfo SET vend_number = NEW.crmacct_number
      WHERE ((vend_id=NEW.crmacct_vend_id)
        AND  (vend_number!=NEW.crmacct_number));
      UPDATE vendinfo SET vend_name = NEW.crmacct_name
      WHERE ((vend_id=NEW.crmacct_vend_id)
        AND  (vend_name!=NEW.crmacct_name));
    END IF;

    IF (NEW.crmacct_taxauth_id IS NOT NULL) THEN
      UPDATE taxauth SET taxauth_code = NEW.crmacct_number
      WHERE ((taxauth_id=NEW.crmacct_taxauth_id)
        AND  (taxauth_code!=NEW.crmacct_number));
      UPDATE taxauth SET taxauth_name = NEW.crmacct_name
      WHERE ((taxauth_id=NEW.crmacct_taxauth_id)
        AND  (taxauth_name!=NEW.crmacct_name));
    END IF;
  END IF;

--  Cache the cmnttype_id for ChangeLog
  SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
   WHERE (cmnttype_name='ChangeLog');
  IF (FOUND) THEN
    IF (TG_OP = 'INSERT') THEN
      PERFORM postComment(_cmnttypeid, 'CRMA', NEW.crmacct_id, ('Created by ' || CURRENT_USER));
    END IF;
  END IF;

  IF (TG_OP = 'DELETE') THEN
    DELETE FROM imageass WHERE ((imageass_source_id=OLD.crmacct_id) AND (imageass_source='CRMA'));
    DELETE FROM url WHERE ((url_source_id=OLD.crmacct_id) AND (url_source='CRMA'));

    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER crmacctAfterTrigger ON crmacct;
CREATE TRIGGER crmacctAfterTrigger AFTER INSERT OR UPDATE OR DELETE ON crmacct FOR EACH ROW EXECUTE PROCEDURE _crmacctAfterTrigger();
