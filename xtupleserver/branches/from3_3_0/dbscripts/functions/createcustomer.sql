
CREATE OR REPLACE FUNCTION createCustomer(INTEGER) RETURNS INTEGER AS '
  DECLARE
    pcrmacctId  ALIAS FOR $1;
    _custId     INTEGER := 0;
  BEGIN
    IF (pcrmacctId < 0 OR pcrmacctId IS NULL) THEN
      RETURN -1;
    END IF;

    SELECT crmacct_cust_id INTO _custId
    FROM crmacct WHERE crmacct_id = pcrmacctId;

    IF (_custId IS NOT NULL AND _custId <= 0) THEN
      RETURN -2;
    END IF;

    INSERT INTO _customer (active, customer_number, customer_name)
      SELECT crmacct_active, crmacct_number, crmacct_name
      FROM crmacct
      WHERE crmacct_id = pcrmacctId;
    _custId := CURRVAL(''cust_cust_id_seq'');

    UPDATE crmacct SET crmacct_prospect_id = NULL, crmacct_cust_id = _custId
    WHERE crmacct_id = pcrmacctId;

    RETURN _custId;
  END;
' LANGUAGE 'plpgsql';

