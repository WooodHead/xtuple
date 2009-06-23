BEGIN;

ALTER TABLE vendinfo ADD UNIQUE (vend_number);

COMMIT;