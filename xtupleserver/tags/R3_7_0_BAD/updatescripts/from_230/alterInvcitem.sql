BEGIN;

ALTER TABLE invcitem ADD COLUMN invcitem_coitem_id INTEGER;

COMMIT;

