BEGIN;

UPDATE prospect SET prospect_active = false WHERE prospect_active IS NULL;
UPDATE prospect SET prospect_created = startOfTime() WHERE prospect_created IS NULL;
UPDATE prospect SET prospect_taxauth_id = NULL
 WHERE prospect_id IN (SELECT prospect_id
                         FROM prospect LEFT OUTER JOIN taxauth
                           ON (prospect_taxauth_id=taxauth_id)
                        WHERE taxauth_id IS NULL);

ALTER TABLE prospect ADD COLUMN prospect_salesrep_id INTEGER;
ALTER TABLE prospect ALTER COLUMN prospect_created SET DEFAULT CURRENT_DATE;
ALTER TABLE prospect ALTER COLUMN prospect_created SET NOT NULL;
ALTER TABLE prospect ALTER COLUMN prospect_active SET NOT NULL;
ALTER TABLE prospect ALTER COLUMN prospect_number SET NOT NULL;
ALTER TABLE prospect ALTER COLUMN prospect_name SET NOT NULL;

ALTER TABLE prospect ADD FOREIGN KEY (prospect_taxauth_id)  REFERENCES taxauth(taxauth_id);
ALTER TABLE prospect ADD FOREIGN KEY (prospect_salesrep_id)  REFERENCES salesrep(salesrep_id);



COMMIT;

