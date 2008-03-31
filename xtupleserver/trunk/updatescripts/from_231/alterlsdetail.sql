BEGIN;

ALTER TABLE lsdetail ADD COLUMN lsdetail_qtytoassign numeric(18,6) DEFAULT 0;

COMMIT;