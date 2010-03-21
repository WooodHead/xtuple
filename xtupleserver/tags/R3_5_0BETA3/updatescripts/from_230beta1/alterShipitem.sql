BEGIN;

ALTER TABLE shipitem ADD COLUMN shipitem_value numeric(18,6);

COMMIT;