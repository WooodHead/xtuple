BEGIN;

ALTER TABLE invchead DROP COLUMN invchead_taxtype_id;
ALTER TABLE invchead ALTER COLUMN invchead_tax DROP NOT NULL;

COMMIT;