BEGIN;

CREATE OR REPLACE VIEW api.invoice
AS
	SELECT
		invchead_invcnumber AS invoice_number,
		invchead_ordernumber AS order_number,
		invchead_invcdate AS invoice_date,
		invchead_shipdate AS ship_date,
		invchead_orderdate AS order_date,
		salesrep_number as sales_rep,
		invchead_commission AS commission,
		COALESCE(taxauth_code, 'None') AS tax_authority,
		terms_code AS terms,
		cust_number AS customer_number,
		invchead_billto_name AS billto_name,
		invchead_billto_address1 AS billto_address1,
		invchead_billto_address2 AS billto_address2,
		invchead_billto_address3 AS billto_address3,
		invchead_billto_city AS billto_city,
		invchead_billto_state AS billto_state,
		invchead_billto_zipcode AS billto_postal_code,
		invchead_billto_country AS billto_country,
		invchead_billto_phone AS billto_phone,
		shipto_num AS shipto_number,
		invchead_shipto_name AS shipto_name,
		invchead_shipto_address1 AS shipto_address1,
		invchead_shipto_address2 AS shipto_address2,
		invchead_shipto_address3 AS shipto_address3,
		invchead_shipto_city AS shipto_city,
		invchead_shipto_state AS shipto_state,
		invchead_shipto_zipcode AS shipto_postal_code,
		invchead_shipto_country AS shipto_country,
		invchead_shipto_phone AS shipto_phone,
		invchead_ponumber AS po_number,
		invchead_shipvia AS ship_via,
		prj_number AS project_number,
		invchead_fob AS fob,
		invchead_misc_descrip AS misc_charge_description,
		invchead_misc_amount AS misc_charge,
		CASE
			WHEN invchead_misc_accnt_id = -1 THEN NULL
			ELSE formatglaccount(invchead_misc_accnt_id)
		END AS misc_charge_account_number,
		invchead_freight AS freight,
		curr.curr_abbr AS currency,
		taxcurr.curr_abbr as tax_currency, 
		COALESCE(adjtax.tax_code, 'None') AS misc_tax_adjustment_code,
		invchead_adjtax_ratea AS misc_tax_adjustment_amount_a,
		invchead_adjtax_rateb AS misc_tax_adjustment_amount_b,
		invchead_adjtax_ratec AS misc_tax_adjustment_amount_c,
		COALESCE(frttax.tax_code, 'None') AS freight_tax_code,
		invchead_freighttax_ratea AS freight_tax_amount_a,
		invchead_freighttax_rateb AS freight_tax_amount_b,
		invchead_freighttax_ratec AS freight_tax_amount_c,
		invchead_payment AS payment,
		invchead_notes AS notes
	FROM invchead
		LEFT OUTER JOIN custinfo ON (cust_id=invchead_cust_id)
		LEFT OUTER JOIN shiptoinfo ON (shipto_id=invchead_shipto_id)
		LEFT OUTER JOIN prj ON (prj_id=invchead_prj_id)
		LEFT OUTER JOIN curr_symbol AS curr ON (curr.curr_id=invchead_curr_id)
		LEFT OUTER JOIN curr_symbol AS taxcurr ON (taxcurr.curr_id=invchead_tax_curr_id)
		LEFT OUTER JOIN salesrep ON (salesrep_id=invchead_salesrep_id)
		LEFT OUTER JOIN terms ON (terms_id=invchead_terms_id)
		LEFT OUTER JOIN tax AS adjtax ON (adjtax.tax_id=invchead_adjtax_id)
		LEFT OUTER JOIN tax AS frttax ON (frttax.tax_id=invchead_adjtax_id)
		LEFT OUTER JOIN taxauth ON (taxauth_id=invchead_taxauth_id);
	
GRANT ALL ON TABLE api.invoice TO openmfg;
COMMENT ON VIEW api.invoice IS '
This view can be used as an interface to import Invioce Header data directly  
into the system.  Required fields will be checked and default values will be 
populated';


CREATE OR REPLACE FUNCTION insertInvoice(api.invoice) RETURNS BOOLEAN AS
$insertInvoice$
DECLARE
	pNew ALIAS FOR $1;
BEGIN
	-- NOTE: (SELECT getCustId(...)) seems redundant, but it actually produces
	-- a HUGE performance increase because it makes the Postgres query planner
	-- use an index scan rather than an sequential table scan on cust_id
	INSERT INTO invchead (
		invchead_invcnumber,
		invchead_ordernumber,
		invchead_invcdate,
		invchead_shipdate,
		invchead_orderdate,
		invchead_printed,
		invchead_posted,
		invchead_salesrep_id,
		invchead_commission,
		invchead_taxauth_id,
		invchead_terms_id,
		invchead_cust_id,
		invchead_billto_name,
		invchead_billto_address1,
		invchead_billto_address2,
		invchead_billto_address3,
		invchead_billto_city,
		invchead_billto_state,
		invchead_billto_zipcode,
		invchead_billto_country,
		invchead_billto_phone,
		invchead_shipto_id,
		invchead_shipto_name,
		invchead_shipto_address1,
		invchead_shipto_address2,
		invchead_shipto_address3,
		invchead_shipto_city,
		invchead_shipto_state,
		invchead_shipto_zipcode,
		invchead_shipto_country,
		invchead_shipto_phone,
		invchead_ponumber,
		invchead_shipvia,
		invchead_prj_id,
		invchead_fob,
		invchead_misc_descrip,
		invchead_misc_amount,
		invchead_misc_accnt_id,
		invchead_freight,
		invchead_curr_id,
		invchead_tax,
		invchead_tax_curr_id,
		invchead_adjtax_id,
		invchead_adjtax_ratea,
		invchead_adjtax_rateb,
		invchead_adjtax_ratec,
		invchead_freighttax_id,
		invchead_freighttax_ratea,
		invchead_freighttax_rateb,
		invchead_freighttax_ratec,
		invchead_payment,
		invchead_notes
	) SELECT
		(CASE -- use a case here so we don't unnecessarily fetch a new invoice number
			WHEN pNew.invoice_number IS NULL THEN CAST(fetchInvcNumber() AS TEXT)
			ELSE pNew.invoice_number
		END),
		pNew.order_number,
		COALESCE(pNew.invoice_date, CURRENT_DATE),
		pNew.ship_date,
		pNew.order_date,
		FALSE,
		FALSE,
		COALESCE(getSalesRepId(pNew.sales_rep),shipto_salesrep_id,cust_salesrep_id),
		COALESCE(pNew.commission, 0),
		CASE
			WHEN pNew.tax_authority = 'None' THEN NULL
			ELSE COALESCE(getTaxAuthId(pNew.tax_authority),shipto_taxauth_id,cust_taxauth_id)
		END,
		COALESCE(getTermsId(pNew.terms),cust_terms_id),
		(SELECT getCustId(pNew.customer_number)),
		pNew.billto_name,
		pNew.billto_address1,
		pNew.billto_address2,
		pNew.billto_address3,
		pNew.billto_city,
		pNew.billto_state,
		pNew.billto_postal_code,
		pNew.billto_country,
		COALESCE(pNew.billto_phone, ''),
		COALESCE(shipto_id,-1),
		pNew.shipto_name,
		pNew.shipto_address1,
		pNew.shipto_address2,
		pNew.shipto_address3,
		pNew.shipto_city,
		pNew.shipto_state,
		pNew.shipto_postal_code,
		pNew.shipto_country,
		pNew.shipto_phone,
		COALESCE(pNew.po_number, ''),
		COALESCE(pNew.ship_via,shipto_shipvia,cust_shipvia),
		COALESCE(getPrjId(pNew.project_number),-1),
		COALESCE(pNew.fob,fetchDefaultFob((
			SELECT CAST(usrpref_value AS INTEGER) 
			FROM usrpref, whsinfo
			WHERE ((warehous_id=CAST(usrpref_value AS INTEGER))
				AND (warehous_shipping)
				AND (warehous_active)
				AND (usrpref_username=current_user)
				AND (usrpref_name='PreferredWarehouse')
			)
		))),
		pNew.misc_charge_description,
		COALESCE(pNew.misc_charge, 0),
		COALESCE(getGlAccntId(pNew.misc_charge_account_number),-1),
		COALESCE(pNew.freight, 0),
		COALESCE(getCurrId(pNew.currency),(
			SELECT cust_curr_id
			FROM custinfo
			WHERE (cust_id=(SELECT getCustId(pNew.customer_number)))
		),basecurrid()),
		0, -- invchead_tax has a NOT NULL constraint (will be recalculated by trigger)
		COALESCE(getCurrId(pNew.tax_currency),getCurrId(pNew.currency),(
			SELECT cust_curr_id
			FROM custinfo
			WHERE (cust_id=(SELECT getCustId(pNew.customer_number)))
		),basecurrid()),
		getTaxId(NULLIF(pNew.misc_tax_adjustment_code,'None')),
		COALESCE(pNew.misc_tax_adjustment_amount_a,0),
		COALESCE(pNew.misc_tax_adjustment_amount_b,0),
		COALESCE(pNew.misc_tax_adjustment_amount_c,0),
		getTaxId(NULLIF(pNew.freight_tax_code,'None')),
		COALESCE(pNew.freight_tax_amount_a,0),
		COALESCE(pNew.freight_tax_amount_b,0),
		COALESCE(pNew.freight_tax_amount_c,0),
		COALESCE(pNew.payment,0),
		COALESCE(pNew.notes,'')
	FROM custinfo
		LEFT OUTER JOIN shiptoinfo ON (shipto_id=(SELECT CASE
			WHEN getShiptoId(pNew.customer_number,pNew.shipto_number) IS NOT NULL
				THEN getShiptoId(pNew.customer_number,pNew.shipto_number)
			ELSE (SELECT shipto_id FROM shiptoinfo WHERE shipto_cust_id=cust_id AND shipto_default)
		END))
	WHERE cust_id = (SELECT getCustId(pNew.customer_number));
	RETURN TRUE;
END;
$insertInvoice$ LANGUAGE 'plpgsql';


--Rules

CREATE OR REPLACE RULE "_INSERT" AS
	ON INSERT TO api.invoice DO INSTEAD
		SELECT insertInvoice(NEW);


CREATE OR REPLACE RULE "_UPDATE" AS 
	ON UPDATE TO api.invoice DO INSTEAD

	UPDATE invchead SET
		invchead_invcnumber=OLD.invoice_number,
		invchead_ordernumber=NEW.order_number,
		invchead_invcdate=NEW.invoice_date,
		invchead_shipdate=NEW.ship_date,
		invchead_orderdate=NEW.order_date,
		invchead_salesrep_id=getSalesRepId(NEW.sales_rep),
		invchead_commission=NEW.commission,
		invchead_taxauth_id=getTaxAuthId(NULLIF(NEW.tax_authority, 'None')),
		invchead_terms_id=getTermsId(NEW.terms),
		invchead_cust_id=(SELECT getCustId(NEW.customer_number)),
		invchead_billto_name=NEW.billto_name,
		invchead_billto_address1=NEW.billto_address1,
		invchead_billto_address2=NEW.billto_address2,
		invchead_billto_address3=NEW.billto_address3,
		invchead_billto_city=NEW.billto_city,
		invchead_billto_state=NEW.billto_state,
		invchead_billto_zipcode=NEW.billto_postal_code,
		invchead_billto_country=NEW.billto_country,
		invchead_billto_phone=NEW.billto_phone,
		invchead_shipto_id=COALESCE(getShiptoId(NEW.customer_number,NEW.shipto_number),-1),
		invchead_shipto_name=NEW.shipto_name,
		invchead_shipto_address1=NEW.shipto_address1,
		invchead_shipto_address2=NEW.shipto_address2,
		invchead_shipto_address3=NEW.shipto_address3,
		invchead_shipto_city=NEW.shipto_city,
		invchead_shipto_state=NEW.shipto_state,
		invchead_shipto_zipcode=NEW.shipto_postal_code,
		invchead_shipto_country=NEW.shipto_country,
		invchead_shipto_phone=NEW.shipto_phone,
		invchead_ponumber=NEW.po_number,
		invchead_shipvia=NEW.ship_via,
		invchead_prj_id=COALESCE(getPrjId(NEW.project_number),-1),
		invchead_fob=NEW.fob,
		invchead_misc_descrip=NEW.misc_charge_description,
		invchead_misc_amount=NEW.misc_charge,
		invchead_misc_accnt_id=COALESCE(getGlAccntId(NEW.misc_charge_account_number),-1),
		invchead_freight=NEW.freight,
		invchead_curr_id=COALESCE(getCurrId(NEW.currency),-1),
		invchead_tax_curr_id=COALESCE(getCurrId(NEW.tax_currency),-1),
		invchead_adjtax_id=getTaxId(NULLIF(NEW.misc_tax_adjustment_code,'None')),
		invchead_adjtax_ratea=NEW.misc_tax_adjustment_amount_a,
		invchead_adjtax_rateb=NEW.misc_tax_adjustment_amount_b,
		invchead_adjtax_ratec=NEW.misc_tax_adjustment_amount_c,
		invchead_freighttax_id=getTaxId(NULLIF(NEW.freight_tax_code, 'None')),
		invchead_freighttax_ratea=NEW.freight_tax_amount_a,
		invchead_freighttax_rateb=NEW.freight_tax_amount_b,
		invchead_freighttax_ratec=NEW.freight_tax_amount_c,
		invchead_payment=NEW.payment,
		invchead_notes=NEW.notes
	WHERE (invchead_invcnumber=OLD.invoice_number)
		AND (invchead_posted = FALSE);


CREATE OR REPLACE RULE "_DELETE" AS 
	ON DELETE TO api.invoice DO INSTEAD
	
	SELECT deleteInvoice(invchead_id)
	FROM invchead
	WHERE invchead_invcnumber = OLD.invoice_number AND invchead_posted = FALSE;

COMMIT;
