BEGIN;

  CREATE OR REPLACE VIEW api.creditmemo AS
    SELECT cmhead_number AS memo_number,
           CASE
             WHEN (cmhead_invcnumber = '-1') THEN ''
             ELSE cmhead_invcnumber
           END AS apply_to,
           cmhead_docdate AS memo_date,
           CASE
             WHEN (cmhead_posted) THEN 'Posted'
             ELSE 'Unposted'
           END AS status,
           salesrep_number AS sales_rep,
           cmhead_commission AS commission,
           COALESCE(taxauth_code, 'None') AS tax_authority,
           COALESCE(rsncode_code, 'None') AS reason_code,
           cmhead_hold AS on_hold,
           cust_number AS customer_number,
           cmhead_billtoname AS billto_name,
           cmhead_billtoaddress1 AS billto_address1,
           cmhead_billtoaddress2 AS billto_address2,
           cmhead_billtoaddress3 AS billto_address3,
           cmhead_billtocity AS billto_city,
           cmhead_billtostate AS billto_state,
           cmhead_billtozip AS billto_postal_code,
           cmhead_billtocountry AS billto_country,
           shipto_num AS shipto_number,
           cmhead_shipto_name AS shipto_name,
           cmhead_shipto_address1 AS shipto_address1,
           cmhead_shipto_address2 AS shipto_address2,
           cmhead_shipto_address3 AS shipto_address3,
           cmhead_shipto_city AS shipto_city,
           cmhead_shipto_state AS shipto_state,
           cmhead_shipto_zipcode AS shipto_postal_code,
           cmhead_shipto_country AS shipto_country,
           cmhead_custponumber AS customer_po_number,
           cmhead_comments AS notes,
           curr.curr_abbr AS currency,
           cmhead_misc_descrip AS misc_charge_description,
           cmhead_misc AS misc_charge_amount,
           CASE
             WHEN cmhead_misc_accnt_id = -1 THEN ''
             ELSE formatglaccount(cmhead_misc_accnt_id)
           END AS misc_charge_credit_account,
           cmhead_freight AS freight
         FROM cmhead
           LEFT OUTER JOIN custinfo ON (cust_id=cmhead_cust_id)
           LEFT OUTER JOIN shiptoinfo ON (shipto_id=cmhead_shipto_id)
           LEFT OUTER JOIN curr_symbol AS curr ON (curr.curr_id=cmhead_curr_id)
           LEFT OUTER JOIN salesrep ON (salesrep_id=cmhead_salesrep_id)
           LEFT OUTER JOIN taxauth ON (taxauth_id=cmhead_taxauth_id)
           LEFT OUTER JOIN rsncode ON (rsncode_id=cmhead_rsncode_id);
	
GRANT ALL ON TABLE api.creditmemo TO openmfg;
COMMENT ON VIEW api.creditmemo IS 'Credit Memo Header';


CREATE OR REPLACE FUNCTION insertCreditMemo(api.creditmemo) RETURNS boolean AS
$insertCreditMemo$
DECLARE
	pNew ALIAS FOR $1;
BEGIN
	-- NOTE: (SELECT getCustId(...)) seems redundant, but it actually produces
	-- a HUGE performance increase because it makes the Postgres query planner
	-- use an index scan rather than an sequential table scan on cust_id
  INSERT INTO cmhead (
		cmhead_number,
		cmhead_posted,
		cmhead_invcnumber,
                cmhead_custponumber,
		cmhead_cust_id,
		cmhead_docdate,
		cmhead_shipto_id,
		cmhead_shipto_name,
		cmhead_shipto_address1,
		cmhead_shipto_address2,
		cmhead_shipto_address3,
		cmhead_shipto_city,
		cmhead_shipto_state,
		cmhead_shipto_zipcode,
		cmhead_shipto_country,
		cmhead_salesrep_id,
                cmhead_tax_id,
		cmhead_freight,
		cmhead_misc,
		cmhead_comments,
		cmhead_printed,
		cmhead_billtoname,
		cmhead_billtoaddress1,
		cmhead_billtoaddress2,
		cmhead_billtoaddress3,
		cmhead_billtocity,
		cmhead_billtostate,
		cmhead_billtozip,
		cmhead_billtocountry,
		cmhead_hold,
		cmhead_commission,
		cmhead_misc_accnt_id,
		cmhead_misc_descrip,
                cmhead_tax,
                cmhead_tax_ratea,
                cmhead_tax_rateb,
                cmhead_tax_ratec,
		cmhead_rsncode_id,
		cmhead_curr_id,
		cmhead_taxauth_id,
		cmhead_tax_curr_id,
		cmhead_adjtax_id,
                cmhead_adjtaxtype_id,
		cmhead_adjtax_pcta,
		cmhead_adjtax_pctb,
		cmhead_adjtax_pctc,
		cmhead_adjtax_ratea,
		cmhead_adjtax_rateb,
		cmhead_adjtax_ratec,
		cmhead_freighttax_id,
                cmhead_freighttaxtype_id,
		cmhead_freighttax_pcta,
		cmhead_freighttax_pctb,
		cmhead_freighttax_pctc,
		cmhead_freighttax_ratea,
		cmhead_freighttax_rateb,
		cmhead_freighttax_ratec,
                cmhead_gldistdate,
                cmhead_rahead_id
		)
	 SELECT
		(CASE -- use a case here so we don't unnecessarily fetch a new CM number
			WHEN pNew.memo_number IS NULL THEN fetchCMNumber()
			ELSE pNew.memo_number
		END),
		FALSE, -- posted
		pNew.apply_to,
		pNew.customer_po_number,
		cust_id,
		COALESCE(pNew.memo_date, CURRENT_DATE),
		COALESCE(shipto_id,-1),
		pNew.shipto_name,
		pNew.shipto_address1,
		pNew.shipto_address2,
		pNew.shipto_address3,
		pNew.shipto_city,
		pNew.shipto_state,
		pNew.shipto_postal_code,
		pNew.shipto_country,
		COALESCE(getSalesRepId(pNew.sales_rep),shipto_salesrep_id,cust_salesrep_id),
                NULL,
		COALESCE(pNew.freight, 0),
		COALESCE(pNew.misc_charge_amount, 0),
		pNew.notes,
		FALSE, -- printed
		pNew.billto_name,
		pNew.billto_address1,
		pNew.billto_address2,
		pNew.billto_address3,
		pNew.billto_city,
		pNew.billto_state,
		pNew.billto_postal_code,
		pNew.billto_country,
		COALESCE(pNew.on_hold, FALSE),
		COALESCE(pNew.commission, 0),
		COALESCE(getGlAccntId(pNew.misc_charge_credit_account),-1),
		pNew.misc_charge_description,
                0,
                0,
                0,
                0,
		(SELECT rsncode_id FROM rsncode WHERE rsncode_code = pNew.reason_code),
		COALESCE(getCurrId(pNew.currency),cust_curr_id,basecurrid()),
		CASE
			WHEN pNew.tax_authority = 'None' THEN NULL
			ELSE COALESCE(getTaxAuthId(pNew.tax_authority),shipto_taxauth_id,cust_taxauth_id)
		END,
		NULL,
		NULL,
                NULL,
                0,
                0,
                0,
		0,
		0,
		0,
		NULL,
                NULL,
                0,
                0,
                0,
		0,
		0,
		0,
                NULL,
                NULL
	FROM custinfo
		LEFT OUTER JOIN shiptoinfo ON (shipto_id=(SELECT CASE
			WHEN getShiptoId(pNew.customer_number,pNew.shipto_number) IS NOT NULL
				THEN getShiptoId(pNew.customer_number,pNew.shipto_number)
			ELSE (SELECT shipto_id FROM shiptoinfo WHERE shipto_cust_id=cust_id AND shipto_default)
		END))
	WHERE cust_id = (CASE
		WHEN pNew.customer_number IS NOT NULL THEN (SELECT getCustId(pNew.customer_number))
		ELSE (SELECT invchead_cust_id FROM invchead WHERE invchead_invcnumber = pNew.apply_to)
	END);
	RETURN TRUE;
END;
$insertCreditMemo$ LANGUAGE 'plpgsql';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
	ON INSERT TO api.creditmemo DO INSTEAD
		SELECT insertCreditMemo(NEW);


CREATE OR REPLACE RULE "_UPDATE" AS 
	ON UPDATE TO api.creditmemo DO INSTEAD
	UPDATE cmhead SET
		cmhead_custponumber=NEW.customer_po_number,
		cmhead_docdate=NEW.memo_date,
		cmhead_shipto_id=COALESCE(getShiptoId(NEW.customer_number,NEW.shipto_number),-1),
		cmhead_shipto_name=NEW.shipto_name,
		cmhead_shipto_address1=NEW.shipto_address1,
		cmhead_shipto_address2=NEW.shipto_address2,
		cmhead_shipto_address3=NEW.shipto_address3,
		cmhead_shipto_city=NEW.shipto_city,
		cmhead_shipto_state=NEW.shipto_state,
		cmhead_shipto_zipcode=NEW.shipto_postal_code,
		cmhead_shipto_country=NEW.shipto_country,
		cmhead_salesrep_id=getSalesRepId(NEW.sales_rep),
		cmhead_freight=COALESCE(NEW.freight,0),
		cmhead_misc=COALESCE(NEW.misc_charge_amount,0),
		cmhead_comments=NEW.notes,
		cmhead_billtoname=NEW.billto_name,
		cmhead_billtoaddress1=NEW.billto_address1,
		cmhead_billtoaddress2=NEW.billto_address2,
		cmhead_billtoaddress3=NEW.billto_address3,
		cmhead_billtocity=NEW.billto_city,
		cmhead_billtostate=NEW.billto_state,
		cmhead_billtozip=NEW.billto_postal_code,
		cmhead_billtocountry=NEW.billto_country,
		cmhead_hold=COALESCE(NEW.on_hold,FALSE),
		cmhead_commission=COALESCE(NEW.commission,0),
		cmhead_misc_accnt_id=COALESCE(getGlAccntId(NEW.misc_charge_credit_account),-1),
		cmhead_misc_descrip=NEW.misc_charge_description,
		cmhead_rsncode_id=(SELECT rsncode_id FROM rsncode WHERE rsncode_code = NEW.reason_code),
		cmhead_curr_id=COALESCE(getCurrId(NEW.currency),-1),
		cmhead_taxauth_id=getTaxAuthId(NULLIF(NEW.tax_authority, 'None'))
	WHERE (cmhead_number=OLD.memo_number)
		AND (cmhead_posted = FALSE);


CREATE OR REPLACE RULE "_DELETE" AS 
	ON DELETE TO api.creditmemo DO INSTEAD
	
	SELECT deleteCreditMemo(cmhead_id)
	FROM cmhead
	WHERE cmhead_number = OLD.memo_number AND cmhead_posted = FALSE;

COMMIT;


