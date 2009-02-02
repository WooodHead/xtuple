BEGIN;

SELECT dropIfExists('VIEW', 'employee', 'api');

ALTER TABLE emp ADD COLUMN emp_username TEXT;
UPDATE emp SET emp_username = (SELECT usr_username FROM usr WHERE usr_id=emp_usr_id);
ALTER TABLE emp DROP COLUMN emp_usr_id;

COMMIT;

