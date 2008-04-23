BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE tohead ALTER COLUMN tohead_number TYPE text;

COMMIT;