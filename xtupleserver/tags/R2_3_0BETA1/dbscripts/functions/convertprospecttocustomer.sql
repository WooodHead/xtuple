
CREATE OR REPLACE FUNCTION convertProspectToCustomer(INTEGER) RETURNS INTEGER AS '
  DECLARE
    pProspectId ALIAS FOR $1;
    _returnVal  INTEGER := 0;
    _p          RECORD;
    _crmacctId  INTEGER := 0;
  BEGIN
    IF (EXISTS(SELECT cust_id FROM custinfo WHERE cust_id=pProspectId)) THEN
      RETURN -10;
    END IF;

    SELECT * INTO _p
    FROM prospect
    WHERE (prospect_id=pProspectId);

    SELECT crmacct_id INTO _crmacctId
    FROM crmacct
    WHERE (crmacct_prospect_id=pProspectId);

    _returnVal := deleteProspect(pProspectId);
    IF (_returnVal = -1) THEN   -- prospect has quotes
      UPDATE crmacct SET crmacct_prospect_id=NULL
      WHERE crmacct_prospect_id=pprospectId;

      DELETE FROM prospect WHERE (prospect_id=pprospectId);

    ELSEIF (_returnVal < 0) THEN
      RETURN _returnVal;
    END IF;

    INSERT INTO custinfo (
          cust_id, cust_active, cust_number,
          cust_name, cust_cntct_id, cust_taxauth_id,
          cust_comments, cust_creditstatus
    ) VALUES (
        _p.prospect_id, _p.prospect_active, _p.prospect_number,
        _p.prospect_name, _p.prospect_cntct_id, _p.prospect_taxauth_id,
        _p.prospect_comments, ''G'');

    UPDATE crmacct SET crmacct_cust_id=pProspectId,
                       crmacct_prospect_id=NULL
    WHERE (crmacct_id=_crmacctId);

    RETURN pProspectId;
  END;
' LANGUAGE 'plpgsql';

