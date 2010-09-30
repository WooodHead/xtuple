BEGIN;

ALTER TABLE itemsite ADD COLUMN itemsite_supply_itemsite_id INTEGER;

ALTER TABLE itemsite ADD COLUMN itemsite_planning_type CHAR(1);
ALTER TABLE itemsite ALTER COLUMN itemsite_planning_type SET DEFAULT 'M'::bpchar;
UPDATE itemsite SET itemsite_planning_type=COALESCE((SELECT item_planning_type
                                                     FROM item
                                                     WHERE (item_id=itemsite_item_id)), 'M');
ALTER TABLE itemsite ALTER COLUMN itemsite_planning_type SET NOT NULL;

ALTER TABLE item DROP COLUMN item_planning_type CASCADE;

ALTER TABLE itemsite ADD COLUMN itemsite_wosupply BOOLEAN;
ALTER TABLE itemsite ALTER COLUMN itemsite_wosupply SET DEFAULT FALSE;
UPDATE itemsite SET itemsite_wosupply=COALESCE(itemsite_supply, FALSE);
ALTER TABLE itemsite ALTER COLUMN itemsite_wosupply SET NOT NULL;

ALTER TABLE itemsite ADD COLUMN itemsite_posupply BOOLEAN;
ALTER TABLE itemsite ALTER COLUMN itemsite_posupply SET DEFAULT FALSE;
UPDATE itemsite SET itemsite_posupply=COALESCE(itemsite_supply, FALSE);
ALTER TABLE itemsite ALTER COLUMN itemsite_posupply SET NOT NULL;

ALTER TABLE itemsite DROP COLUMN itemsite_supply CASCADE;

COMMIT;

