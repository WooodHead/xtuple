ALTER TABLE itemsrcp ADD COLUMN itemsrcp_dropship BOOLEAN;
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_warehous_id INTEGER REFERENCES whsinfo(warehous_id);
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_type CHAR(1);
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_discntprcnt NUMERIC(16,6);
ALTER TABLE itemsrcp ADD COLUMN itemsrcp_fixedamtdiscount NUMERIC(16,6);

UPDATE itemsrcp SET itemsrcp_dropship=FALSE;
UPDATE itemsrcp SET itemsrcp_type='N';

ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_dropship SET NOT NULL;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_dropship SET DEFAULT FALSE;
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_type SET NOT NULL;
ALTER TABLE itemsrcp ADD CONSTRAINT valid_itemsrcp_type CHECK (itemsrcp_type IN ('N', 'D'));
ALTER TABLE itemsrcp ALTER COLUMN itemsrcp_price DROP NOT NULL;