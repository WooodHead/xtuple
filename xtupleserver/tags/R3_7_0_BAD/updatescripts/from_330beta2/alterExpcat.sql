BEGIN;

ALTER TABLE expcat ADD UNIQUE (expcat_code);

COMMIT;