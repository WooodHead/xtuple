BEGIN;

ALTER TABLE cmitem ADD COLUMN cmitem_qty_uom_id INTEGER;
ALTER TABLE cmitem ADD FOREIGN KEY (cmitem_qty_uom_id) REFERENCES uom(uom_id);
UPDATE cmitem SET cmitem_qty_uom_id=item_inv_uom_id FROM item, itemsite WHERE cmitem_itemsite_id=itemsite_id AND itemsite_item_id=item_id;
ALTER TABLE cmitem ALTER COLUMN cmitem_qty_uom_id SET NOT NULL;

ALTER TABLE cmitem ADD COLUMN cmitem_qty_invuomratio NUMERIC(20,10);
UPDATE cmitem SET cmitem_qty_invuomratio=1.0;
ALTER TABLE cmitem ALTER COLUMN cmitem_qty_invuomratio SET NOT NULL;

ALTER TABLE cmitem ADD COLUMN cmitem_price_uom_id INTEGER;
ALTER TABLE cmitem ADD FOREIGN KEY (cmitem_price_uom_id) REFERENCES uom(uom_id);
UPDATE cmitem SET cmitem_price_uom_id=item_price_uom_id FROM itemsite, item WHERE cmitem_itemsite_id=itemsite_id AND itemsite_item_id=item_id;
ALTER TABLE cmitem ALTER COLUMN cmitem_price_uom_id SET NOT NULL;

ALTER TABLE cmitem ADD COLUMN cmitem_price_invuomratio NUMERIC(20,10);
UPDATE cmitem SET cmitem_price_invuomratio=item_invpricerat FROM item, itemsite WHERE cmitem_itemsite_id=itemsite_id AND itemsite_item_id=item_id;
ALTER TABLE cmitem ALTER COLUMN cmitem_price_invuomratio SET NOT NULL;

COMMIT;

