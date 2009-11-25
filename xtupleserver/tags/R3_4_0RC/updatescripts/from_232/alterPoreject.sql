BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE poreject ALTER COLUMN poreject_ponumber TYPE text;

COMMIT;
