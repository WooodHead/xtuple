BEGIN;

ALTER TABLE arapply ADD COLUMN arapply_target_paid NUMERIC(20,2);
UPDATE arapply SET
  arapply_target_paid=currtocurr(arapply_curr_id,aropen_curr_id,arapply_applied,arapply_postdate)
FROM aropen
WHERE (arapply_target_aropen_id=aropen_id);

ALTER TABLE arapply ADD COLUMN arapply_reftype TEXT;
ALTER TABLE arapply ADD COLUMN arapply_ref_id INTEGER;

COMMIT;