BEGIN;

ALTER TABLE ipsitem ADD UNIQUE (ipsitem_ipshead_id, ipsitem_item_id, ipsitem_qtybreak, ipsitem_qty_uom_id, ipsitem_price_uom_id);
ALTER TABLE ipsitem ALTER COLUMN ipsitem_qtybreak SET NOT NULL;
ALTER TABLE ipsitem ALTER COLUMN ipsitem_price SET NOT NULL;

COMMIT;
