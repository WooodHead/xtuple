BEGIN;

ALTER TABLE bankaccnt ADD UNIQUE (bankaccnt_name);

COMMIT;
