BEGIN;

--Remove invalid records
DELETE FROM bomhead WHERE bomhead_item_id NOT IN (
SELECT item_id FROM item WHERE (item_id=bomhead_item_id));

--Add constraint
ALTER TABLE bomhead ADD FOREIGN KEY (bomhead_item_id) REFERENCES item (item_id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE bomhead ALTER bomhead_item_id SET NOT NULL;

COMMIT;