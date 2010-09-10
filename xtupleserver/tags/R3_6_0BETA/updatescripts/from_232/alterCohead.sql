BEGIN;

-- Make the transition to pg 8.3 easier
DROP VIEW api.salesorder;
DROP VIEW api.salesline;
DROP VIEW api.saleslinechar;
DROP VIEW api.salesordercomment;
DROP VIEW api.saleslinecomment;
DROP VIEW orderhead;
DROP VIEW billingeditlist;
ALTER TABLE cohead ALTER COLUMN cohead_number TYPE text;

COMMIT;
