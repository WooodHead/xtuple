BEGIN;

ALTER TABLE custtype ADD COLUMN custtype_char boolean DEFAULT false;
UPDATE custtype SET custtype_char = false;
ALTER TABLE custtype
   ALTER COLUMN custtype_char SET NOT NULL;

COMMIT;

