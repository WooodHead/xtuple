BEGIN;

UPDATE prospect SET prospect_active = false WHERE prospect_active IS NULL;
UPDATE prospect SET prospect_created = startOfTime() WHERE prospect_created IS NULL;

ALTER TABLE prospect ADD COLUMN prospect_salesrep_id INTEGER;
ALTER TABLE prospect ALTER COLUMN prospect_created SET DEFAULT CURRENT_DATE;
ALTER TABLE prospect ALTER COLUMN prospect_created SET NOT NULL;
ALTER TABLE prospect ALTER COLUMN prospect_active SET NOT NULL;
ALTER TABLE prospect ALTER COLUMN prospect_number SET NOT NULL;
ALTER TABLE prospect ALTER COLUMN prospect_name SET NOT NULL;



COMMIT;

