BEGIN;

-- Pricing Schedule Item

DROP VIEW api.pricingscheduleitem;
CREATE OR REPLACE VIEW api.pricingscheduleitem AS 
 SELECT 
   ipshead_name AS schedule_name, 
   'Item' AS type,
   item_number,
   '' AS product_category,
   ipsitem_qtybreak AS qty_break, 
   ipsitem_price AS price,
   0 AS discount_percent,
   qtyuom.uom_name AS qty_uom, 
   priceuom.uom_name AS price_uom
 FROM ipsitem
   JOIN ipshead ON (ipsitem_ipshead_id = ipshead_id)
   JOIN item ON (ipsitem_item_id = item_id)
   JOIN uom qtyuom ON (ipsitem_qty_uom_id = qtyuom.uom_id)
   JOIN uom priceuom ON (ipsitem_price_uom_id = priceuom.uom_id)
 UNION
 SELECT
   ipshead.ipshead_name AS schedule_name,
   'Product Category' AS type,
   '' AS item_number,
   prodcat_code,
   ipsprodcat_qtybreak,
   NULL AS price,
   ipsprodcat_discntprcnt AS discount_percent,
   NULL AS qty_uom,
   NULL AS price_uom
 FROM ipsprodcat
   JOIN ipshead ON (ipsprodcat_ipshead_id = ipshead_id)
   JOIN prodcat ON (ipsprodcat_prodcat_id = prodcat_id);

GRANT ALL ON TABLE api.pricingscheduleitem TO openmfg;
COMMENT ON VIEW api.pricingscheduleitem IS 'Pricing Schedule Item';

CREATE OR REPLACE RULE "_INSERT_ITEMPRICE" AS
    ON INSERT TO api.pricingscheduleitem WHERE (new.type = 'Item') DO INSTEAD  

INSERT INTO ipsitem (
  ipsitem_ipshead_id, 
  ipsitem_item_id, 
  ipsitem_qtybreak, 
  ipsitem_price, 
  ipsitem_qty_uom_id, 
  ipsitem_price_uom_id) 
VALUES (
  getIpsheadId(new.schedule_name),
  getItemId(new.item_number),
  new.qty_break, 
  new.price,
  getUomId(new.qty_uom), 
  getUomId(new.price_uom));

CREATE OR REPLACE RULE "_INSERT_PRODCATPRICE" AS
    ON INSERT TO api.pricingscheduleitem WHERE (new.type = 'Product Category') DO INSTEAD  

INSERT INTO ipsprodcat (
  ipsprodcat_ipshead_id, 
  ipsprodcat_prodcat_id, 
  ipsprodcat_qtybreak, 
  ipsprodcat_discntprcnt) 
VALUES (
  getIpsheadId(new.schedule_name),
  getItemId(new.item_number),
  new.qty_break, 
  new.discount_percent);

          
CREATE OR REPLACE RULE "_UPDATE_ITEMPRICE" AS
  ON UPDATE TO api.pricingscheduleitem WHERE (new.type = 'Item') DO INSTEAD  

  UPDATE ipsitem SET 
    ipsitem_qtybreak = new.qty_break, 
    ipsitem_price = new.price, 
    ipsitem_qty_uom_id = getUomId(new.qty_uom), 
    ipsitem_price_uom_id = getUomId(new.price_uom)
  FROM ipshead
  WHERE ((ipsitem_ipshead_id = getIpsheadId(old.schedule_name))
    AND (ipsitem_item_id = getItemId(old.item_number))
    AND (ipsitem_qtybreak = old.qty_break)
    AND (ipsitem_qty_uom_id = getUomId(old.qty_uom))
    AND (ipsitem_price_uom_id = getUomId(old.price_uom)));

CREATE OR REPLACE RULE "_UPDATE_PRODCATPRICE" AS
  ON UPDATE TO api.pricingscheduleitem WHERE (new.type = 'Product Category') DO INSTEAD  

  UPDATE ipsprodcat SET
    ipsprodcat_qtybreak = new.qty_break,
    ipsprodcat_discntprcnt = new.discount_percent
  WHERE ((ipsprodcat_ipshead_id = getIpsheadId(old.schedule_name))
    AND (ipsprodcat_prodcat_id = getProdcatId(old.product_category))
    AND (ipsprodcat_qtybreak = old.qty_break));

CREATE OR REPLACE RULE "_DELETE_ITEMPRICE" AS
  ON DELETE TO api.pricingscheduleitem WHERE (old.type = 'Item') DO INSTEAD  

  DELETE FROM ipsitem
  WHERE ((ipsitem_ipshead_id = getIpsheadId(old.schedule_name))
    AND (ipsitem_item_id = getItemId(old.item_number))
    AND (ipsitem_qtybreak = old.qty_break)
    AND (ipsitem_qty_uom_id = getUomId(old.qty_uom))
    AND (ipsitem_price_uom_id = getUomId(old.price_uom)));

CREATE OR REPLACE RULE "_DELETE_PRODCATPRICE" AS
  ON DELETE TO api.pricingscheduleitem WHERE (old.type = 'Product Category') DO INSTEAD  

  DELETE FROM ipsprodcat
  WHERE ((ipsprodcat_ipshead_id = getIpsheadId(old.schedule_name))
    AND (ipsprodcat_prodcat_id = getProdcatId(old.product_category))
    AND (ipsprodcat_qtybreak = old.qty_break));
