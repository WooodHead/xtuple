--  All items must have an inventory UOM
SELECT COUNT(*)=0 FROM item WHERE (item_inv_uom_id IS NULL);
--  All items must have an Pricing UOM
SELECT COUNT(*)=0 FROM item WHERE (item_price_uom_id IS NULL);
--  All items must have a class code id
SELECT COUNT(*)=0 FROM item WHERE (item_classcode_id IS NULL);
--  All item class codes must be valid
SELECT COUNT(*)=0 FROM item WHERE (item_classcode_id NOT IN (
SELECT classcode_id FROM classcode WHERE (classcode_id=item_classcode_id)
));
--  All items must have a valid item type
SELECT COUNT(*)=0 FROM item WHERE (item_type NOT IN ('P','M','F','J','O','R','S','T','B','L','Y','C'));
--  All items must have a planning type
SELECT COUNT(*)=0 FROM item WHERE (item_planning_type NOT IN ('N','M','S'));


