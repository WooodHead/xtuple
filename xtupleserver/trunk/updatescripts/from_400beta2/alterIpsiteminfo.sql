ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_prodcat_id INTEGER;
ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_type CHAR(1);
ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_warehous_id INTEGER;
ALTER TABLE ipsiteminfo ALTER COLUMN ipsitem_qty_uom_id DROP NOT NULL;
ALTER TABLE ipsiteminfo ALTER COLUMN ipsitem_price_uom_id DROP NOT NULL;

ALTER TABLE ipsiteminfo DROP CONSTRAINT ipsitem_ipsitem_ipshead_id_key;
CREATE UNIQUE INDEX ipsitem_ipsitem_ipshead_id_key ON ipsiteminfo USING btree
  (ipsitem_ipshead_id, ipsitem_item_id, ipsitem_prodcat_id,
   ipsitem_qtybreak, ipsitem_qty_uom_id, ipsitem_price_uom_id);

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
   ipsprodcat_qtybreak, 0.0,
   -1, -1,
   ipsprodcat_discntprcnt, ipsprodcat_fixedamtdiscount,
   'D'
FROM ipsprodcat;

ALTER TABLE ipsprodcat RENAME TO ipsprodcat_bak;

ALTER TABLE ipsiteminfo ALTER COLUMN ipsitem_type SET NOT NULL;
ALTER TABLE ipsiteminfo ADD CONSTRAINT valid_ipsitem_type CHECK (ipsitem_type IN ('N', 'D', 'M'));

