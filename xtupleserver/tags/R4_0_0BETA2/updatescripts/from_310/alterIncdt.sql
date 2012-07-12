BEGIN;

ALTER TABLE incdt ADD COLUMN incdt_owner_username text;

COMMIT;