BEGIN;

-- Pricing Schedule Item

DROP VIEW api.pricingscheduleitem;
CREATE OR REPLACE VIEW api.pricingscheduleitem AS 
 SELECT 
   ipshead_name::varchar(100) AS pricing_schedule, 
   'Item'::varchar(100) AS type,
   item_number::varchar(100),
   ''::varchar(100) AS product_category,
   ipsitem_qtybreak AS qty_break, 
   qtyuom.uom_name::varchar(100) AS qty_uom, 
   priceuom.uom_name::varchar(100) AS price_uom,
   ipsitem_price AS price,
   0 AS discount_percent
 FROM ipsitem
   JOIN ipshead ON (ipsitem_ipshead_id = ipshead_id)
   JOIN item ON (ipsitem_item_id = item_id)
   JOIN uom qtyuom ON (ipsitem_qty_uom_id = qtyuom.uom_id)
   JOIN uom priceuom ON (ipsitem_price_uom_id = priceuom.uom_id)
 UNION
 SELECT
   ipshead.ipshead_name::varchar(100) AS pricing_schedule,
   'Product Category'::varchar(100) AS type,
   ''::varchar(100) AS item_number,
   prodcat_code::varchar(100),
   ipsprodcat_qtybreak,
   NULL AS qty_uom,
   NULL AS price_uom,
   NULL AS price,
   ipsprodcat_discntprcnt AS discount_percent
 FROM ipsprodcat
   JOIN ipshead ON (ipsprodcat_ipshead_id = ipshead_id)
   JOIN prodcat ON (ipsprodcat_prodcat_id = prodcat_id);

GRANT ALL ON TABLE api.pricingscheduleitem TO openmfg;
COMMENT ON VIEW api.pricingscheduleitem IS 'Pricing Schedule Item';

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.pricingscheduleitem DO INSTEAD  
    
 SELECT
   CASE 
     WHEN (NEW.type = 'Item') THEN
       saveIpsitem(NULL,getIpsheadId(NEW.pricing_schedule),getItemId(NEW.item_number),COALESCE(NEW.qty_break,0),COALESCE(NEW.price,0),getUomId(NEW.qty_uom),getUomId(NEW.price_uom))
     WHEN (NEW.type = 'Product Category') THEN
       saveIpsProdcat(NULL,getIpsheadId(NEW.pricing_schedule),getProdcatId(NEW.product_category),NEW.qty_break,NEW.discount_percent)
   END;
          
CREATE OR REPLACE RULE "_UPDATE" AS
  ON UPDATE TO api.pricingscheduleitem DO INSTEAD  

 SELECT
   CASE 
     WHEN (OLD.type = 'Item') THEN
       saveIpsitem(getIpsitemId(OLD.pricing_schedule,OLD.item_number,OLD.qty_break,OLD.qty_uom,OLD.price_uom),
       getIpsheadId(NEW.pricing_schedule),getItemId(NEW.item_number),NEW.qty_break,NEW.price,getUomId(NEW.qty_uom),getUomId(NEW.price_uom))
     WHEN (OLD.type = 'Product Category') THEN
       saveIpsProdcat(getIpsProdcatId(OLD.pricing_schedule,OLD.product_category,OLD.qty_break),
       getIpsheadId(NEW.pricing_schedule),getProdCatId(NEW.product_category),NEW.qty_break,NEW.discount_percent)
   END AS result;

CREATE OR REPLACE RULE "_DELETE" AS
  ON DELETE TO api.pricingscheduleitem DO INSTEAD  

 SELECT
   CASE 
     WHEN (OLD.type = 'Item') THEN
       deleteIpsitem(getIpsitemId(OLD.pricing_schedule,OLD.item_number,OLD.qty_break,OLD.qty_uom,OLD.price_uom))
     WHEN (OLD.type = 'Product Category') THEN
       deleteIpsProdcat(getIpsProdcatId(OLD.pricing_schedule,OLD.product_category,OLD.qty_break))
   END AS result;


COMMIT;