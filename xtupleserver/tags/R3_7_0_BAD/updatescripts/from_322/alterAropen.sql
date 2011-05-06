BEGIN;

ALTER TABLE aropen DISABLE TRIGGER ALL;

ALTER TABLE aropen ADD COLUMN aropen_curr_rate NUMERIC(11,6);
UPDATE aropen SET
  aropen_curr_rate = curr_rate
FROM curr_rate
WHERE ( (aropen_curr_id = curr_rate.curr_id)
  AND (aropen_docdate BETWEEN curr_effective AND curr_expires) );
ALTER TABLE aropen ALTER COLUMN aropen_curr_rate SET NOT NULL;

ALTER TABLE aropen ENABLE TRIGGER ALL;

COMMIT;
