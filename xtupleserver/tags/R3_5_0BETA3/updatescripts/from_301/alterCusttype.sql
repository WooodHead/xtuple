BEGIN;

ALTER TABLE custtype ADD UNIQUE (custtype_code);
ALTER TABLE custtype ALTER COLUMN custtype_code SET NOT NULL;
UPDATE custtype SET custtype_descrip = '' WHERE custtype_descrip IS NULL;
ALTER TABLE custtype ALTER COLUMN custtype_descrip SET NOT NULL;

COMMIT;