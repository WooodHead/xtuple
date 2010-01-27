BEGIN;

ALTER TABLE workglhead ADD COLUMN workglhead_username TEXT;
ALTER TABLE workglhead ALTER COLUMN workglhead_username SET DEFAULT CURRENT_USER;
UPDATE workglhead SET workglhead_username = COALESCE((SELECT usr_username FROM usr WHERE usr_id=workglhead_usr_id), 'unknown');
ALTER TABLE workglhead ALTER COLUMN workglhead_username SET NOT NULL;
ALTER TABLE workglhead DROP COLUMN workglhead_usr_id;

COMMIT;

