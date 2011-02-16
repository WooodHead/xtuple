
CREATE OR REPLACE FUNCTION convertProspectToCustomer(INTEGER) RETURNS INTEGER AS $$
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
          cust_comments, cust_creditstatus,
          cust_salesrep_id, cust_preferred_warehous_id,
          cust_terms_id,
          cust_custtype_id, cust_shipform_id,
          cust_shipvia, cust_balmethod,
          cust_ffshipto, cust_backorder,
          cust_partialship, cust_creditlmt,
          cust_creditrating, cust_commprcnt,
          cust_discntprcnt, cust_blanketpos,
          cust_shipchrg_id, cust_ffbillto,
          cust_usespos, cust_emaildelivery,
          cust_autoupdatestatus,cust_autoholdorders,
          cust_soemaildelivery) 
    SELECT
        _p.prospect_id, _p.prospect_active, _p.prospect_number,
        _p.prospect_name, _p.prospect_cntct_id, _p.prospect_taxauth_id,
        _p.prospect_comments, 'G',
        COALESCE(_p.prospect_salesrep_id, salesrep_id),
        COALESCE(_p.prospect_warehous_id, -1),
        FetchMetricValue('DefaultTerms'),
        FetchMetricValue('DefaultCustType'),
        FetchMetricValue('DefaultShipFormId'),
        COALESCE(FetchMetricValue('DefaultShipViaId'),-1),
        FetchMetricText('DefaultBalanceMethod'),
        FetchMetricBool('DefaultFreeFormShiptos'),
        FetchMetricBool('DefaultBackOrders'),
        FetchMetricBool('DefaultPartialShipments'),
        FetchMetricValue('SOCreditLimit'),
        FetchMetricText('SOCreditRate'),
        salesrep_commission,
        0, false, -1,false,false,false,false,
        false, false
    FROM salesrep WHERE (salesrep_id=FetchMetricValue('DefaultSalesRep'));

    UPDATE crmacct SET crmacct_cust_id=pProspectId,
                       crmacct_prospect_id=NULL
    WHERE (crmacct_id=_crmacctId);

    RETURN pProspectId;
  END;
$$ LANGUAGE 'plpgsql';

