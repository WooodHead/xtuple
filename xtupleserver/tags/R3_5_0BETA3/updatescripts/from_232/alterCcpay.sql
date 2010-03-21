BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE ccpay ALTER COLUMN ccpay_order_number TYPE text;

COMMIT;
