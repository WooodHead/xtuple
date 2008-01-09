BEGIN;
-- Fill gaps if any
UPDATE itemsite SET itemsite_cyclecountfreq = 0 WHERE (itemsite_cyclecountfreq IS NULL);
UPDATE itemsite SET itemsite_supply = FALSE WHERE (itemsite_supply IS NULL);
UPDATE itemsite SET itemsite_loccntrl = FALSE WHERE (itemsite_loccntrl IS NULL);
UPDATE itemsite SET itemsite_leadtime = 0 WHERE (itemsite_leadtime IS NULL);
UPDATE itemsite SET itemsite_abcclass = 'A' WHERE (itemsite_abcclass IS NULL);
UPDATE itemsite SET itemsite_controlmethod = 'N' WHERE (itemsite_controlmethod IS NULL);
UPDATE itemsite SET itemsite_active = FALSE WHERE (itemsite_active IS NULL);
UPDATE itemsite SET itemsite_eventfence = 0 WHERE (itemsite_eventfence IS NULL);
UPDATE itemsite SET itemsite_sold = FALSE WHERE (itemsite_sold IS NULL);
UPDATE itemsite SET itemsite_stocked = FALSE WHERE (itemsite_stocked IS NULL);
UPDATE itemsite SET itemsite_location_id = -1 WHERE (itemsite_location_id IS NULL);
UPDATE itemsite SET itemsite_useparams = FALSE WHERE (itemsite_useparams IS NULL);
UPDATE itemsite SET itemsite_useparamsmanual = FALSE WHERE (itemsite_useparamsmanual IS NULL);
UPDATE itemsite SET itemsite_perishable = FALSE WHERE (itemsite_perishable IS NULL);
UPDATE itemsite SET itemsite_autoabcclass = FALSE WHERE (itemsite_autoabcclass IS NULL);

-- Add constraints
ALTER TABLE itemsite ADD FOREIGN KEY (itemsite_item_id) REFERENCES item (item_id);
ALTER TABLE itemsite ADD FOREIGN KEY (itemsite_warehous_id) REFERENCES whsinfo (warehous_id);
ALTER TABLE itemsite ADD FOREIGN KEY (itemsite_plancode_id) REFERENCES plancode (plancode_id);
ALTER TABLE itemsite ADD FOREIGN KEY (itemsite_costcat_id) REFERENCES costcat (costcat_id);
ALTER TABLE itemsite ALTER COLUMN itemsite_warehous_id SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_cyclecountfreq SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_supply SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_loccntrl SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_leadtime SET NOT NULL;
ALTER TABLE itemsite ADD CHECK (itemsite_abcclass IN ('A','B','C'));
ALTER TABLE itemsite ADD CHECK (itemsite_controlmethod IN ('N','R','S','L'));
ALTER TABLE itemsite ALTER COLUMN itemsite_active SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_plancode_id SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_costcat_id SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_eventfence SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_sold SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_stocked SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_location_id SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_useparams SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_useparamsmanual SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_perishable SET NOT NULL;
ALTER TABLE itemsite ALTER COLUMN itemsite_autoabcclass SET NOT NULL;

COMMIT;