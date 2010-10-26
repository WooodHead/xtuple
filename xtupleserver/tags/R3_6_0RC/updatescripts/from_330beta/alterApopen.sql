BEGIN;

ALTER TABLE apopen ADD COLUMN apopen_discountable_amount NUMERIC(12,2);
UPDATE apopen SET apopen_discountable_amount=apopen_amount;

COMMIT;