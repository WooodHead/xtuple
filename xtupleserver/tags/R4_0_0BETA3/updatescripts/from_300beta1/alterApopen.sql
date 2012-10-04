BEGIN;

ALTER TABLE apopen ADD COLUMN apopen_distdate DATE;
UPDATE apopen SET apopen_distdate = apopen_docdate;

COMMIT;
