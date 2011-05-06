BEGIN;

ALTER TABLE prjtask ADD COLUMN prjtask_username TEXT;
UPDATE prjtask SET prjtask_username = (SELECT usr_username FROM usr WHERE usr_id=prjtask_usr_id);
ALTER TABLE prjtask DROP COLUMN prjtask_usr_id;

COMMIT;

