
DROP VIEW billingEditList;
CREATE VIEW billingEditList AS
SELECT cohead_id AS orderid, -2 AS itemid,
       CASE WHEN (formatInvcNumber(cobmisc_id) <> '') THEN ('Invc-' || formatInvcNumber(cobmisc_id))
            ELSE '?'
       END AS documentnumber,
       cust_number, cohead_billtoname AS billtoname,
       cohead_number::TEXT AS ordernumber, -1 AS linenumber,
       '' AS item, '' AS itemdescrip, '' AS iteminvuom,
       '' AS qtytobill,
       '' AS price,
       formatMoney( SUM(round(cobill_qty * (coitem_price / coitem_price_invuomratio),2)) +
                       cobmisc_freight + cobmisc_misc + cobmisc_tax ) AS extprice,
       'Debit' AS sence,
       COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                   FROM accnt
                   WHERE (accnt_id=findARAccount(cust_id)) ), 'Not Assigned') AS account
FROM cohead, custinfo,
     cobmisc LEFT OUTER JOIN
      (cobill JOIN
       (coitem JOIN
        (itemsite JOIN item
         ON (itemsite_item_id=item_id) )
        ON (coitem_itemsite_id=itemsite_id) )
       ON (cobill_coitem_id=coitem_id) )
      ON (cobill_cobmisc_id=cobmisc_id)
WHERE ( (cobmisc_cohead_id=cohead_id)
 AND (cohead_cust_id=cust_id)
 AND (NOT cobmisc_posted) )
GROUP BY cohead_id, cobmisc_id,
         cust_id, cust_number, cohead_billtoname, cohead_number,
         cobmisc_freight, cobmisc_misc, cobmisc_tax

UNION SELECT cohead_id AS orderid, -1 AS itemid,
             '' AS documentnumber,
             '' AS cust_number, '' AS billtoname,
             cohead_number::TEXT AS ordernumber, -1 AS linenumber,
             'Freight' AS item, 'Freight Charge' AS itemdescrip, '' AS iteminvuom,
             '' AS qtytobill,
             formatMoney(cobmisc_freight) AS price,
             formatMoney(cobmisc_freight) AS extprice,
             'Credit' AS sence,
             COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                         FROM accnt
                         WHERE (accnt_id=findFreightAccount(cohead_cust_id)) ), 'Not Assigned' ) AS account
FROM cobmisc, cohead
WHERE ( (cobmisc_cohead_id=cohead_id)
 AND (NOT cobmisc_posted)
 AND (cobmisc_freight <> 0) )

UNION SELECT cohead_id AS orderid, -1 AS itemid,
             '' AS documentnumber,
             '' AS cust_number, '' AS billtoname,
             cohead_number::TEXT AS ordernumber, -1 AS linenumber,
             'Misc. Charge' AS item, cohead_misc_descrip AS itemdescrip, '' AS iteminvuom,
             '' AS qtytobill,
             formatMoney(cobmisc_misc) AS price,
             formatMoney(cobmisc_misc) AS extprice,
             'Credit' AS sence,
             formatGLAccountLong(cobmisc_misc_accnt_id) AS account
FROM cobmisc, cohead
WHERE ( (cobmisc_cohead_id=cohead_id)
 AND (NOT cobmisc_posted)
 AND (cobmisc_misc <> 0) )

UNION SELECT cohead_id AS orderid, -1 AS itemid,
             '' AS documentnumber,
             '' AS cust_number, '' AS billtoname,
             cohead_number::TEXT AS ordernumber, -1 AS linenumber,
             'Sales Tax' AS item, tax_descrip AS itemdescrip, '' AS iteminvuom,
             '' AS qtytobill,
             formatMoney(cobmisc_tax) AS price,
             formatMoney(cobmisc_tax) AS extprice,
             'Credit' AS sence,
             COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                         FROM accnt
                         WHERE (accnt_id=tax_sales_accnt_id) ), 'Not Assigned' ) AS account
FROM cobmisc, cohead, tax
WHERE ( (cobmisc_cohead_id=cohead_id)
 AND (cohead_tax_id=tax_id)
 AND (NOT cobmisc_posted)
 AND (cobmisc_tax <> 0) )

UNION SELECT cohead_id AS orderid, coitem_id AS itemid,
             '' AS documentnumber,
             '' AS cust_number,
             '' AS billtoname,
             cohead_number::TEXT AS ordernumber, coitem_linenumber AS linenumber,
             item_number AS item, item_descrip1 AS itemdescrip, uom_name AS iteminvuom,
             formatQty(cobill_qty) AS qtytobill,
             formatPrice(coitem_price) AS price,
             formatMoney(round(cobill_qty * (coitem_price / coitem_price_invuomratio),2)) AS extprice,
             'Credit' AS sence,
             COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                         FROM accnt, salesaccnt
                         WHERE ( (salesaccnt_sales_accnt_id=accnt_id)
                          AND (salesaccnt_id=findSalesAccnt(itemsite_id, cohead_cust_id)) ) ), 'Not Assigned') AS account
FROM item, itemsite, cobmisc, cohead, cobill, coitem, uom
WHERE ( (coitem_itemsite_id=itemsite_id)
 AND (cobill_coitem_id=coitem_id)
 AND (cobill_cobmisc_id=cobmisc_id)
 AND (cobmisc_cohead_id=cohead_id)
 AND (itemsite_item_id=item_id)
 AND (item_inv_uom_id=uom_id)
 AND (cobill_cobmisc_id=cobmisc_id)
 AND (NOT cobmisc_posted) )

ORDER BY ordernumber, linenumber;

REVOKE ALL ON billingEditList FROM PUBLIC;
GRANT ALL ON billingEditList TO mfgadmin;
GRANT ALL ON billingEditList TO GROUP openmfg;

