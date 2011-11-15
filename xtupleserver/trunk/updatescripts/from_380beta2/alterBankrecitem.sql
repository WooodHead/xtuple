BEGIN;

--Alter table
ALTER TABLE bankrecitem ADD COLUMN bankrecitem_amount NUMERIC;
COMMIT;