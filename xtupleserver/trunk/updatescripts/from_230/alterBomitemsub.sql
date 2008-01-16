BEGIN;

--Remove invalid records
DELETE FROM bomitemsub WHERE bomitemsub_bomitem_id NOT IN (
SELECT bomitem_id FROM bomitem WHERE (bomitem_id=bomitemsub_bomitem_id));

DELETE FROM bomitemsub WHERE bomitemsub_item_id NOT IN (
SELECT item_id FROM item WHERE (item_id=bomitemsub_item_id));

UPDATE bomitemsub SET bomitemsub_uomratio = 1 WHERE bomitemsub_uomratio IS NULL;
UPDATE bomitemsub SET bomitemsub_rank = 1 WHERE bomitemsub_rank IS NULL;

--Add constraints
ALTER TABLE bomitemsub ADD FOREIGN KEY (bomitemsub_bomitem_id) REFERENCES bomitem (bomitem_id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE bomitemsub ADD FOREIGN KEY (bomitemsub_item_id) REFERENCES item (item_id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE bomitemsub ALTER bomitemsub_bomitem_id SET NOT NULL;
ALTER TABLE bomitemsub ALTER bomitemsub_item_id SET NOT NULL;
ALTER TABLE bomitemsub ALTER bomitemsub_uomratio SET NOT NULL;
ALTER TABLE bomitemsub ALTER bomitemsub_rank SET NOT NULL;

COMMIT;