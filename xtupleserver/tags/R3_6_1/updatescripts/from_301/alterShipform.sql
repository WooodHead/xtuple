BEGIN;

ALTER TABLE shipform ADD UNIQUE (shipform_name);
ALTER TABLE shipform ALTER COLUMN shipform_name SET NOT NULL;

COMMIT;