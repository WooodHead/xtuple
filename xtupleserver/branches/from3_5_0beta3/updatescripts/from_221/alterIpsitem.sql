BEGIN;

ALTER TABLE ipsitem ADD COLUMN ipsitem_qty_uom_id INTEGER;
ALTER TABLE ipsitem ADD FOREIGN KEY (ipsitem_qty_uom_id) REFERENCES uom(uom_id);
UPDATE ipsitem SET ipsitem_qty_uom_id=item_inv_uom_id FROM item WHERE ipsitem_item_id=item_id;
ALTER TABLE ipsitem ALTER COLUMN ipsitem_qty_uom_id SET NOT NULL;

ALTER TABLE ipsitem ADD COLUMN ipsitem_price_uom_id INTEGER;
ALTER TABLE ipsitem ADD FOREIGN KEY (ipsitem_price_uom_id) REFERENCES uom(uom_id);
UPDATE ipsitem SET ipsitem_price_uom_id=item_price_uom_id FROM item WHERE ipsitem_item_id=item_id;
ALTER TABLE ipsitem ALTER COLUMN ipsitem_price_uom_id SET NOT NULL;

COMMIT;

