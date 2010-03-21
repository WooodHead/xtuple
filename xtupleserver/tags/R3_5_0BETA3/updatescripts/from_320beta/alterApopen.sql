BEGIN;

UPDATE apopen SET apopen_closedate = (
  SELECT MAX(apapply_postdate)
  FROM apapply
  WHERE ( (apapply_source_apopen_id=apopen_id)
   OR (apapply_target_apopen_id=apopen_id) ) )
WHERE ( (NOT apopen_open)
  AND (apopen_paid > 0) );

COMMIT;