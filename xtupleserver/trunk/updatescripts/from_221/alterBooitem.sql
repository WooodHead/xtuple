BEGIN;

ALTER TABLE booitem ADD COLUMN booitem_rev_id INTEGER;

COMMIT;