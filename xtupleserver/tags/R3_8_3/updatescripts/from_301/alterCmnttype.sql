BEGIN;

ALTER TABLE cmnttype ADD UNIQUE (cmnttype_name);
ALTER TABLE cmnttype ALTER COLUMN cmnttype_name SET NOT NULL;
UPDATE cmnttype SET cmnttype_descrip = '' WHERE cmnttype_descrip IS NULL;
ALTER TABLE cmnttype ALTER COLUMN cmnttype_descrip SET NOT NULL;

COMMIT;