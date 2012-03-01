BEGIN;

ALTER TABLE invcitem ADD COLUMN invcitem_qty_uom_id INTEGER;
ALTER TABLE invcitem ADD FOREIGN KEY (invcitem_qty_uom_id) REFERENCES uom(uom_id);
UPDATE invcitem SET invcitem_qty_uom_id=item_inv_uom_id FROM item WHERE invcitem_item_id=item_id;

ALTER TABLE invcitem ADD COLUMN invcitem_qty_invuomratio NUMERIC(20,10);
UPDATE invcitem SET invcitem_qty_invuomratio=1.0;
ALTER TABLE invcitem ALTER COLUMN invcitem_qty_invuomratio SET NOT NULL;

ALTER TABLE invcitem ADD COLUMN invcitem_price_uom_id INTEGER;
ALTER TABLE invcitem ADD FOREIGN KEY (invcitem_price_uom_id) REFERENCES uom(uom_id);
UPDATE invcitem SET invcitem_price_uom_id=item_price_uom_id FROM item WHERE invcitem_item_id=item_id;

ALTER TABLE invcitem ADD COLUMN invcitem_price_invuomratio NUMERIC(20,10);
-- set them all to 1.0
UPDATE invcitem SET invcitem_price_invuomratio=1.0;
-- this only changes the ones that are not misc items.
UPDATE invcitem SET invcitem_price_invuomratio=item_invpricerat FROM item WHERE invcitem_item_id=item_id;
ALTER TABLE invcitem ALTER COLUMN invcitem_price_invuomratio SET NOT NULL;

COMMIT;

