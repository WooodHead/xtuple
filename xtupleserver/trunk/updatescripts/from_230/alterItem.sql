BEGIN;
-- Fill gaps if any
UPDATE item SET item_listprice = 0 WHERE (item_listprice IS NULL);
UPDATE item SET item_prodweight = 0 WHERE (item_prodweight IS NULL);
UPDATE item SET item_packweight = 0 WHERE (item_packweight IS NULL);

-- Add constraints
ALTER TABLE item ADD FOREIGN KEY (item_classcode_id) REFERENCES classcode (classcode_id);
ALTER TABLE item ADD FOREIGN KEY (item_inv_uom_id) REFERENCES uom (uom_id);
ALTER TABLE item ADD FOREIGN KEY (item_price_uom_id) REFERENCES uom (uom_id);
ALTER TABLE item ADD CHECK (item_type IN ('P','M','F','J','O','R','S','T','B','L','Y','C'));
ALTER TABLE item ADD CHECK (item_planning_type IN ('M','N','S'));
ALTER TABLE item ALTER COLUMN item_active SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_picklist SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_fractional SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_sold SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_exclusive SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_inv_uom_id SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_price_uom_id SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_listprice SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_prodweight SET NOT NULL;
ALTER TABLE item ALTER COLUMN item_packweight SET NOT NULL;

COMMIT;