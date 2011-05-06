BEGIN;

--Clear/correct bad data
DELETE FROM itemimage WHERE itemimage_image_id NOT IN (
SELECT image_id FROM image WHERE (image_id=itemimage_image_id));

DELETE FROM itemimage WHERE itemimage_item_id NOT IN (
SELECT item_id FROM item WHERE (item_id=itemimage_item_id));

--Add Constraints
ALTER TABLE itemimage ADD FOREIGN KEY (itemimage_item_id) REFERENCES item (item_id);
ALTER TABLE itemimage ADD FOREIGN KEY (itemimage_image_id) REFERENCES image (image_id);
ALTER TABLE itemimage ADD CHECK (itemimage_purpose IN ('I','E','M','P'));
ALTER TABLE itemimage ALTER itemimage_item_id SET NOT NULL;
ALTER TABLE itemimage ALTER itemimage_image_id SET NOT NULL;
ALTER TABLE itemimage ALTER itemimage_purpose SET NOT NULL;

COMMIT;