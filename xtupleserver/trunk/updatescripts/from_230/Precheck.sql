--  All items must have a number
SELECT COUNT(*)=0 FROM item WHERE (item_number IS NULL);
--  All items must have a status
SELECT COUNT(*)=0 FROM item WHERE (item_active IS NULL);
--  All items must have a type
SELECT COUNT(*)=0 FROM item WHERE (item_type IS NULL);
--  All items must have a picklist flag
SELECT COUNT(*)=0 FROM item WHERE (item_picklist IS NULL);
--  All items must have a fractional flag
SELECT COUNT(*)=0 FROM item WHERE (item_fractional IS NULL);
--  All items must have a sold flag
SELECT COUNT(*)=0 FROM item WHERE (item_sold IS NULL);
--  All items must have a exclusive flag
SELECT COUNT(*)=0 FROM item WHERE (item_exclusive IS NULL);
--  All items must have an inventory UOM
SELECT COUNT(*)=0 FROM item WHERE (item_inv_uom_id IS NULL);
--  All items must have a valid inventory UOM
SELECT COUNT(*)=0 FROM item WHERE (item_inv_uom_id NOT IN (
SELECT uom_id FROM uom WHERE (uom_id=item_inv_uom_id)
));
--  All items must have an Pricing UOM
SELECT COUNT(*)=0 FROM item WHERE (item_price_uom_id IS NULL);
--  All items must have a valid inventory UOM
SELECT COUNT(*)=0 FROM item WHERE (item_price_uom_id NOT IN (
SELECT uom_id FROM uom WHERE (uom_id=item_price_uom_id)
));
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
--  Sold items must have a product category
SELECT COUNT(*)=0 FROM item WHERE (item_sold AND (item_prodcat_id=-1 OR item_prodcat_id IS NULL));

--  All item sites must have an item number
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_item_id IS NULL);
--  All itemsite item numbers must be valid
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_item_id NOT IN (
SELECT item_id FROM item WHERE (item_id=itemsite_item_id)
));
--  All item sites must have a warehouse
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_warehous_id IS NULL);
--  All itemsite warehouses must be valid
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_warehous_id NOT IN (
SELECT warehous_id FROM whsinfo WHERE (warehous_id=itemsite_warehous_id)
));
--  All item sites must have an planner code
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_plancode_id IS NULL);
--  All itemsite planner codes must be valid
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_plancode_id NOT IN (
SELECT plancode_id FROM plancode WHERE (plancode_id=itemsite_plancode_id)
));
--  All item sites must have an cost category
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_costcat_id IS NULL);
--  All itemsite cost categories must be valid
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_costcat_id NOT IN (
SELECT costcat_id FROM costcat WHERE (costcat_id=itemsite_costcat_id)
));
--  All itemsites must have valid ABC codes
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_abcclass NOT IN ('A','B','C'));
--  All itemsites must have valid control methods
SELECT COUNT(*)=0 FROM itemsite WHERE (itemsite_controlmethod NOT IN ('N','R','S','L'));


