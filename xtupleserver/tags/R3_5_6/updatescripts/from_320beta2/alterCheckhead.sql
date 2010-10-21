BEGIN;

ALTER TABLE checkhead ADD COLUMN checkhead_curr_rate NUMERIC(11,6);
UPDATE checkhead SET
  checkhead_curr_rate = curr_rate
FROM curr_rate
WHERE ( (checkhead_curr_id = curr_rate.curr_id)
  AND (checkhead_checkdate BETWEEN curr_effective AND curr_expires) );
ALTER TABLE checkhead ALTER COLUMN checkhead_curr_rate SET NOT NULL;

COMMIT;