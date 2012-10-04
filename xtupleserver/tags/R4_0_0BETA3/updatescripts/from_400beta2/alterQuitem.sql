ALTER TABLE quitem ADD COLUMN quitem_pricemode CHAR(1);

COMMENT ON COLUMN quitem.quitem_pricemode IS 'Pricing mode for quote item.  Valid values are D-discount, and M-markup';

UPDATE quitem SET quitem_pricemode='D';

ALTER TABLE quitem ALTER COLUMN quitem_pricemode SET NOT NULL;
ALTER TABLE quitem ALTER COLUMN quitem_pricemode SET DEFAULT 'D';
ALTER TABLE quitem ADD CONSTRAINT valid_quitem_pricemode CHECK (quitem_pricemode IN ('D', 'M'));

