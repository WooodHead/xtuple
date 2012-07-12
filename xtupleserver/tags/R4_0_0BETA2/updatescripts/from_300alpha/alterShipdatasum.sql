BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE shipdatasum ALTER COLUMN shipdatasum_cohead_number TYPE text;

COMMIT;
