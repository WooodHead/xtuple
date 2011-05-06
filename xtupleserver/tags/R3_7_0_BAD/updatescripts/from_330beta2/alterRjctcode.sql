BEGIN;

ALTER TABLE rjctcode ADD UNIQUE (rjctcode_code);

COMMIT;