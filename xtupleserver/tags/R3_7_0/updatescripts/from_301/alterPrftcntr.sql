BEGIN;
ALTER TABLE prftcntr ADD UNIQUE (prftcntr_number);
COMMIT;
