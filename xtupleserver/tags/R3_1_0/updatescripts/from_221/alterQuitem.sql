BEGIN;

ALTER TABLE quitem ADD COLUMN quitem_qty_uom_id INTEGER;
ALTER TABLE quitem ADD FOREIGN KEY (quitem_qty_uom_id) REFERENCES uom(uom_id);
UPDATE quitem SET quitem_qty_uom_id=item_inv_uom_id FROM item WHERE quitem_item_id=item_id;
ALTER TABLE quitem ALTER COLUMN quitem_qty_uom_id SET NOT NULL;

ALTER TABLE quitem ADD COLUMN quitem_qty_invuomratio NUMERIC(20,10);
UPDATE quitem SET quitem_qty_invuomratio=1.0;
ALTER TABLE quitem ALTER COLUMN quitem_qty_invuomratio SET NOT NULL;

ALTER TABLE quitem ADD COLUMN quitem_price_uom_id INTEGER;
ALTER TABLE quitem ADD FOREIGN KEY (quitem_price_uom_id) REFERENCES uom(uom_id);
UPDATE quitem SET quitem_price_uom_id=item_price_uom_id FROM item WHERE quitem_item_id=item_id;
ALTER TABLE quitem ALTER COLUMN quitem_price_uom_id SET NOT NULL;

ALTER TABLE quitem ADD COLUMN quitem_price_invuomratio NUMERIC(20,10);
UPDATE quitem SET quitem_price_invuomratio=item_invpricerat FROM item WHERE quitem_item_id=item_id;
ALTER TABLE quitem ALTER COLUMN quitem_price_invuomratio SET NOT NULL;

COMMIT;

