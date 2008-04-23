BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE pohead ALTER COLUMN pohead_number TYPE text;

COMMIT;