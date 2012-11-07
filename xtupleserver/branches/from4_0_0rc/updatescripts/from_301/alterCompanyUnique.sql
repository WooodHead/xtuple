BEGIN;
ALTER TABLE company ADD UNIQUE (company_number);
COMMIT;
