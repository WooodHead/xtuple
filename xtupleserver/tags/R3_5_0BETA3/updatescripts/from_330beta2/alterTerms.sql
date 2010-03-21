BEGIN;

ALTER TABLE terms ADD UNIQUE (terms_code);

COMMIT;