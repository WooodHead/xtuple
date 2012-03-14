BEGIN;

--Add close date so we can calculate aging in the past efficiently
ALTER TABLE apopen ADD COLUMN apopen_closedate date;

--Populate historic close dates
UPDATE apopen SET apopen_closedate=(SELECT MAX(apapply_postdate) FROM apapply WHERE apapply_target_apopen_id=apopen_id)
WHERE ((NOT apopen_open)
AND (apopen_doctype IN ('V','D')));

UPDATE apopen SET apopen_closedate=(SELECT MAX(apapply_postdate) FROM apapply WHERE apapply_source_apopen_id=apopen_id)
WHERE ((NOT apopen_open)
AND (apopen_doctype IN ('C')));

COMMIT;