BEGIN;

UPDATE bomitem SET bomitem_booitem_seq_id=bomitem_booitem_id;
ALTER TABLE bomitem DROP COLUMN bomitem_booitem_id;

COMMIT;
