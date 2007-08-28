
DROP VIEW ipsprice;
CREATE OR REPLACE VIEW ipsprice AS
  SELECT ipsitem_id AS ipsprice_id,
         'I' AS ipsprice_source,
         ipsitem_ipshead_id AS ipsprice_ipshead_id,
         ipsitem_item_id AS ipsprice_item_id,
         ipsitem_qtybreak AS ipsprice_qtybreak,
         ipsitem_price AS ipsprice_price
    FROM ipsitem
   UNION
  SELECT ipsprodcat_id AS ipsprice_id,
         'P' AS ipsprice_source,
         ipsprodcat_ipshead_id AS ipsprice_ipshead_id,
         item_id AS ipsprice_item_id,
         ipsprodcat_qtybreak AS ipsprice_qtybreak,
         CAST((item_listprice - (item_listprice * ipsprodcat_discntprcnt)) AS NUMERIC(16,4)) AS ipsprice_price
    FROM ipsprodcat JOIN item ON (ipsprodcat_prodcat_id=item_prodcat_id);

REVOKE ALL ON TABLE ipsprice FROM PUBLIC;
GRANT ALL ON TABLE ipsprice TO mfgadmin;
GRANT ALL ON TABLE ipsprice TO GROUP openmfg;

