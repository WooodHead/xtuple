BEGIN;

UPDATE itemsite SET itemsite_value = itemsite_qtyonhand * stdcost(itemsite_item_id) WHERE itemsite_costmethod='S';

COMMIT;