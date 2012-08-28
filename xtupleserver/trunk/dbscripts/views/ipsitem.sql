-- SELECT dropIfExists('VIEW', 'pricingscheduleitem',     'api');
-- SELECT dropIfExists('VIEW', 'pricingscheduleitemchar', 'api');
-- SELECT dropIfExists('VIEW', 'ipsprice', 'public');

SELECT dropIfExists('VIEW', 'ipsitem', 'public');

CREATE OR REPLACE VIEW ipsitem AS
  SELECT ipsitem_id,
         ipsitem_ipshead_id,
         ipsitem_item_id,
         ipsitem_qtybreak,
         CASE WHEN (ipsitem_type='N') THEN ipsitem_price
              WHEN (ipsitem_type='D') THEN noNeg(CAST((item_listprice - (item_listprice * ipsitem_discntprcnt) - ipsitem_fixedamtdiscount) AS NUMERIC(16,4)))
              WHEN (ipsitem_type='M') THEN noNeg(CAST((item_maxcost + (item_maxcost * ipsitem_discntprcnt) + ipsitem_fixedamtdiscount) AS NUMERIC(16,4)))
         END AS ipsitem_price,
         ipsitem_qty_uom_id,
         ipsitem_price_uom_id,
         ipsitem_discntprcnt,
         ipsitem_fixedamtdiscount,
         ipsitem_type,
         ipsitem_warehous_id
    FROM ipsiteminfo
      JOIN item ON (ipsitem_item_id=item_id);

REVOKE ALL ON TABLE ipsitem FROM PUBLIC;
GRANT ALL ON TABLE ipsitem TO GROUP xtrole;

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO ipsitem DO INSTEAD

INSERT INTO ipsiteminfo (
  ipsitem_id,
  ipsitem_ipshead_id,
  ipsitem_item_id,
  ipsitem_qtybreak,
  ipsitem_price,
  ipsitem_qty_uom_id,
  ipsitem_price_uom_id,
  ipsitem_discntprcnt,
  ipsitem_fixedamtdiscount,
  ipsitem_type,
  ipsitem_warehous_id) 
  VALUES (
  new.ipsitem_id,
  new.ipsitem_ipshead_id,
  new.ipsitem_item_id,
  new.ipsitem_qtybreak,
  new.ipsitem_price,
  new.ipsitem_qty_uom_id,
  new.ipsitem_price_uom_id,
  new.ipsitem_discntprcnt,
  new.ipsitem_fixedamtdiscount,
  new.ipsitem_type,
  new.ipsitem_warehous_id );

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO ipsitem DO INSTEAD

UPDATE ipsiteminfo SET
  ipsitem_ipshead_id=new.ipsitem_ipshead_id,
  ipsitem_qtybreak=new.ipsitem_qtybreak,
  ipsitem_price=new.ipsitem_price,
  ipsitem_qty_uom_id=new.ipsitem_qty_uom_id,
  ipsitem_price_uom_id=new.ipsitem_price_uom_id,
  ipsitem_discntprcnt=new.ipsitem_discntprcnt,
  ipsitem_fixedamtdiscount=new.ipsitem_fixedamtdiscount,
  ipsitem_type=new.ipsitem_type,
  ipsitem_warehous_id=new.ipsitem_warehous_id
WHERE (ipsitem_id=old.ipsitem_id);

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO ipsitem DO INSTEAD

DELETE FROM ipsiteminfo WHERE (ipsitem_id=old.ipsitem_id);
