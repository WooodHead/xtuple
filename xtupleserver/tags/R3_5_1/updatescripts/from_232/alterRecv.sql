BEGIN;

-- Make the transition to pg 8.3 easier
SELECT dropIfExists('VIEW', 'porecv');
ALTER TABLE recv ALTER COLUMN recv_order_number TYPE text;

COMMIT;
