BEGIN;

ALTER TABLE checkitem ADD COLUMN checkitem_curr_rate NUMERIC(11,6);
UPDATE checkitem SET
  checkitem_curr_rate = apopen_curr_rate / curr_rate
FROM apopen, curr_rate
WHERE ( (checkitem_apopen_id=apopen_id)
  AND (checkitem_curr_id = curr_rate.curr_id)
  AND (checkitem_docdate BETWEEN curr_effective AND curr_expires) );
--ALTER TABLE checkitem ALTER COLUMN checkitem_curr_rate SET NOT NULL;

COMMIT;