BEGIN;

ALTER TABLE invchead DROP COLUMN invchead_tax_id;
ALTER TABLE invchead ADD COLUMN invchead_shipchrg_id integer;

COMMIT;
