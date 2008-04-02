BEGIN;

ALTER TABLE womatl ADD COLUMN womatl_uom_id INTEGER;
ALTER TABLE womatl ADD FOREIGN KEY (womatl_uom_id) REFERENCES uom(uom_id);
UPDATE womatl SET womatl_uom_id=item_inv_uom_id FROM item JOIN itemsite ON (itemsite_item_id=item_id) WHERE womatl_itemsite_id=itemsite_id;
ALTER TABLE womatl ALTER COLUMN womatl_uom_id SET NOT NULL;

COMMIT;

