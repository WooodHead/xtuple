
SELECT dropIfExists('VIEW', 'ipsprice', 'public');
CREATE OR REPLACE VIEW ipsprice AS
  SELECT t.ipsitem_id AS ipsprice_id,
         'I' AS ipsprice_source,
         t.ipsitem_ipshead_id AS ipsprice_ipshead_id,
         t.ipsitem_item_id AS ipsprice_item_id,
         itemuomtouom(t.ipsitem_item_id, t.ipsitem_qty_uom_id, NULL, t.ipsitem_qtybreak) AS ipsprice_qtybreak,
         (v.ipsitem_price * itemuomtouomratio(t.ipsitem_item_id, NULL, t.ipsitem_price_uom_id)) * iteminvpricerat(t.ipsitem_item_id) AS ipsprice_price,
         t.ipsitem_qtybreak AS ipsprice_uomqtybreak,
         t.ipsitem_qty_uom_id AS ipsprice_uomqtybreak_uom_id,
         v.ipsitem_price AS ipsprice_uomprice,
         t.ipsitem_price_uom_id AS ipsprice_uomprice_uom_id,
         t.ipsitem_discntprcnt AS ipsprice_discountpercent,
         t.ipsitem_fixedamtdiscount AS ipsprice_discountfixed,
         t.ipsitem_type AS ipsprice_type
    FROM ipsitem t
      JOIN ipsitem v ON (v.ipsitem_id=t.ipsitem_id)
   UNION
  SELECT ipsprodcat_id AS ipsprice_id,
         'P' AS ipsprice_source,
         ipsprodcat_ipshead_id AS ipsprice_ipshead_id,
         item_id AS ipsprice_item_id,
         ipsprodcat_qtybreak AS ipsprice_qtybreak,
         CASE WHEN (ipsprodcat_type='D') THEN
              CAST((item_listprice - (item_listprice * ipsprodcat_discntprcnt) - ipsprodcat_fixedamtdiscount) AS NUMERIC(16,4))
              WHEN (ipsprodcat_type='M') THEN
              CAST((item_maxcost + (item_maxcost * ipsprodcat_discntprcnt) + ipsprodcat_fixedamtdiscount) AS NUMERIC(16,4))
         END AS ipsprice_price,
         ipsprodcat_qtybreak AS ipsprice_uomqtybreak,
         item_inv_uom_id AS ipsprice_uomqtybreak_uom_id,
         CASE WHEN (ipsprodcat_type='D') THEN
              CAST((item_listprice - (item_listprice * ipsprodcat_discntprcnt) - ipsprodcat_fixedamtdiscount) AS NUMERIC(16,4))
              WHEN (ipsprodcat_type='M') THEN
              CAST((item_maxcost + (item_maxcost * ipsprodcat_discntprcnt) + ipsprodcat_fixedamtdiscount) AS NUMERIC(16,4))
         END AS ipsprice_uomprice,
         item_price_uom_id AS ipsprice_uomprice_uom_id,
         ipsprodcat_discntprcnt AS ipsprice_discountpercent,
         ipsprodcat_fixedamtdiscount AS ipsprice_discountfixed,
         ipsprodcat_type AS ipsprice_type
    FROM ipsprodcat JOIN item ON (ipsprodcat_prodcat_id=item_prodcat_id);

REVOKE ALL ON TABLE ipsprice FROM PUBLIC;
GRANT ALL ON TABLE ipsprice TO GROUP xtrole;

