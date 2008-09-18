
CREATE OR REPLACE FUNCTION deleteCRMAccount(INTEGER) RETURNS INTEGER AS '
  DECLARE
    pcrmacctId  ALIAS FOR $1;
    _r          RECORD;
    _count      INTEGER := 0;
  BEGIN
    SELECT * FROM crmacct INTO _r WHERE (crmacct_id=pcrmacctId);

    -- allow the delete if this crmacct has one or more relationships
    -- but other crmaccts claim them all

    IF (_r.crmacct_cust_id IS NOT NULL AND NOT EXISTS(
                    SELECT crmacct_id
                    FROM crmacct
                    WHERE ((crmacct_cust_id=_r.crmacct_cust_id)
                      AND  (crmacct_id<>pcrmacctId)))) THEN
      RETURN -1;
    END IF;

    IF (_r.crmacct_vend_id IS NOT NULL AND NOT EXISTS(
                    SELECT crmacct_id
                    FROM crmacct
                    WHERE ((crmacct_vend_id=_r.crmacct_vend_id)
                      AND  (crmacct_id<>pcrmacctId)))) THEN
      RETURN -2;
    END IF;

    IF (_r.crmacct_prospect_id IS NOT NULL AND NOT EXISTS(
                    SELECT crmacct_id
                    FROM crmacct
                    WHERE ((crmacct_prospect_id=_r.crmacct_prospect_id)
                      AND  (crmacct_id<>pcrmacctId)))) THEN
      RETURN -3;
    END IF;

    IF (_r.crmacct_cntct_id_1 IS NOT NULL OR
        _r.crmacct_cntct_id_2 IS NOT NULL OR
        EXISTS(SELECT cntct_id FROM cntct WHERE cntct_crmacct_id = pcrmacctId)
        ) THEN
      RETURN -4;
    END IF;

    IF (_r.crmacct_taxauth_id IS NOT NULL AND NOT EXISTS(
                    SELECT crmacct_id
                    FROM crmacct
                    WHERE ((crmacct_taxauth_id=_r.crmacct_taxauth_id)
                      AND  (crmacct_id<>pcrmacctId)))) THEN
      RETURN -5;
    END IF;

    DELETE FROM crmacct WHERE crmacct_id = pcrmacctId;
    RETURN 0;
  END;
' LANGUAGE 'plpgsql';

