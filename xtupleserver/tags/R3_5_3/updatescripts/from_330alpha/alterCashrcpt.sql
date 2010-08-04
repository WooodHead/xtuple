BEGIN;

ALTER TABLE cashrcpt ADD COLUMN cashrcpt_applydate DATE;

COMMIT;

