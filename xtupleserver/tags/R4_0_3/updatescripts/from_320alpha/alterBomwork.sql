BEGIN;

ALTER TABLE bomwork ADD COLUMN bomwork_notes TEXT;
ALTER TABLE bomwork ADD COLUMN bomwork_ref TEXT;

COMMIT;