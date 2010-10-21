BEGIN;

-- Make the transition to pg 8.3 easier
DROP VIEW creditMemoEditList;
ALTER TABLE cmhead ALTER COLUMN cmhead_number TYPE text;
ALTER TABLE cmhead ALTER COLUMN cmhead_invcnumber TYPE text;

COMMIT;