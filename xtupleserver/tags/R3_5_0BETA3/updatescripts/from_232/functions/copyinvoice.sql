CREATE OR REPLACE FUNCTION copyInvoice(INTEGER, DATE) RETURNS INTEGER AS $$
DECLARE
  pInvcheadid ALIAS FOR $1;
  _invcheadid INTEGER;
  _invcnumber TEXT;
  _invcdate DATE := COALESCE($2, CURRENT_DATE);
  _i RECORD;
BEGIN
  SELECT *
    INTO _i
    FROM invchead
   WHERE(invchead_id=pInvcheadid);
  IF(NOT FOUND) THEN
    RETURN -1;
  END IF;

  _invcnumber := fetchInvcNumber();
  _invcheadid := nextval('invchead_invchead_id_seq');

  INSERT INTO invchead
        (invchead_id,
         invchead_cust_id, invchead_shipto_id,
         invchead_ordernumber, invchead_orderdate,
         invchead_posted, invchead_printed,
         invchead_invcnumber, invchead_invcdate, invchead_shipdate,
         invchead_ponumber, invchead_shipvia,
         invchead_fob, invchead_billto_name,
         invchead_billto_address1, invchead_billto_address2,
         invchead_billto_address3, invchead_billto_city,
         invchead_billto_state, invchead_billto_zipcode,
         invchead_billto_phone, invchead_shipto_name,
         invchead_shipto_address1, invchead_shipto_address2,
         invchead_shipto_address3, invchead_shipto_city,
         invchead_shipto_state, invchead_shipto_zipcode,
         invchead_shipto_phone, invchead_salesrep_id,
         invchead_commission, invchead_tax_id,
         invchead_terms_id, invchead_freight,
         invchead_tax, invchead_misc_amount,
         invchead_misc_descrip, invchead_misc_accnt_id,
         invchead_payment, invchead_paymentref,
         invchead_notes, invchead_tax_ratea,
         invchead_tax_rateb, invchead_tax_ratec,
         invchead_billto_country, invchead_shipto_country,
         invchead_prj_id, invchead_curr_id,
         invchead_taxauth_id, invchead_tax_curr_id,
         invchead_adjtax_id, invchead_adjtaxtype_id,
         invchead_adjtax_pcta, invchead_adjtax_pctb,
         invchead_adjtax_pctc, invchead_adjtax_ratea,
         invchead_adjtax_rateb, invchead_adjtax_ratec,
         invchead_freighttax_id, invchead_freighttaxtype_id,
         invchead_freighttax_pcta, invchead_freighttax_pctb,
         invchead_freighttax_pctc, invchead_freighttax_ratea,
         invchead_freighttax_rateb, invchead_freighttax_ratec )
  VALUES(_invcheadid,
         _i.invchead_cust_id, _i.invchead_shipto_id,
         _i.invchead_ordernumber, _i.invchead_orderdate,
         false, false,
         _invcnumber, _invcdate, _i.invchead_shipdate,
         _i.invchead_ponumber, _i.invchead_shipvia,
         _i.invchead_fob, _i.invchead_billto_name,
         _i.invchead_billto_address1, _i.invchead_billto_address2,
         _i.invchead_billto_address3, _i.invchead_billto_city,
         _i.invchead_billto_state, _i.invchead_billto_zipcode,
         _i.invchead_billto_phone, _i.invchead_shipto_name,
         _i.invchead_shipto_address1, _i.invchead_shipto_address2,
         _i.invchead_shipto_address3, _i.invchead_shipto_city,
         _i.invchead_shipto_state, _i.invchead_shipto_zipcode,
         _i.invchead_shipto_phone, _i.invchead_salesrep_id,
         _i.invchead_commission, _i.invchead_tax_id,
         _i.invchead_terms_id, _i.invchead_freight,
         _i.invchead_tax, _i.invchead_misc_amount,
         _i.invchead_misc_descrip, _i.invchead_misc_accnt_id,
         _i.invchead_payment, _i.invchead_paymentref,
         _i.invchead_notes, _i.invchead_tax_ratea,
         _i.invchead_tax_rateb, _i.invchead_tax_ratec,
         _i.invchead_billto_country, _i.invchead_shipto_country,
         _i.invchead_prj_id, _i.invchead_curr_id,
         _i.invchead_taxauth_id, _i.invchead_tax_curr_id,
         _i.invchead_adjtax_id, _i.invchead_adjtaxtype_id,
         _i.invchead_adjtax_pcta, _i.invchead_adjtax_pctb,
         _i.invchead_adjtax_pctc, _i.invchead_adjtax_ratea,
         _i.invchead_adjtax_rateb, _i.invchead_adjtax_ratec,
         _i.invchead_freighttax_id, _i.invchead_freighttaxtype_id,
         _i.invchead_freighttax_pcta, _i.invchead_freighttax_pctb,
         _i.invchead_freighttax_pctc, _i.invchead_freighttax_ratea,
         _i.invchead_freighttax_rateb, _i.invchead_freighttax_ratec );

  INSERT INTO invcitem
        (invcitem_invchead_id,
         invcitem_linenumber, invcitem_item_id,
         invcitem_warehous_id, invcitem_custpn,
         invcitem_number, invcitem_descrip,
         invcitem_ordered, invcitem_billed,
         invcitem_custprice, invcitem_price,
         invcitem_notes, invcitem_salescat_id,
         invcitem_tax_id, invcitem_taxtype_id,
         invcitem_tax_pcta, invcitem_tax_pctb,
         invcitem_tax_pctc, invcitem_tax_ratea,
         invcitem_tax_rateb, invcitem_tax_ratec,
         invcitem_qty_uom_id, invcitem_qty_invuomratio,
         invcitem_price_uom_id, invcitem_price_invuomratio,
         invcitem_coitem_id)
  SELECT _invcheadid,
         invcitem_linenumber, invcitem_item_id,
         invcitem_warehous_id, invcitem_custpn,
         invcitem_number, invcitem_descrip,
         invcitem_ordered, invcitem_billed,
         invcitem_custprice, invcitem_price,
         invcitem_notes, invcitem_salescat_id,
         invcitem_tax_id, invcitem_taxtype_id,
         invcitem_tax_pcta, invcitem_tax_pctb,
         invcitem_tax_pctc, invcitem_tax_ratea,
         invcitem_tax_rateb, invcitem_tax_ratec,
         invcitem_qty_uom_id, invcitem_qty_invuomratio,
         invcitem_price_uom_id, invcitem_price_invuomratio,
         invcitem_coitem_id
    FROM invcitem
   WHERE(invcitem_invchead_id=pInvcheadid);

  PERFORM changeInvoiceTaxAuth(_invcheadid, _i.invchead_taxauth_id);

  RETURN _invcheadid;
END;
$$ LANGUAGE 'plpgsql';
