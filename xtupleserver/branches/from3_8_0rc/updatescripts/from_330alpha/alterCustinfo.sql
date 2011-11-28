BEGIN;

ALTER TABLE custinfo ALTER COLUMN cust_emaildelivery SET DEFAULT false;
ALTER TABLE custinfo ALTER COLUMN cust_soemaildelivery SET DEFAULT false;

COMMIT;

