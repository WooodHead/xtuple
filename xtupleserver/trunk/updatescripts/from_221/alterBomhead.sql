BEGIN;

ALTER TABLE bomhead ADD COLUMN bomhead_rev_id INTEGER DEFAULT -1;

COMMIT;