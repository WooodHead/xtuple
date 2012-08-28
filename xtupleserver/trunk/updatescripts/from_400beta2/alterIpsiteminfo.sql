ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_type CHAR(1);
ALTER TABLE ipsiteminfo ADD COLUMN ipsitem_warehous_id INTEGER;
UPDATE ipsiteminfo SET ipsitem_type=CASE WHEN ((COALESCE(ipsitem_discntprcnt, 0.0)=0.0)
                                           AND (COALESCE(ipsitem_fixedamtdiscount, 0.0)=0.0))
                                         THEN 'N' ELSE 'D' END; 
