BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE cohist ALTER COLUMN cohist_ordernumber TYPE text;
ALTER TABLE cohist ALTER COLUMN cohist_invcnumber TYPE text;

COMMIT;