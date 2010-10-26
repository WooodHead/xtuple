BEGIN;

-- Make the transition to pg 8.3 easier
SELECT dropIfExists('VIEW', 'voucheringEditList');
ALTER TABLE vohead ALTER COLUMN vohead_number TYPE text;

COMMIT;
