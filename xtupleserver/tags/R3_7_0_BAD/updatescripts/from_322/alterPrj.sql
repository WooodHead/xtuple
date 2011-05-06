BEGIN;

ALTER TABLE prj ADD COLUMN prj_username TEXT;
UPDATE prj SET prj_username = (SELECT usr_username FROM usr WHERE usr_id=prj_usr_id);
ALTER TABLE prj DROP COLUMN prj_usr_id;

COMMIT;

