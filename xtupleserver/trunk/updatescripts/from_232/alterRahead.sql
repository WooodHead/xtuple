BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE rahead ALTER COLUMN rahead_number TYPE text;

COMMIT;