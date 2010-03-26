BEGIN;
-- Fill gaps if any
UPDATE item SET item_planning_type = 'N' WHERE (item_planning_type IS NULL);
UPDATE item SET item_descrip1 = '' WHERE (item_descrip1 IS NULL);
UPDATE item SET item_descrip2 = '' WHERE (item_descrip2 IS NULL);
UPDATE item SET item_listprice = 0 WHERE (item_listprice IS NULL);
UPDATE item SET item_prodweight = 0 WHERE (item_prodweight IS NULL);
UPDATE item SET item_packweight = 0 WHERE (item_packweight IS NULL);
UPDATE item SET item_maxcost = 0 WHERE (item_maxcost IS NULL);
UPDATE item SET item_prodcat_id = -1 WHERE (item_prodcat_id IS NULL);

-- Add constraints
ALTER TABLE item ADD FOREIGN KEY (item_classcode_id) REFERENCES classcode (classcode_id);
ALTER TABLE item ADD FOREIGN KEY (item_inv_uom_id) REFERENCES uom (uom_id);
ALTER TABLE item ADD FOREIGN KEY (item_price_uom_id) REFERENCES uom (uom_id);
ALTER TABLE item ADD CHECK (item_type IN ('P','M','F','J','O','R','S','T','B','L','Y','C'));
ALTER TABLE item ADD CHECK (item_planning_type IN ('M','N','S'));
ALTER TABLE item ADD CONSTRAINT item_sold_check CHECK (NOT (item_sold AND item_prodcat_id=-1));
ALTER TABLE item ALTER COLUMN item_number SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_active SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_picklist SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_fractional SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_sold SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_exclusive SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_inv_uom_id SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_price_uom_id SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_maxcost SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_listprice SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_prodweight SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_packweight SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_type SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_planning_type SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_descrip1 SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_descrip2 SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_prodcat_id SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_classcode_id SET NOT NULL;

COMMIT;