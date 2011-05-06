BEGIN;

ALTER TABLE prjtaskuser ADD COLUMN prjtaskuser_username TEXT;
UPDATE prjtaskuser SET prjtaskuser_username = (SELECT usr_username FROM usr WHERE usr_id=prjtaskuser_usr_id);
ALTER TABLE prjtaskuser DROP COLUMN prjtaskuser_usr_id;

COMMIT;

