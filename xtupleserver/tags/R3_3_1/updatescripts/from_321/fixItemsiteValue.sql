
UPDATE itemsite
   SET itemsite_value = ((itemsite_qtyonhand + itemsite_nnqoh) * stdCost(itemsite_item_id))
 WHERE (itemsite_costmethod <> 'A');
