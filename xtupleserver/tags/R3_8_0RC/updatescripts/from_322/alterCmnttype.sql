BEGIN;

ALTER TABLE cmnttype ADD COLUMN cmnttype_editable BOOLEAN;
ALTER TABLE cmnttype ALTER COLUMN cmnttype_editable SET DEFAULT FALSE;
UPDATE cmnttype SET cmnttype_editable=false WHERE cmnttype_editable IS NULL;
ALTER TABLE cmnttype ALTER COLUMN cmnttype_editable SET NOT NULL;

COMMIT;

