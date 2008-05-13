BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE invchead ALTER COLUMN invchead_invcnumber TYPE text;
ALTER TABLE invchead ALTER COLUMN invchead_ordernumber TYPE text;

ALTER TABLE invchead ADD CONSTRAINT invchead_invcnumber_unique UNIQUE (invchead_invcnumber);

COMMIT;
