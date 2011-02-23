
CREATE OR REPLACE FUNCTION convertCustomerToProspect(INTEGER) RETURNS INTEGER AS $$
  DECLARE
    pCustId     ALIAS FOR $1;
    _returnVal  INTEGER := 0;
    _c          RECORD;
    _crmacctId  INTEGER := 0;
  BEGIN
    IF (EXISTS(SELECT prospect_id FROM prospect WHERE (prospect_id=pCustId))) THEN
      RETURN -10;
    END IF;

    SELECT * INTO _c
    FROM custinfo
    WHERE (cust_id=pCustId);

    SELECT crmacct_id INTO _crmacctId
    FROM crmacct
    WHERE (crmacct_cust_id=pCustId);

    _returnVal := deleteCustomer(pCustId);
    IF (_returnVal < 0) THEN
      RETURN _returnVal;
    END IF;

    INSERT INTO prospect (
          prospect_id, prospect_active, prospect_number,
          prospect_name, prospect_cntct_id, prospect_taxauth_id,
          prospect_salesrep_id, prospect_warehous_id, prospect_comments
    ) VALUES (
         _c.cust_id, _c.cust_active, _c.cust_number,
         _c.cust_name, _c.cust_cntct_id, _c.cust_taxauth_id,
         CASE WHEN(_c.cust_salesrep_id > 0) THEN _c.cust_salesrep_id
              ELSE NULL
         END,
         CASE WHEN(_c.cust_preferred_warehous_id > 0) THEN _c.cust_preferred_warehous_id
              ELSE NULL
         END,
         _c.cust_comments);

    UPDATE crmacct SET crmacct_prospect_id=pCustId,
                       crmacct_cust_id=NULL
    WHERE (crmacct_id=_crmacctId);

    RETURN pCustId;
  END;
$$ LANGUAGE 'plpgsql';

