BEGIN;

ALTER TABLE bomwork ADD COLUMN bomwork_bomitem_id INTEGER;
ALTER TABLE bomwork ADD COLUMN bomwork_ecn TEXT;

COMMIT;