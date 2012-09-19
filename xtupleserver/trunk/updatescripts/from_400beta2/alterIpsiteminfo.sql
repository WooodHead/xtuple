ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_prodcat_id INTEGER;
ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_type CHAR(1);
ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_warehous_id INTEGER;
ALTER TABLE ipsiteminfo ALTER COLUMN ipsitem_qty_uom_id DROP NOT NULL;
ALTER TABLE ipsiteminfo ALTER COLUMN ipsitem_price_uom_id DROP NOT NULL;

COMMENT ON COLUMN ipsiteminfo.ipsitem_prodcat_id IS 'Product category for pricing schedule item.';
COMMENT ON COLUMN ipsiteminfo.ipsitem_type IS 'Pricing type for pricing schedule item.  Valid values are N-nominal, D-discount, and M-markup';
COMMENT ON COLUMN ipsiteminfo.ipsitem_warehous_id IS 'Site for pricing schedule item which enables pricing by site.';

ALTER TABLE ipsiteminfo DROP CONSTRAINT ipsitem_ipsitem_ipshead_id_key;
ALTER TABLE ipsiteminfo ADD CONSTRAINT ipsitem_ipsitem_ipshead_id_key UNIQUE
  (ipsitem_ipshead_id, ipsitem_item_id, ipsitem_prodcat_id,
   ipsitem_qtybreak, ipsitem_qty_uom_id, ipsitem_price_uom_id);

ALTER TABLE ipsiteminfo
  ADD CONSTRAINT ipsitem_ipsitem_warehous_id_fkey FOREIGN KEY (ipsitem_warehous_id)
      REFERENCES whsinfo (warehous_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION;

UPDATE ipsiteminfo SET ipsitem_type=CASE WHEN ((COALESCE(ipsitem_discntprcnt, 0.0)=0.0)
                                           AND (COALESCE(ipsitem_fixedamtdiscount, 0.0)=0.0))
                                         THEN 'N' ELSE 'D' END; 

INSERT INTO ipsiteminfo
  (ipsitem_ipshead_id, ipsitem_prodcat_id,
   ipsitem_qtybreak, ipsitem_price,
   ipsitem_qty_uom_id, ipsitem_price_uom_id,
   ipsitem_discntprcnt, ipsitem_fixedamtdiscount,
   ipsitem_type)
SELECT
   ipsprodcat_ipshead_id, ipsprodcat_prodcat_id,
   ipsprodcat_qtybreak, NULL,
   NULL, NULL,
   ipsprodcat_discntprcnt, ipsprodcat_fixedamtdiscount,
   'D'
FROM ipsprodcat;

ALTER TABLE ipsprodcat RENAME TO ipsprodcat_bak;

ALTER TABLE ipsiteminfo ALTER COLUMN ipsitem_type SET NOT NULL;
ALTER TABLE ipsiteminfo ADD CONSTRAINT valid_ipsitem_type CHECK (ipsitem_type IN ('N', 'D', 'M'));

