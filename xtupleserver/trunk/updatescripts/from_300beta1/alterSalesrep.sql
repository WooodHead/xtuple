BEGIN;

ALTER TABLE salesrep ADD UNIQUE (salesrep_number);

COMMIT;
