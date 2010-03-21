BEGIN;

ALTER TABLE bomitem ADD COLUMN bomitem_notes text;

COMMIT;
