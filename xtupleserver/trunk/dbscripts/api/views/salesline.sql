BEGIN;

-- Sales Order Line
SELECT dropIfExists('VIEW', 'salesline', 'api');
CREATE VIEW api.salesline
AS 
  SELECT 
     cohead_number::VARCHAR AS order_number,
     formatsolinenumber(coitem_id)::VARCHAR AS line_number,
     l.item_number AS item_number,
     coitem_custpn AS customer_pn,
     s.item_number AS substitute_for,
     warehous_code AS sold_from_site,
     coitem_status AS status,
     coitem_qtyord AS qty_ordered,
     q.uom_name AS qty_uom,
     coitem_price AS net_unit_price,
     p.uom_name AS price_uom,
     coitem_scheddate AS scheduled_date,
     coitem_promdate AS promise_date,
     coitem_warranty AS warranty,
     COALESCE((
       SELECT taxtype_name
       FROM taxtype
       WHERE (taxtype_id=getItemTaxType(l.item_id, cohead_taxauth_id))),'None') AS tax_type,
     COALESCE(tax_code,'None') AS tax_code,
     CASE
       WHEN coitem_price = 0 THEN
         '100'
       WHEN coitem_custprice = 0 THEN
         'N/A'
       ELSE
         CAST(ROUND(((1 - coitem_price / coitem_custprice) * 100),4) AS text)
     END AS discount_pct_from_list,
     CASE
       WHEN (coitem_order_id = -1) THEN
         false
       ELSE
         true
     END AS create_order,
     coitem_prcost AS overwrite_po_price,
     coitem_memo AS notes,
     CASE WHEN (coitem_cos_accnt_id IS NOT NULL) THEN
       formatglaccount(coitem_cos_accnt_id) 
     ELSE
       NULL
     END AS alternate_cos_account
  FROM cohead, coitem
    LEFT OUTER JOIN itemsite isb ON (coitem_substitute_item_id=isb.itemsite_id)
    LEFT OUTER JOIN item s ON (isb.itemsite_item_id=s.item_id)
    LEFT OUTER JOIN tax ON (coitem_tax_id=tax_id),
  itemsite il, item l, whsinfo, uom q, uom p
  WHERE ((cohead_id=coitem_cohead_id)
  AND (coitem_itemsite_id=il.itemsite_id)
  AND (il.itemsite_item_id=l.item_id)
  AND (il.itemsite_warehous_id=warehous_id)
  AND (coitem_qty_uom_id=q.uom_id)
  AND (coitem_price_uom_id=p.uom_id))
ORDER BY cohead_number,coitem_linenumber,coitem_subnumber;
    
GRANT ALL ON TABLE api.salesline TO openmfg;
COMMENT ON VIEW api.salesline IS 'Sales Order Line Item';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.salesline DO INSTEAD

  INSERT INTO coitem (
    coitem_cohead_id,
    coitem_linenumber,
    coitem_itemsite_id,
    coitem_status,
    coitem_scheddate,
    coitem_promdate,
    coitem_qtyord,
    coitem_qty_uom_id,
    coitem_qty_invuomratio,
    coitem_qtyshipped,
    coitem_unitcost,
    coitem_price,
    coitem_price_uom_id,
    coitem_price_invuomratio,
    coitem_custprice,
    coitem_order_id,
    coitem_memo,
    coitem_imported,
    coitem_qtyreturned,
    coitem_custpn,
    coitem_order_type,
    coitem_substitute_item_id,
    coitem_prcost,
    coitem_tax_id,
    coitem_warranty,
    coitem_cos_accnt_id)
  SELECT
    cohead_id,
    COALESCE(NEW.line_number::INTEGER,(SELECT (COALESCE(MAX(coitem_linenumber), 0) + 1)
                                      FROM coitem
                                      WHERE (coitem_cohead_id=cohead_id))),
    itemsite_id,
    NEW.status,
    NEW.scheduled_date,
    NEW.promise_date,
    NEW.qty_ordered,
    COALESCE(getUomId(NEW.qty_uom),item_inv_uom_id),
    itemuomtouomratio(item_id,COALESCE(getUomId(NEW.qty_uom),item_inv_uom_id),item_inv_uom_id),
    0,
    stdCost(item_id),
    COALESCE(NEW.net_unit_price,itemPrice(item_id,cohead_cust_id,
             cohead_shipto_id,NEW.qty_ordered,cohead_curr_id,cohead_orderdate)),
    COALESCE(getUomId(NEW.price_uom),item_price_uom_id),
    itemuomtouomratio(item_id,COALESCE(getUomId(NEW.price_uom),item_price_uom_id),item_price_uom_id),
    itemPrice(item_id,cohead_cust_id,cohead_shipto_id,NEW.qty_ordered,cohead_curr_id,cohead_orderdate),
    -1,
    NEW.notes,
    true,
    0,
    NEW.customer_pn,
    CASE
      WHEN ((NEW.create_order  AND (item_type = 'M')) OR 
           ((NEW.create_order IS NULL) AND itemsite_createwo)) THEN
        'W'
      WHEN ((NEW.create_order AND (item_type = 'P')) OR 
           ((NEW.create_order IS NULL) AND itemsite_createpr)) THEN
        'R'
    END,
    getItemsiteId(warehous_code,NEW.substitute_for),
    NEW.overwrite_po_price,
    COALESCE(getTaxId(NEW.tax_code),getTaxSelection(cohead_taxauth_id,
	           getItemTaxType(itemsite_item_id, cohead_taxauth_id))),
    NEW.warranty,
    getGlAccntId(NEW.alternate_cos_account)
  FROM cohead, itemsite, item, whsinfo
  WHERE ((cohead_number=NEW.order_number)
  AND (itemsite_warehous_id=warehous_id
  AND (itemsite_item_id=item_id)
  AND (itemsite_active)
  AND (item_number=NEW.item_number)
  AND (warehous_active)
  AND (warehous_id=COALESCE(getWarehousId(NEW.sold_from_site,'ALL'),cohead_warehous_id,fetchprefwarehousid()))));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.salesline DO INSTEAD

  UPDATE coitem SET
    coitem_status=NEW.status,
    coitem_scheddate=NEW.scheduled_date,
    coitem_promdate=NEW.promise_date,
    coitem_qtyord=NEW.qty_ordered,
    coitem_qty_uom_id=getUomId(NEW.qty_uom),
    coitem_qty_invuomratio=itemuomtouomratio(item_id,getUomId(NEW.qty_uom),item_inv_uom_id),
    coitem_price=NEW.net_unit_price,
    coitem_price_uom_id=getUomId(NEW.price_uom),
    coitem_price_invuomratio=itemuomtouomratio(item_id,getUomId(NEW.price_uom),item_price_uom_id),
    coitem_memo=NEW.notes,
    coitem_order_type=
    CASE
      WHEN (NOT OLD.create_order AND NEW.create_order  AND (item_type = 'M')) THEN
        'W'
      WHEN (NOT OLD.create_order AND NEW.create_order AND (item_type = 'P')) THEN
        'R'     
    END,
    coitem_substitute_item_id=getItemsiteId(NEW.sold_from_site,NEW.item_number),
    coitem_prcost=NEW.overwrite_po_price,
    coitem_tax_id=
    CASE
      WHEN (NEW.tax_code='None') THEN
        NULL
      ELSE getTaxId(NEW.tax_code)
    END,
    coitem_warranty=NEW.warranty,
    coitem_cos_accnt_id=getGlAccntId(NEW.alternate_cos_account)
   FROM item
   WHERE ((item_number=OLD.item_number)
   AND (coitem_cohead_id=getCoheadId(OLD.order_number))
   AND (coitem_id=getCoitemId(OLD.order_number,OLD.line_number))
   AND (coitem_subnumber=0));

CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.salesline DO INSTEAD

  DELETE FROM coitem
  WHERE ((coitem_cohead_id=getCoheadId(OLD.order_number))
  AND (coitem_id=getCoitemId(OLD.order_number,OLD.line_number))
  AND (coitem_subnumber=0));

COMMIT;

