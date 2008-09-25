BEGIN;

ALTER TABLE prj ADD COLUMN prj_owner_username text;

COMMIT;