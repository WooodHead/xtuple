BEGIN;

ALTER TABLE custinfo ADD COLUMN cust_gracedays INTEGER;

COMMIT;

