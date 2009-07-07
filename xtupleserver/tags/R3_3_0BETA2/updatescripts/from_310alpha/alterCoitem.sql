BEGIN;

ALTER TABLE coitem ADD COLUMN coitem_subnumber integer;
ALTER TABLE coitem ALTER COLUMN coitem_subnumber SET DEFAULT 0;
UPDATE coitem SET coitem_subnumber=0 WHERE coitem_subnumber IS NULL;
ALTER TABLE coitem ALTER COLUMN coitem_subnumber SET NOT NULL;

ALTER TABLE coitem DROP CONSTRAINT coitem_coitem_cohead_id_key;
CREATE UNIQUE INDEX coitem_coitem_cohead_id_key ON coitem(coitem_cohead_id, coitem_linenumber, coitem_subnumber);

COMMIT;

