BEGIN;

UPDATE itemsub SET itemsub_uomratio=1 WHERE (itemsub_uomratio IS NULL);
UPDATE itemsub SET itemsub_rank=1 WHERE (itemsub_rank IS NULL);

ALTER TABLE itemsub ADD FOREIGN KEY (itemsub_parent_item_id) REFERENCES item (item_id);
ALTER TABLE itemsub ADD FOREIGN KEY (itemsub_sub_item_id) REFERENCES item (item_id);
ALTER TABLE itemsub ADD UNIQUE (itemsub_parent_item_id, itemsub_sub_item_id);
ALTER TABLE itemsub ALTER COLUMN itemsub_uomratio SET NOT NULL;
ALTER TABLE itemsub ALTER COLUMN itemsub_rank SET NOT NULL;

COMMIT;