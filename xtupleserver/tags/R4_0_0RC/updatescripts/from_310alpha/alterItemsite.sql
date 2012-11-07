BEGIN;

ALTER TABLE itemsite ALTER COLUMN itemsite_freeze SET DEFAULT false;
UPDATE itemsite SET itemsite_freeze=false WHERE itemsite_freeze IS NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_freeze SET NOT NULL;

UPDATE itemsite SET itemsite_controlmethod='N' FROM item WHERE itemsite_item_id=item_id AND item_type IN ('R','J');

COMMIT;
