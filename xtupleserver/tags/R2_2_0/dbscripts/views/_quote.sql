BEGIN;

-- Quote

DROP VIEW _quote;
CREATE VIEW _quote
AS
   SELECT 
     quhead_number AS quote_number,
     warehous_code AS warehouse,
     quhead_quotedate AS quote_date,
     quhead_packdate AS pack_date,
     CASE
       WHEN quhead_origin='C' THEN
         'Customer'
       WHEN quhead_origin='I' THEN
         'Internet'
       WHEN quhead_origin='S' THEN
         'Sales Rep.'
       ELSE
         'Error'
     END AS originated_by,
     salesrep_number AS sales_rep,
     quhead_commission AS commission,
     taxauth_code AS tax_authority,
     terms_code AS terms,
     prj_number AS project_number,
     cust_number AS customer_number,
     quhead_billtoname AS billto_name,
     quhead_billtoaddress1 AS billto_address1,
     quhead_billtoaddress2 AS billto_address2,
     quhead_billtoaddress3 AS billto_address3,
     quhead_billtocity AS billto_city,
     quhead_billtostate AS billto_state,
     quhead_billtozip AS billto_postal_code,
     quhead_billtocountry AS billto_country,
     shipto_num AS shipto_number,
     quhead_shiptoname AS shipto_name,
     quhead_shiptophone AS shipto_phone,
     quhead_shiptoaddress1 AS shipto_address1,
     quhead_shiptoaddress2 AS shipto_address2,
     quhead_shiptoaddress3 AS shipto_address3,
     quhead_shiptocity AS shipto_city,
     quhead_shiptostate AS shipto_state,
     quhead_shiptozipcode AS shipto_postal_code,
     quhead_shiptocountry AS shipto_country,
     quhead_custponumber AS cust_po_number,
     quhead_fob AS fob,
     quhead_shipvia AS ship_via,
     curr_abbr AS currency,
     quhead_misc_descrip AS misc_charge_description,
     CASE
       WHEN quhead_misc_accnt_id = -1 THEN
         NULL
       ELSE
         formatglaccount(quhead_misc_accnt_id) 
     END AS misc_account_number,
     quhead_misc AS misc_charge,
     quhead_freight AS freight,
     quhead_ordercomments AS order_notes,
     quhead_shipcomments AS shipping_notes,
     false AS add_to_packing_list_batch
   FROM quhead
     LEFT OUTER JOIN whsinfo ON (quhead_warehous_id=warehous_id)
     LEFT OUTER JOIN prj ON (quhead_prj_id=prj_id)
     LEFT OUTER JOIN shiptoinfo ON (quhead_shipto_id=shipto_id)
     LEFT OUTER JOIN taxauth ON (quhead_taxauth_id=taxauth_id),
     custinfo,
     salesrep,terms,curr_symbol
   WHERE ((quhead_cust_id=cust_id)
   AND (quhead_salesrep_id=salesrep_id)
   AND (quhead_terms_id=terms_id)
   AND (quhead_curr_id=curr_id));

GRANT ALL ON TABLE _quote TO openmfg;
COMMENT ON VIEW _quote IS '
This view can be used as an interface to import Quote Header data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _quote DO INSTEAD

  INSERT INTO quhead (
    quhead_number,
    quhead_cust_id,
    quhead_custponumber,
    quhead_quotedate,
    quhead_warehous_id,
    quhead_shipto_id,
    quhead_shiptoname,
    quhead_shiptoaddress1,
    quhead_shiptoaddress2,
    quhead_shiptoaddress3,
    quhead_salesrep_id,
    quhead_terms_id,
    quhead_origin,
    quhead_fob,
    quhead_shipvia,
    quhead_shiptocity,
    quhead_shiptostate,
    quhead_shiptozipcode,
    quhead_freight,
    quhead_misc,
    quhead_ordercomments,
    quhead_shipcomments,
    quhead_shiptophone,
    quhead_billtoname,
    quhead_billtoaddress1,
    quhead_billtoaddress2,
    quhead_billtoaddress3,
    quhead_billtocity,
    quhead_billtostate,
    quhead_billtozip,
    quhead_misc_accnt_id,
    quhead_misc_descrip,
    quhead_commission,
    quhead_packdate,
    quhead_prj_id,
    quhead_billtocountry,
    quhead_shiptocountry,
    quhead_curr_id,
    quhead_taxauth_id,
    quhead_imported
    )
  VALUES (
    NEW.quote_number,
    getCustId(NEW.customer_number,true),
    COALESCE(NEW.cust_po_number,''),
    COALESCE(NEW.quote_date,current_date),
    COALESCE(getWarehousId(NEW.warehouse,'SHIPPING'),(
      SELECT CAST(usrpref_value AS INTEGER) 
              FROM usrpref, whsinfo
              WHERE ((warehous_id=CAST(usrpref_value AS INTEGER))
              AND (warehous_shipping)
              AND (warehous_active)
              AND (usrpref_username=current_user)
              AND (usrpref_name='PreferredWarehouse'))),-1),
    COALESCE(getShiptoId(NEW.customer_number,NEW.shipto_number),(
      SELECT shipto_id
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number,true))
      AND (shipto_default))),-1),
    NEW.shipto_name,
    NEW.shipto_address1,
    NEW.shipto_address2,
    NEW.shipto_address3,
    COALESCE(getSalesRepId(NEW.sales_rep),(
      SELECT shipto_salesrep_id
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_salesrep_id
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number,true))
      AND (shipto_default))),(
      SELECT cust_salesrep_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number,true)))),
    COALESCE(getTermsId(NEW.terms),(
      SELECT cust_terms_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number,true)))),
    CASE
      WHEN NEW.originated_by = 'Internet' THEN
        'I'
      WHEN NEW.originated_by = 'Sales Rep' THEN
        'S'
      ELSE
        'C'
    END,
    COALESCE(NEW.fob,fetchDefaultFob((
      SELECT CAST(usrpref_value AS INTEGER) 
              FROM usrpref, whsinfo
              WHERE ((warehous_id=CAST(usrpref_value AS INTEGER))
              AND (warehous_shipping)
              AND (warehous_active)
              AND (usrpref_username=current_user)
              AND (usrpref_name='PreferredWarehouse'))))),
    COALESCE(NEW.ship_via,(
      SELECT shipto_shipvia
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_shipvia
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number,true))
      AND (shipto_default))),(
      SELECT cust_shipvia
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number,true)))),
    NEW.shipto_city,
    NEW.shipto_state,
    NEW.shipto_postal_code,
    COALESCE(NEW.freight,0),
    COALESCE(NEW.misc_charge,0),
    COALESCE(NEW.order_notes,''),
    COALESCE(NEW.shipping_notes,''),
    COALESCE(NEW.shipto_phone,''),
    NEW.billto_name,
    NEW.billto_address1,
    NEW.billto_address2,
    NEW.billto_address3,
    NEW.billto_city,
    NEW.billto_state,
    NEW.billto_postal_code,
    COALESCE(getGlAccntId(NEW.misc_account_number),-1),
    COALESCE(NEW.misc_charge_description,''),
    COALESCE(NEW.commission,(
      SELECT shipto_commission
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_commission
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number,true))
      AND (shipto_default))),(
      SELECT cust_commprcnt
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number,true)))),
    COALESCE(NEW.pack_date,NEW.quote_date,current_date),
    COALESCE(getPrjId(NEW.project_number),-1),
    NEW.billto_country,
    NEW.shipto_country,
    COALESCE(getCurrId(NEW.currency),(
      SELECT cust_curr_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number,true))),basecurrid()),
    COALESCE(getTaxAuthId(NEW.tax_authority),(
      SELECT shipto_taxauth_id
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_taxauth_id
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number,true))
      AND (shipto_default))),(
      SELECT cust_taxauth_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number,true)))),
    true);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO _quote DO INSTEAD

  UPDATE quhead SET
    quhead_number=OLD.quote_number,
    quhead_cust_id=getCustId(NEW.customer_number,true),
    quhead_custponumber=NEW.cust_po_number,
    quhead_quotedate=NEW.quote_date,
    quhead_warehous_id=getWarehousId(NEW.warehouse,'SHIPPING'),
    quhead_shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number),
    quhead_shiptoname=NEW.shipto_name,
    quhead_shiptoaddress1=NEW.shipto_address1,
    quhead_shiptoaddress2=NEW.shipto_address2,
    quhead_shiptoaddress3=NEW.shipto_address3,
    quhead_salesrep_id=getSalesRepId(NEW.sales_rep),
    quhead_terms_id=getTermsId(NEW.terms),
    quhead_origin=
    CASE
      WHEN NEW.originated_by = 'Internet' THEN
        'I'
      WHEN NEW.originated_by = 'Sales Rep' THEN
        'S'
      ELSE
        'C'
    END,
    quhead_fob=NEW.fob,
    quhead_shipvia=NEW.ship_via,
    quhead_shiptocity=NEW.shipto_city,
    quhead_shiptostate=NEW.shipto_state,
    quhead_shiptozipcode=NEW.shipto_postal_code,
    quhead_freight=NEW.freight,
    quhead_misc=NEW.misc_charge,
    quhead_ordercomments=NEW.order_notes,
    quhead_shipcomments=NEW.shipping_notes,
    quhead_shiptophone=NEW.shipto_phone,
    quhead_billtoname=NEW.billto_name,
    quhead_billtoaddress1=NEW.billto_address1,
    quhead_billtoaddress2=NEW.billto_address2,
    quhead_billtoaddress3=NEW.billto_address3,
    quhead_billtocity=NEW.billto_city,
    quhead_billtostate=NEW.billto_state,
    quhead_billtozip=NEW.billto_postal_code,
    quhead_misc_accnt_id=COALESCE(getGlAccntId(NEW.misc_account_number),-1),
    quhead_misc_descrip=NEW.misc_charge_description,
    quhead_commission=NEW.commission,
    quhead_packdate=NEW.pack_date,
    quhead_prj_id=getPrjId(NEW.project_number),
    quhead_billtocountry=NEW.billto_country,
    quhead_shiptocountry=NEW.shipto_country,
    quhead_curr_id=getCurrId(NEW.currency),
    quhead_taxauth_id=getTaxAuthId(NEW.tax_authority)
  WHERE (quhead_number=OLD.quote_number);
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO _quote DO INSTEAD

  SELECT deletequote(quhead_id,OLD.quote_number)
  FROM quhead
  WHERE (quhead_number=OLD.quote_number);

COMMIT;

