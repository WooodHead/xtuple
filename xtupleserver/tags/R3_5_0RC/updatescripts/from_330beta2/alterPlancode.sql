BEGIN;

ALTER TABLE plancode ADD UNIQUE (plancode_code);

COMMIT;