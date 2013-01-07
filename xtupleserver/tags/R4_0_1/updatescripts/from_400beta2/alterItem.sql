ALTER TABLE item ADD COLUMN item_listcost NUMERIC(16,6);
UPDATE item SET item_listcost=item_maxcost;
ALTER TABLE item ALTER COLUMN item_listcost SET DEFAULT 0.0;
ALTER TABLE item ALTER COLUMN item_listcost SET NOT NULL;

COMMENT ON COLUMN item.item_listcost IS 'List cost for item.  Basis for markup pricing.';
COMMENT ON COLUMN item.item_maxcost IS 'Maximum cost for item.  Used to constrain purchase order price.';
