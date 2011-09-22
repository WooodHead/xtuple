BEGIN;

ALTER TABLE apapply ADD COLUMN apapply_target_paid NUMERIC(20,2);
UPDATE apapply SET
  apapply_target_paid=currtocurr(apapply_curr_id,apopen_curr_id,apapply_amount,apapply_postdate)
FROM apopen
WHERE (apapply_target_apopen_id=apopen_id);

COMMIT;