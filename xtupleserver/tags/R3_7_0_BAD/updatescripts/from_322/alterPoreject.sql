BEGIN;

ALTER TABLE poreject ADD COLUMN poreject_trans_username TEXT;
UPDATE poreject SET poreject_trans_username = (SELECT usr_username FROM usr WHERE usr_id=poreject_trans_usr_id);
ALTER TABLE poreject DROP COLUMN poreject_trans_usr_id;

COMMIT;

