BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE aropen ALTER COLUMN aropen_ordernumber TYPE text;

COMMIT;