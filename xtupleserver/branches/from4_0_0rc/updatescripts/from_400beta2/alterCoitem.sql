ALTER TABLE coitem ADD COLUMN coitem_pricemode CHAR(1);

COMMENT ON COLUMN coitem.coitem_pricemode IS 'Pricing mode for sales order item.  Valid values are D-discount, and M-markup';

UPDATE coitem SET coitem_pricemode='D';

ALTER TABLE coitem ALTER COLUMN coitem_pricemode SET NOT NULL;
ALTER TABLE coitem ALTER COLUMN coitem_pricemode SET DEFAULT 'D';
ALTER TABLE coitem ADD CONSTRAINT valid_coitem_pricemode CHECK (coitem_pricemode IN ('D', 'M'));

