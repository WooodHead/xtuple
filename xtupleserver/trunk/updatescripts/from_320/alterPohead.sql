BEGIN;

DROP INDEX pohead_number_idx;
ALTER TABLE pohead ADD UNIQUE(pohead_number);

COMMIT;
