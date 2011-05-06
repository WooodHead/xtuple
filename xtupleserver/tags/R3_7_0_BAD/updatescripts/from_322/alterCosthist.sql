BEGIN;

ALTER TABLE costhist ADD COLUMN costhist_username TEXT;
UPDATE costhist SET costhist_username = (SELECT usename FROM pg_user WHERE usesysid=costhist_user_id);
ALTER TABLE costhist DROP COLUMN costhist_user_id;

COMMIT;

