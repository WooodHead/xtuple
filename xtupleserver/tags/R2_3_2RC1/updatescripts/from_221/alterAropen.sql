BEGIN;

--Add close date so we can calculate aging in the past efficiently
ALTER TABLE aropen ADD COLUMN aropen_closedate date;

--Populate historic close dates
UPDATE aropen SET aropen_closedate=(SELECT MAX(arapply_postdate) FROM arapply WHERE arapply_target_aropen_id=aropen_id)
WHERE ((NOT aropen_open)
AND (aropen_doctype IN ('I','D')));

UPDATE aropen SET aropen_closedate=(SELECT MAX(arapply_postdate) FROM arapply WHERE arapply_source_aropen_id=aropen_id)
WHERE ((NOT aropen_open)
AND (aropen_doctype IN ('C','R')));

COMMIT;