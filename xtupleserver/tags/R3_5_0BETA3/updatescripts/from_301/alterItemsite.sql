BEGIN;

ALTER TABLE itemsite ADD COLUMN itemsite_costmethod CHAR(1) CHECK (itemsite_costmethod IN ('N','A','S','J'));
ALTER TABLE itemsite ADD COLUMN itemsite_value numeric(12, 2);

UPDATE itemsite SET itemsite_value = COALESCE(itemsite_qtyonhand * stdcost(itemsite_item_id), 0);

UPDATE itemsite
   SET itemsite_costmethod=
       CASE WHEN(itemsite_controlmethod='N' OR item_type='R') THEN 'N'
            WHEN(item_type='J') THEN 'J'
            ELSE 'S'
       END
  FROM item
 WHERE(itemsite_item_id=item_id);

UPDATE itemsite SET itemsite_value=0 WHERE itemsite_costmethod='N';

ALTER TABLE itemsite ALTER COLUMN itemsite_costmethod SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_value SET NOT NULL;

COMMIT;
