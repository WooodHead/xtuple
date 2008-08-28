BEGIN;
ALTER TABLE subaccnt ADD UNIQUE (subaccnt_number);
COMMIT;
