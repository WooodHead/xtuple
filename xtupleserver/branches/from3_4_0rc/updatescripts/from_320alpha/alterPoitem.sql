BEGIN;

ALTER TABLE poitem ADD COLUMN poitem_manuf_name TEXT;
ALTER TABLE poitem ADD COLUMN poitem_manuf_item_number TEXT;
ALTER TABLE poitem ADD COLUMN poitem_manuf_item_descrip TEXT;

COMMIT;