BEGIN;

-- Delete any orphans
delete from vodist where vodist_id in (select vodist_id
                                       from vodist left outer join vohead on (vohead_id=vodist_vohead_id)
                                       where vohead_id is null);

ALTER TABLE vodist ADD COLUMN vodist_discountable BOOLEAN;
UPDATE vodist SET vodist_discountable=true;
ALTER TABLE vodist ALTER COLUMN vodist_discountable SET NOT NULL;
ALTER TABLE vodist ALTER COLUMN vodist_discountable SET DEFAULT true;

COMMIT;