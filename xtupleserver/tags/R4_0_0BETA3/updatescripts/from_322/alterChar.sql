BEGIN;

ALTER TABLE char ADD COLUMN char_type CHAR(1);
UPDATE char SET char_type = 'T';
ALTER TABLE char ALTER COLUMN char_type SET NOT NULL;

COMMIT;

