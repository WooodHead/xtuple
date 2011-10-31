BEGIN;

UPDATE addr SET addr_line1 = '' WHERE addr_line1 IS NULL;
UPDATE addr SET addr_line2 = '' WHERE addr_line2 IS NULL;
UPDATE addr SET addr_line3 = '' WHERE addr_line3 IS NULL;
UPDATE addr SET addr_city = '' WHERE addr_city IS NULL;
UPDATE addr SET addr_state = '' WHERE addr_state IS NULL;
UPDATE addr SET addr_postalcode = '' WHERE addr_postalcode IS NULL;
UPDATE addr SET addr_country = '' WHERE addr_country IS NULL;
UPDATE addr SET addr_notes = '' WHERE addr_notes IS NULL;

ALTER TABLE addr ALTER COLUMN addr_line1 SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_line2 SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_line3 SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_city SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_state SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_postalcode SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_country SET DEFAULT '';
ALTER TABLE addr ALTER COLUMN addr_notes SET DEFAULT '';

COMMIT;