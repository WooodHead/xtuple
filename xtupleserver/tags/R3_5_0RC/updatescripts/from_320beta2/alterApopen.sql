BEGIN;

ALTER TABLE apopen ADD COLUMN apopen_curr_rate NUMERIC(11,6);
UPDATE apopen SET
  apopen_curr_rate = curr_rate
FROM curr_rate
WHERE ( (apopen_curr_id = curr_rate.curr_id)
  AND (apopen_docdate BETWEEN curr_effective AND curr_expires) );
ALTER TABLE apopen ALTER COLUMN apopen_curr_rate SET NOT NULL;

COMMIT;