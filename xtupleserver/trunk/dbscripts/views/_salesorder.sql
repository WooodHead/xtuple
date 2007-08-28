BEGIN;

-- SalesOrder

DROP VIEW _salesorder;
CREATE VIEW _salesorder
AS
   SELECT 
     cohead_number AS order_number,
     warehous_code AS warehouse,
     cohead_orderdate AS order_date,
     cohead_packdate AS pack_date,
     CASE
       WHEN cohead_origin='C' THEN
         'Customer'
       WHEN cohead_origin='I' THEN
         'Internet'
       WHEN cohead_origin='S' THEN
         'Sales Rep.'
       ELSE
         'Error'
     END AS originated_by,
     salesrep_number AS sales_rep,
     cohead_commission AS commission,
     taxauth_code AS tax_authority,
     terms_code AS terms,
     prj_number AS project_number,
     cust_number AS customer_number,
     cohead_billtoname AS billto_name,
     cohead_billtoaddress1 AS billto_address1,
     cohead_billtoaddress2 AS billto_address2,
     cohead_billtoaddress3 AS billto_address3,
     cohead_billtocity AS billto_city,
     cohead_billtostate AS billto_state,
     cohead_billtozipcode AS billto_postal_code,
     cohead_billtocountry AS billto_country,
     shipto_num AS shipto_number,
     cohead_shiptoname AS shipto_name,
     cohead_shiptophone AS shipto_phone,
     cohead_shiptoaddress1 AS shipto_address1,
     cohead_shiptoaddress2 AS shipto_address2,
     cohead_shiptoaddress3 AS shipto_address3,
     cohead_shiptocity AS shipto_city,
     cohead_shiptostate AS shipto_state,
     cohead_shiptozipcode AS shipto_postal_code,
     cohead_shiptocountry AS shipto_country,
     cohead_custponumber AS cust_po_number,
     cohead_fob AS fob,
     cohead_shipvia AS ship_via,
     CASE
       WHEN cohead_holdtype = 'N' THEN
         'None'
       WHEN cohead_holdtype = 'C' THEN
         'Credit'
       WHEN cohead_holdtype = 'S' THEN
         'Shipping'
       WHEN cohead_holdtype = 'P' THEN
         'Packing'
       ELSE
         'Error'
     END AS hold_type,
     shipchrg_name AS shipping_chgs,
     shipform_name AS shipping_form,
     cohead_shipcomplete AS ship_complete,
     curr_abbr AS currency,
     cohead_misc_descrip AS misc_charge_description,
     CASE
       WHEN cohead_misc_accnt_id = -1 THEN
         NULL
       ELSE
         formatglaccount(cohead_misc_accnt_id) 
     END AS misc_account_number,
     cohead_misc AS misc_charge,
     cohead_freight AS freight,
     cohead_ordercomments AS order_notes,
     cohead_shipcomments AS shipping_notes,
     false AS add_to_packing_list_batch
   FROM cohead
     LEFT OUTER JOIN whsinfo ON (cohead_warehous_id=warehous_id)
     LEFT OUTER JOIN prj ON (cohead_prj_id=prj_id)
     LEFT OUTER JOIN shiptoinfo ON (cohead_shipto_id=shipto_id)
     LEFT OUTER JOIN shipchrg ON (cohead_shipchrg_id=shipchrg_id)
     LEFT OUTER JOIN taxauth ON (cohead_taxauth_id=taxauth_id),
     custinfo,shipform,salesrep,terms,curr_symbol
   WHERE ((cohead_cust_id=cust_id)
   AND (cohead_shipform_id=shipform_id)
   AND (cohead_salesrep_id=salesrep_id)
   AND (cohead_terms_id=terms_id)
   AND (cohead_curr_id=curr_id));

GRANT ALL ON TABLE _salesorder TO openmfg;
COMMENT ON VIEW _salesorder IS '
This view can be used as an interface to import Sales Order Header data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _salesorder DO INSTEAD

  INSERT INTO cohead (
    cohead_number,
    cohead_cust_id,
    cohead_custponumber,
    cohead_orderdate,
    cohead_warehous_id,
    cohead_shipto_id,
    cohead_shiptoname,
    cohead_shiptoaddress1,
    cohead_shiptoaddress2,
    cohead_shiptoaddress3,
    cohead_salesrep_id,
    cohead_terms_id,
    cohead_origin,
    cohead_fob,
    cohead_shipvia,
    cohead_shiptocity,
    cohead_shiptostate,
    cohead_shiptozipcode,
    cohead_freight,
    cohead_misc,
    cohead_imported,
    cohead_ordercomments,
    cohead_shipcomments,
    cohead_shiptophone,
    cohead_shipchrg_id,
    cohead_shipform_id,
    cohead_billtoname,
    cohead_billtoaddress1,
    cohead_billtoaddress2,
    cohead_billtoaddress3,
    cohead_billtocity,
    cohead_billtostate,
    cohead_billtozipcode,
    cohead_misc_accnt_id,
    cohead_misc_descrip,
    cohead_commission,
    cohead_holdtype,
    cohead_packdate,
    cohead_prj_id,
    cohead_shipcomplete,
    cohead_billtocountry,
    cohead_shiptocountry,
    cohead_curr_id,
    cohead_taxauth_id
    )
  VALUES (
    NEW.order_number,
    getCustId(NEW.customer_number),
    COALESCE(NEW.cust_po_number,''),
    COALESCE(NEW.order_date,current_date),
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
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
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
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
      AND (shipto_default))),(
      SELECT cust_salesrep_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))),
    COALESCE(getTermsId(NEW.terms),(
      SELECT cust_terms_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))),
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
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
      AND (shipto_default))),(
      SELECT cust_shipvia
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))),
    NEW.shipto_city,
    NEW.shipto_state,
    NEW.shipto_postal_code,
    COALESCE(NEW.freight,0),
    COALESCE(NEW.misc_charge,0),
    true,
    COALESCE(NEW.order_notes,''),
    COALESCE(NEW.shipping_notes,''),
    COALESCE(NEW.shipto_phone,''),
    COALESCE(getShipChrgId(NEW.shipping_chgs),(
      SELECT shipto_shipchrg_id
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_shipchrg_id
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
      AND (shipto_default))),(
      SELECT cust_shipchrg_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))),
    COALESCE(getShipFormId(NEW.shipping_form),(
      SELECT shipto_shipform_id
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_shipform_id
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
      AND (shipto_default))),(
      SELECT cust_shipform_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))),
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
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
      AND (shipto_default))),(
      SELECT cust_commprcnt
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))),
    CASE
      WHEN NEW.hold_type = 'Credit' THEN
        'C'
      WHEN NEW.hold_type = 'Shipping' THEN
        'S'
      WHEN NEW.hold_type = 'Packing' THEN
        'P'
      ELSE
        'N'
    END,
    COALESCE(NEW.pack_date,NEW.order_date,current_date),
    COALESCE(getPrjId(NEW.project_number),-1),
    COALESCE(NEW.ship_complete,false),
    NEW.billto_country,
    NEW.shipto_country,
    COALESCE(getCurrId(NEW.currency),(
      SELECT cust_curr_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number))),basecurrid()),
    COALESCE(getTaxAuthId(NEW.tax_authority),(
      SELECT shipto_taxauth_id
      FROM shiptoinfo
      WHERE (shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number))),(
      SELECT shipto_taxauth_id
      FROM shiptoinfo
      WHERE ((shipto_cust_id=getCustId(NEW.customer_number))
      AND (shipto_default))),(
      SELECT cust_taxauth_id
      FROM custinfo
      WHERE (cust_id=getCustId(NEW.customer_number)))));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO _salesorder DO INSTEAD

  UPDATE cohead SET
    cohead_number=OLD.order_number,
    cohead_cust_id=getCustId(NEW.customer_number),
    cohead_custponumber=NEW.cust_po_number,
    cohead_orderdate=NEW.order_date,
    cohead_warehous_id=getWarehousId(NEW.warehouse,'SHIPPING'),
    cohead_shipto_id=getShiptoId(NEW.customer_number,NEW.shipto_number),
    cohead_shiptoname=NEW.shipto_name,
    cohead_shiptoaddress1=NEW.shipto_address1,
    cohead_shiptoaddress2=NEW.shipto_address2,
    cohead_shiptoaddress3=NEW.shipto_address3,
    cohead_salesrep_id=getSalesRepId(NEW.sales_rep),
    cohead_terms_id=getTermsId(NEW.terms),
    cohead_origin=
    CASE
      WHEN NEW.originated_by = 'Internet' THEN
        'I'
      WHEN NEW.originated_by = 'Sales Rep' THEN
        'S'
      ELSE
        'C'
    END,
    cohead_fob=NEW.fob,
    cohead_shipvia=NEW.ship_via,
    cohead_shiptocity=NEW.shipto_city,
    cohead_shiptostate=NEW.shipto_state,
    cohead_shiptozipcode=NEW.shipto_postal_code,
    cohead_freight=NEW.freight,
    cohead_misc=NEW.misc_charge,
    cohead_ordercomments=NEW.order_notes,
    cohead_shipcomments=NEW.shipping_notes,
    cohead_shiptophone=NEW.shipto_phone,
    cohead_shipchrg_id=getShipChrgId(NEW.shipping_chgs),
    cohead_shipform_id=getShipFormId(NEW.shipping_form),
    cohead_billtoname=NEW.billto_name,
    cohead_billtoaddress1=NEW.billto_address1,
    cohead_billtoaddress2=NEW.billto_address2,
    cohead_billtoaddress3=NEW.billto_address3,
    cohead_billtocity=NEW.billto_city,
    cohead_billtostate=NEW.billto_state,
    cohead_billtozipcode=NEW.billto_postal_code,
    cohead_misc_accnt_id=COALESCE(getGlAccntId(NEW.misc_account_number),-1),
    cohead_misc_descrip=NEW.misc_charge_description,
    cohead_commission=NEW.commission,
    cohead_holdtype=
    CASE
      WHEN NEW.hold_type = 'Credit' THEN
        'C'
      WHEN NEW.hold_type = 'Shipping' THEN
        'S'
      WHEN NEW.hold_type = 'Packing' THEN
        'P'
      ELSE
        'N'
    END,
    cohead_packdate=NEW.pack_date,
    cohead_prj_id=getPrjId(NEW.project_number),
    cohead_shipcomplete=NEW.ship_complete,
    cohead_billtocountry=NEW.billto_country,
    cohead_shiptocountry=NEW.shipto_country,
    cohead_curr_id=getCurrId(NEW.currency),
    cohead_taxauth_id=getTaxAuthId(NEW.tax_authority),
    cohead_lastupdated=('now'::text)::timestamp(6) with time zone
  WHERE (cohead_number=OLD.order_number);
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO _salesorder DO INSTEAD

  SELECT deleteso(cohead_id,OLD.order_number)
  FROM cohead
  WHERE (cohead_number=OLD.order_number);

COMMIT;

