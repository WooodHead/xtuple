BEGIN;

ALTER TABLE shiphead ADD UNIQUE (shiphead_number);

COMMIT;
