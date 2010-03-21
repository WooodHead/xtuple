BEGIN;

SELECT dropIfExists('VIEW', 'todo', 'api');

ALTER TABLE todoitem ADD COLUMN todoitem_username TEXT;
UPDATE todoitem SET todoitem_username = (SELECT usr_username FROM usr WHERE usr_id=todoitem_usr_id);
ALTER TABLE todoitem DROP COLUMN todoitem_usr_id;

COMMIT;

