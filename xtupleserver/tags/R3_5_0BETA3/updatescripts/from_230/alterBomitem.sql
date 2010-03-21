BEGIN;

--Remove/update invalid records
DELETE FROM bomitem WHERE bomitem_parent_item_id NOT IN (
SELECT item_id FROM item WHERE (item_id=bomitem_parent_item_id));

DELETE FROM bomitem WHERE bomitem_item_id NOT IN (
SELECT item_id FROM item WHERE (item_id=bomitem_item_id));

UPDATE bomitem SET bomitem_effective = startoftime() WHERE bomitem_effective IS NULL;
UPDATE bomitem SET bomitem_expires = endoftime() WHERE bomitem_expires IS NULL;
UPDATE bomitem SET bomitem_createwo = FALSE WHERE bomitem_createwo IS NULL;
UPDATE bomitem SET bomitem_schedatwooper = FALSE WHERE bomitem_schedatwooper IS NULL;
UPDATE bomitem SET bomitem_issuemethod = 'M' WHERE bomitem_issuemethod IS NULL;
UPDATE bomitem SET bomitem_subtype = 'I' WHERE bomitem_subtype IS NULL;

--Add constraint
ALTER TABLE bomitem ADD FOREIGN KEY (bomitem_parent_item_id) REFERENCES item (item_id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE bomitem ADD FOREIGN KEY (bomitem_item_id) REFERENCES item (item_id);
ALTER TABLE bomitem ADD CHECK (bomitem_issuemethod IN ('M','S','L'));
ALTER TABLE bomitem ADD CHECK (bomitem_subtype IN ('N','I','B'));
ALTER TABLE bomitem ALTER bomitem_subtype SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_issuemethod SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_parent_item_id SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_item_id SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_effective SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_expires SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_createwo SET NOT NULL;
ALTER TABLE bomitem ALTER bomitem_schedatwooper SET NOT NULL;

COMMIT;