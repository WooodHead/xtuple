BEGIN;

-- Add constraints
ALTER TABLE itemtax ADD FOREIGN KEY (itemtax_item_id) REFERENCES item (item_id);

COMMIT;