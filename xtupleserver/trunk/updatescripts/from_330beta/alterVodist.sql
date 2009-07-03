BEGIN;

ALTER TABLE vodist ADD COLUMN vodist_discountable BOOLEAN;
UPDATE vodist SET vodist_discountable=true;
ALTER TABLE vodist ALTER COLUMN vodist_discountable SET NOT NULL;
ALTER TABLE vodist ALTER COLUMN vodist_discountable SET DEFAULT true;

COMMIT;