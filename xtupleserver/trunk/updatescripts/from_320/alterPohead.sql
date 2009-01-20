BEGIN;

ALTER TABLE pohead ADD UNIQUE(pohead_number);
DROP INDEX IF EXISTS pohead_number_idx;

COMMIT;