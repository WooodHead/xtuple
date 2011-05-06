BEGIN;

-- Make the transition to pg 8.3 easier
ALTER TABLE checkitem ALTER COLUMN checkitem_cmnumber TYPE text;
ALTER TABLE checkitem ALTER COLUMN checkitem_ranumber TYPE text;

COMMIT;
