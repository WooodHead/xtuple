BEGIN;

ALTER TABLE uom ADD COLUMN uom_item_weight BOOLEAN;
UPDATE uom SET uom_item_weight=FALSE;
ALTER TABLE uom ALTER uom_item_weight SET NOT NULL;
ALTER TABLE uom ALTER uom_item_weight SET DEFAULT FALSE;

COMMIT;