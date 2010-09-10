BEGIN;

ALTER TABLE aropen DISABLE TRIGGER ALL;

--Populate historic close dates
UPDATE aropen SET aropen_closedate=(SELECT MAX(arapply_postdate) FROM arapply WHERE arapply_target_aropen_id=aropen_id)
WHERE ((NOT aropen_open)
AND (aropen_closedate IS NULL)
AND (aropen_doctype IN ('I','D')));

UPDATE aropen SET aropen_closedate=(SELECT MAX(arapply_postdate) FROM arapply WHERE arapply_source_aropen_id=aropen_id)
WHERE ((NOT aropen_open)
AND (aropen_closedate IS NULL)
AND (aropen_doctype IN ('C','R')));

ALTER TABLE aropen ENABLE TRIGGER ALL;

COMMIT;
