BEGIN;
ALTER TABLE company ADD company_external BOOLEAN NOT NULL DEFAULT 'false';
ALTER TABLE company ADD company_server   TEXT;
ALTER TABLE company ADD company_port     INTEGER;
ALTER TABLE company ADD company_database TEXT;
COMMIT;
