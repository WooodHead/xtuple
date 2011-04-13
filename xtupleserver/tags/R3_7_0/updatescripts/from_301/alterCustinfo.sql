BEGIN;

ALTER TABLE custinfo ADD UNIQUE (cust_number);

ALTER TABLE custinfo ADD COLUMN cust_ediemailhtml BOOLEAN;
ALTER TABLE custinfo ALTER COLUMN cust_ediemailhtml SET DEFAULT FALSE;
UPDATE custinfo SET cust_ediemailhtml=false WHERE cust_ediemailhtml IS NULL;
ALTER TABLE custinfo ALTER COLUMN cust_ediemailhtml SET NOT NULL;

ALTER TABLE custinfo ADD COLUMN cust_soediemailhtml BOOLEAN;
ALTER TABLE custinfo ALTER COLUMN cust_soediemailhtml SET DEFAULT FALSE;
UPDATE custinfo SET cust_soediemailhtml=false WHERE cust_soediemailhtml IS NULL;
ALTER TABLE custinfo ALTER COLUMN cust_soediemailhtml SET NOT NULL;

COMMIT;
