BEGIN;

ALTER TABLE coitem ADD COLUMN coitem_qty_uom_id INTEGER;
ALTER TABLE coitem ADD FOREIGN KEY (coitem_qty_uom_id) REFERENCES uom(uom_id);
UPDATE coitem SET coitem_qty_uom_id=item_inv_uom_id FROM item, itemsite WHERE coitem_itemsite_id=itemsite_id AND itemsite_item_id=item_id;
ALTER TABLE coitem ALTER COLUMN coitem_qty_uom_id SET NOT NULL;

ALTER TABLE coitem ADD COLUMN coitem_qty_invuomratio NUMERIC(20,10);
UPDATE coitem SET coitem_qty_invuomratio=1.0;
ALTER TABLE coitem ALTER COLUMN coitem_qty_invuomratio SET NOT NULL;

ALTER TABLE coitem ADD COLUMN coitem_price_uom_id INTEGER;
ALTER TABLE coitem ADD FOREIGN KEY (coitem_price_uom_id) REFERENCES uom(uom_id);
UPDATE coitem SET coitem_price_uom_id=item_price_uom_id FROM itemsite, item WHERE coitem_itemsite_id=itemsite_id AND itemsite_item_id=item_id;
ALTER TABLE coitem ALTER COLUMN coitem_price_uom_id SET NOT NULL;

ALTER TABLE coitem ADD COLUMN coitem_price_invuomratio NUMERIC(20,10);
UPDATE coitem SET coitem_price_invuomratio=item_invpricerat FROM item, itemsite WHERE coitem_itemsite_id=itemsite_id AND itemsite_item_id=item_id;
ALTER TABLE coitem ALTER COLUMN coitem_price_invuomratio SET NOT NULL;

ALTER TABLE coitem ADD COLUMN coitem_warranty boolean NOT NULL DEFAULT FALSE;
ALTER TABLE coitem ADD COLUMN coitem_salescat_id integer REFERENCES salescat (salescat_id);
ALTER TABLE coitem ADD COLUMN coitem_cos_accnt_id integer REFERENCES accnt (accnt_id);

COMMIT;

