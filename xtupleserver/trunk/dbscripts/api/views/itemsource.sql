BEGIN;

-- Item Source

DROP VIEW api.itemsource;

CREATE VIEW api.itemsource AS
  SELECT item.item_number::VARCHAR(100) AS item_number,
       vendinfo.vend_number::VARCHAR(100) AS vendor, 
       itemsrc.itemsrc_vend_item_number AS vendor_item_number, 
       itemsrc.itemsrc_active AS active,
       itemsrc.itemsrc_vend_uom AS vendor_uom, 
       itemsrc.itemsrc_invvendoruomratio AS inventory_vendor_uom_ratio, 
       itemsrc.itemsrc_minordqty AS minimum_order, 
       itemsrc.itemsrc_multordqty AS order_multiple,  
       itemsrc.itemsrc_ranking AS vendor_ranking, 
       itemsrc.itemsrc_leadtime AS lead_time,
       itemsrc.itemsrc_comments AS notes, 
       itemsrc.itemsrc_vend_item_descrip AS vendor_description
   FROM itemsrc
   LEFT JOIN item ON itemsrc.itemsrc_item_id = item.item_id
   LEFT JOIN vendinfo ON itemsrc.itemsrc_vend_id = vendinfo.vend_id
  ORDER BY item.item_number::VARCHAR(100), vendinfo.vend_number::VARCHAR(100);
        
GRANT ALL ON TABLE api.itemsource TO openmfg;
COMMENT ON VIEW api.itemsource IS 'Item Source';

-- Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.itemsource DO INSTEAD
    
  INSERT INTO itemsrc (
    itemsrc_item_id, 
    itemsrc_vend_id, 
    itemsrc_vend_item_number, 
    itemsrc_vend_item_descrip, 
    itemsrc_comments, 
    itemsrc_vend_uom, 
    itemsrc_invvendoruomratio, 
    itemsrc_minordqty, 
    itemsrc_multordqty, 
    itemsrc_leadtime, 
    itemsrc_ranking, 
    itemsrc_active) 
  VALUES (
    getitemid(new.item_number), 
    getvendid(new.vendor), 
    new.vendor_item_number, 
    COALESCE(new.vendor_description, ''), 
    COALESCE(new.notes, ''), 
    new.vendor_uom, 
    new.inventory_vendor_uom_ratio, 
    new.minimum_order, 
    new.order_multiple, 
    new.lead_time, 
    new.vendor_ranking, 
    COALESCE(new.active, true));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.itemsource DO INSTEAD
    
  UPDATE itemsrc SET 
    itemsrc_vend_item_number = new.vendor_item_number, 
    itemsrc_vend_item_descrip = new.vendor_description, 
    itemsrc_comments = new.notes, 
    itemsrc_vend_uom = new.vendor_uom, 
    itemsrc_invvendoruomratio = new.inventory_vendor_uom_ratio, 
    itemsrc_minordqty = new.minimum_order, 
    itemsrc_multordqty = new.order_multiple, 
    itemsrc_leadtime = new.lead_time, 
    itemsrc_ranking = new.vendor_ranking, 
    itemsrc_active = new.active
  WHERE ((itemsrc.itemsrc_item_id = getitemid(old.item_number)) AND 
        (itemsrc.itemsrc_vend_id = getvendid(old.vendor)));

CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.itemsource DO INSTEAD
    
  DELETE FROM itemsrc
  WHERE ((itemsrc.itemsrc_item_id = getitemid(old.item_number)) 
  AND (itemsrc.itemsrc_vend_id = getvendid(old.vendor)));

COMMIT;