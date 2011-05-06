BEGIN;

ALTER TABLE quhead ADD COLUMN quhead_expire DATE;

COMMIT;

