SELECT dropIfExists('VIEW', 'itemprices', 'public');

CREATE OR REPLACE VIEW itemprices AS 
 
-- ipsprodcat
SELECT
  CASE WHEN (COALESCE(ipsass_shipto_id, -1) > 0) THEN 1
       WHEN (COALESCE(LENGTH(ipsass_shipto_pattern), 0) > 0) THEN 2
       WHEN (COALESCE(ipsass_cust_id, -1) > 0) THEN 3
       WHEN (COALESCE(ipsass_custtype_id, -1) > 0) THEN 4
       WHEN (COALESCE(LENGTH(ipsass_custtype_pattern), 0) > 0) THEN 5
       ELSE 99
  END AS assignseq,
  ipsass_cust_id AS custid,
  ipsass_custtype_id AS custtypeid, 
  ipsass_custtype_pattern AS custtypepattern, 
  ipsass_shipto_id AS shiptoid,
  ipsass_shipto_pattern AS shiptopattern, 
  ipshead_effective AS effective,
  ipshead_expires AS expires,
  ipshead_curr_id AS currid,
  NULL AS itemid,
  ipsprodcat_prodcat_id AS prodcatid,
  ipsprodcat_qtybreak AS qtybreak,
  NULL AS qtyuomid,
  NULL AS priceuomid,
  ipsprodcat_warehous_id AS siteid,
  ipsprodcat_type AS pricetype,
  NULL AS price,
  ipsprodcat_discntprcnt AS percent,
  ipsprodcat_fixedamtdiscount AS fixedamt
FROM ipsass JOIN ipshead ON (ipshead_id=ipsass_ipshead_id)
            JOIN ipsprodcat ON (ipsprodcat_ipshead_id=ipshead_id)
 
-- ipsitem
UNION
SELECT
  CASE WHEN (COALESCE(ipsass_shipto_id, -1) > 0) THEN 1
       WHEN (COALESCE(LENGTH(ipsass_shipto_pattern), 0) > 0) THEN 2
       WHEN (COALESCE(ipsass_cust_id, -1) > 0) THEN 3
       WHEN (COALESCE(ipsass_custtype_id, -1) > 0) THEN 4
       WHEN (COALESCE(LENGTH(ipsass_custtype_pattern), 0) > 0) THEN 5
       ELSE 99
  END AS assignseq,
  ipsass_cust_id AS custid,
  ipsass_custtype_id AS custtypeid, 
  ipsass_custtype_pattern AS custtypepattern, 
  ipsass_shipto_id AS shiptoid,
  ipsass_shipto_pattern AS shiptopattern, 
  ipshead_effective AS effective,
  ipshead_expires AS expires,
  ipshead_curr_id AS currid,
  ipsitem_item_id AS itemid,
  NULL AS prodcatid,
  ipsitem_qtybreak AS qtybreak,
  ipsitem_qty_uom_id AS qtyuomid,
  ipsitem_price_uom_id AS priceuomid,
  ipsitem_warehous_id AS siteid,
  ipsitem_type AS pricetype,
  ipsitem_price AS price,
  ipsitem_discntprcnt AS percent,
  ipsitem_fixedamtdiscount AS fixedamt
FROM ipsass JOIN ipshead ON (ipshead_id=ipsass_ipshead_id)
            JOIN ipsiteminfo ON (ipsitem_ipshead_id=ipshead_id)
; 

REVOKE ALL ON TABLE itemprices FROM PUBLIC;
GRANT ALL ON TABLE itemprices TO GROUP xtrole;

