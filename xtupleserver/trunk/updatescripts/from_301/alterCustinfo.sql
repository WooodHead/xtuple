BEGIN;

ALTER TABLE custinfo ADD UNIQUE (cust_number);

COMMIT;