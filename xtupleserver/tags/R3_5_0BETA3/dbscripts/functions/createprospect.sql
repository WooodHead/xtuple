
CREATE OR REPLACE FUNCTION createProspect(INTEGER) RETURNS INTEGER AS '
  DECLARE
    pcrmacctId  ALIAS FOR $1;
    _custId     INTEGER := 0;
    _prospectId INTEGER := 0;
  BEGIN
    IF (pcrmacctId < 0 OR pcrmacctId IS NULL) THEN
      RETURN -1;
    END IF;

    SELECT crmacct_cust_id, crmacct_prospect_id INTO _custId, _prospectId
    FROM crmacct WHERE crmacct_id = pcrmacctId;

    IF (_custId IS NOT NULL AND _custId > 0) THEN
      RETURN -2;
    END IF;

    IF (_prospectId IS NOT NULL AND _prospectId > 0) THEN
      RETURN -3;
    END IF;

    INSERT INTO prospect (prospect_number, prospect_name, prospect_cntct_id)
               SELECT  crmacct_number, crmacct_name, crmacct_cntct_id_1
                 FROM  crmacct
                 WHERE (crmacct_id=pcrmacctId);
    _prospectId := CURRVAL(''cust_cust_id_seq'');

    UPDATE crmacct SET crmacct_prospect_id = _prospectId
    WHERE crmacct_id = pcrmacctId;

    RETURN _prospectId;
  END;
' LANGUAGE 'plpgsql';

