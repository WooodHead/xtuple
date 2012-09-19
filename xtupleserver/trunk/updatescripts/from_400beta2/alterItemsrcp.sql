ALTER TABLE itemsrcp ADD COLUMN itemsrcp_dropship BOOLEAN;
--null value in itemsrcp_warehous_id breaks unique constraint
--ALTER TABLE itemsrcp ADD COLUMN itemsrcp_warehous_id INTEGER REFERENCES whsinfo(warehous_id);
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_warehous_id INTEGER;
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_type CHAR(1);
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_discntprcnt NUMERIC(16,6);
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_fixedamtdiscount NUMERIC(16,6);

COMMENT ON COLUMN itemsrcp.itemsrcp_dropship IS 'Used to determine if item source price applies only to drop ship purchase orders.';
COMMENT ON COLUMN itemsrcp.itemsrcp_warehous_id IS 'Used to determine if item source price applies only to specific site on purchase orders.';
COMMENT ON COLUMN itemsrcp.itemsrcp_type IS 'Pricing type for item source price.  Valid values are N-nominal and D-discount.';
COMMENT ON COLUMN itemsrcp.itemsrcp_discntprcnt IS 'Discount percent for item source price.';
COMMENT ON COLUMN itemsrcp.itemsrcp_fixedamtdiscount IS 'Fixed amount discount for item source price.';

UPDATE itemsrcp SET itemsrcp_warehous_id=-1;
UPDATE itemsrcp SET itemsrcp_dropship=FALSE;
UPDATE itemsrcp SET itemsrcp_type='N';

ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_warehous_id SET NOT NULL;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_warehous_id SET DEFAULT -1;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_dropship SET NOT NULL;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_dropship SET DEFAULT FALSE;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_type SET NOT NULL;
ALTER TABLE itemsrcp ADD CONSTRAINT valid_itemsrcp_type CHECK (itemsrcp_type IN ('N', 'D'));
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_price DROP NOT NULL;

ALTER TABLE itemsrcp DROP CONSTRAINT itemsrcp_itemsrcp_itemsrc_id_key;
ALTER TABLE itemsrcp ADD CONSTRAINT itemsrcp_itemsrcp_itemsrc_id_key UNIQUE
  (itemsrcp_itemsrc_id, itemsrcp_warehous_id, itemsrcp_dropship, itemsrcp_qtybreak);
