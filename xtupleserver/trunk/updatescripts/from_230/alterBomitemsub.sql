BEGIN;

--Remove invalid records
DELETE FROM bomitemsub WHERE bomitemsub_bomitem_id NOT IN (
SELECT bomitem_id FROM bomitem WHERE (bomitem_id=bomitemsub_bomitem_id));

--Add constraint
ALTER TABLE bomitemsub ADD FOREIGN KEY (bomitemsub_bomitem_id) REFERENCES bomitem (bomitem_id) ON UPDATE RESTRICT ON DELETE CASCADE;

COMMIT;