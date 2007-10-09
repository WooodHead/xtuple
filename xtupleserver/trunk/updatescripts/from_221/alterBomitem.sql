BEGIN;

--UOM Changes
ALTER TABLE bomitem ADD COLUMN bomitem_uom_id INTEGER;
ALTER TABLE bomitem ADD FOREIGN KEY (bomitem_uom_id) REFERENCES uom(uom_id);
UPDATE bomitem SET bomitem_uom_id=item_inv_uom_id FROM item WHERE bomitem_item_id=item_id;
ALTER TABLE bomitem ALTER COLUMN bomitem_uom_id SET NOT NULL;

--Revision Control Change
ALTER TABLE bomitem ADD COLUMN bomitem_rev_id INTEGER;

COMMIT;

