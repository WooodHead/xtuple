CREATE OR REPLACE FUNCTION copySo(INTEGER, DATE) RETURNS INTEGER AS $$
DECLARE
  pSoheadid ALIAS FOR $1;
  pSchedDate ALIAS FOR $2;
  _soheadid INTEGER;

BEGIN

  SELECT NEXTVAL('cohead_cohead_id_seq') INTO _soheadid;

  INSERT INTO cohead
  ( cohead_id, cohead_number, cohead_cust_id, cohead_prj_id,
    cohead_orderdate, cohead_packdate, cohead_origin, cohead_fob,
    cohead_warehous_id, cohead_terms_id, cohead_salesrep_id,
    cohead_custponumber, cohead_shipvia, cohead_shipchrg_id, cohead_shipform_id, cohead_holdtype,
    cohead_shipto_id, cohead_shiptoname, cohead_shiptoaddress1, cohead_shiptoaddress2, cohead_shiptoaddress3,
    cohead_shiptocity, cohead_shiptostate, cohead_shiptozipcode, cohead_shiptophone,
    cohead_billtoname, cohead_billtoaddress1, cohead_billtoaddress2, cohead_billtoaddress3,
    cohead_billtocity, cohead_billtostate, cohead_billtozipcode,
    cohead_misc_accnt_id, cohead_misc_descrip, cohead_misc, cohead_freight, cohead_commission,
    cohead_ordercomments, cohead_shipcomments,
    cohead_imported, cohead_curr_id, cohead_taxauth_id )
  SELECT _soheadid, fetchSoNumber(), cohead_cust_id, cohead_prj_id,
         CURRENT_DATE, cohead_packdate, cohead_origin, cohead_fob,
         cohead_warehous_id, cohead_terms_id, cohead_salesrep_id,
         cohead_custponumber, cohead_shipvia, cohead_shipchrg_id, cohead_shipform_id, cohead_holdtype,
         cohead_shipto_id, cohead_shiptoname, cohead_shiptoaddress1, cohead_shiptoaddress2, cohead_shiptoaddress3,
         cohead_shiptocity, cohead_shiptostate, cohead_shiptozipcode, cohead_shiptophone,
         cohead_billtoname, cohead_billtoaddress1, cohead_billtoaddress2, cohead_billtoaddress3,
         cohead_billtocity, cohead_billtostate, cohead_billtozipcode,
         cohead_misc_accnt_id, cohead_misc_descrip, cohead_misc, cohead_freight, cohead_commission,
         cohead_ordercomments, cohead_shipcomments,
         FALSE, cohead_curr_id, cohead_taxauth_id
  FROM cohead
  WHERE (cohead_id=pSoheadid);

  INSERT INTO coitem
  ( coitem_cohead_id, coitem_linenumber, coitem_subnumber, coitem_itemsite_id, coitem_status,
    coitem_scheddate,
    coitem_promdate,
    coitem_qtyord, coitem_qtyshipped, coitem_qtyreturned,
    coitem_price, coitem_custprice, coitem_unitcost,
    coitem_qty_uom_id, coitem_price_uom_id,
    coitem_qty_invuomratio, coitem_price_invuomratio,
    coitem_order_type, coitem_order_id,
    coitem_memo, coitem_custpn,
    coitem_imported, coitem_tax_id )
  SELECT _soheadid, coitem_linenumber, coitem_subnumber coitem_itemsite_id, 'O',
         COALESCE(pSchedDate, coitem_scheddate),
         coitem_promdate,
         coitem_qtyord, 0, 0,
         coitem_price, coitem_custprice, stdCost(itemsite_item_id),
         coitem_qty_uom_id, coitem_price_uom_id,
         coitem_qty_invuomratio, coitem_price_invuomratio,
         coitem_order_type, -1,
         coitem_memo, coitem_custpn,
         FALSE, coitem_tax_id
  FROM coitem, itemsite
  WHERE ( (coitem_itemsite_id=itemsite_id)
   AND (coitem_status <> 'X')
   AND (coitem_cohead_id=pSoheadid) );

  INSERT INTO charass
        (charass_target_type, charass_target_id,
         charass_char_id, charass_value)
  SELECT charass_target_type, b.coitem_id,
         charass_char_id, charass_value
    FROM coitem a, charass, coitem b
   WHERE ((charass_target_type='SI')
     AND  (charass_target_id=a.coitem_id)
     AND  (a.coitem_cohead_id=pSoheadid)
     AND  (b.coitem_cohead_id=_soheadid)
     AND  (a.coitem_linenumber=b.coitem_linenumber)
     AND  (a.coitem_subnumber=b.coitem_subnumber));

  RETURN _soheadid;

END;
$$ LANGUAGE plpgsql;
