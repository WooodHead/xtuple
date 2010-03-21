
CREATE OR REPLACE FUNCTION deleteProspect(INTEGER) RETURNS INTEGER AS '
  DECLARE
    pprospectId ALIAS FOR $1;
  BEGIN
    IF (EXISTS(SELECT quhead_id
               FROM quhead
               WHERE quhead_cust_id = pprospectId)) THEN
      RETURN -1;
    END IF;

    UPDATE crmacct SET crmacct_prospect_id=NULL
    WHERE crmacct_prospect_id=pprospectId;

    DELETE FROM prospect WHERE (prospect_id=pprospectId);

    RETURN 0;
  END;
' LANGUAGE 'plpgsql';

