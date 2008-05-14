BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE invchead ALTER COLUMN invchead_invcnumber TYPE text;
ALTER TABLE invchead ALTER COLUMN invchead_ordernumber TYPE text;

ALTER TABLE invchead ADD CONSTRAINT invchead_invcnumber_unique UNIQUE (invchead_invcnumber);

ALTER TABLE invchead ADD COLUMN invchead_recurring BOOLEAN;
ALTER TABLE invchead ALTER COLUMN invchead_recurring SET DEFAULT false;
UPDATE invchead SET invchead_recurring=false WHERE invchead_recurring IS NULL;
ALTER TABLE invchead ALTER COLUMN invchead_recurring SET NOT NULL;

ALTER TABLE invchead ADD COLUMN invchead_recurring_interval INTEGER;
ALTER TABLE invchead ADD COLUMN invchead_recurring_type TEXT;
ALTER TABLE invchead ADD COLUMN invchead_recurring_until DATE;
ALTER TABLE invchead ADD COLUMN invchead_recurring_invchead_id INTEGER;

COMMIT;
