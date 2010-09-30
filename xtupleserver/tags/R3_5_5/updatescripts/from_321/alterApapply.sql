BEGIN;

ALTER TABLE apapply ADD COLUMN apapply_checkhead_id integer REFERENCES checkhead (checkhead_id);
UPDATE apapply SET 
  apapply_checkhead_id = apapply_source_apopen_id,
  apapply_source_apopen_id = -1
WHERE ((apapply_source_doctype = 'K')
AND (COALESCE(apapply_source_apopen_id,-1) > 0));

COMMIT;