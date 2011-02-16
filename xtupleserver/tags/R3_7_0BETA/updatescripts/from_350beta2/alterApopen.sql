ALTER TABLE apopen ALTER COLUMN apopen_discountable_amount SET DEFAULT 0;
UPDATE apopen SET apopen_discountable_amount = 0 WHERE apopen_discountable_amount IS NULL;