BEGIN;

ALTER TABLE invdetail ADD COLUMN invdetail_expiration DATE;

COMMIT;