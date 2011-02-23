SELECT dropIfExists('view', 'billingEditList');

CREATE VIEW billingEditList AS
SELECT cohead_id AS orderid, -2 AS itemid,
       CASE WHEN (formatInvcNumber(cobmisc_id) <> '') THEN ('Invc-' || formatInvcNumber(cobmisc_id))
            ELSE '?'
       END AS documentnumber,
       cust_number, cohead_billtoname AS billtoname,
       cohead_number::TEXT AS ordernumber, -1 AS linenumber,
       '' AS item, '' AS itemdescrip, '' AS iteminvuom,
       CAST(NULL AS NUMERIC) AS qtytobill, '' AS f_qtytobill,
       CAST(NULL AS NUMERIC) AS price, '' AS f_price,
       SUM(round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio),2)) +
                       cobmisc_freight + cobmisc_misc + cobmisc_tax AS extprice,
       formatMoney( SUM(round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio),2)) +
                       cobmisc_freight + cobmisc_misc + cobmisc_tax ) AS f_extprice,
       'Debit' AS sence,
       COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                   FROM accnt
                   WHERE (accnt_id=findARAccount(cust_id)) ), 'Not Assigned') AS account,
       cobmisc_curr_id AS curr_id
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
         cobmisc_freight, cobmisc_misc, cobmisc_tax, cobmisc_curr_id

UNION SELECT cohead_id AS orderid, -1 AS itemid,
             '' AS documentnumber,
             '' AS cust_number, '' AS billtoname,
             cohead_number::TEXT AS ordernumber, -1 AS linenumber,
             'Freight' AS item, 'Freight Charge' AS itemdescrip, '' AS iteminvuom,
             NULL AS qtytobill, '' AS f_qtytobill,
             cobmisc_freight AS price, formatMoney(cobmisc_freight) AS f_price,
             cobmisc_freight AS extprice, formatMoney(cobmisc_freight) AS f_extprice,
             'Credit' AS sence,
             COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                         FROM accnt
                         WHERE (accnt_id=findFreightAccount(cohead_cust_id)) ), 'Not Assigned' ) AS account,
             cobmisc_curr_id AS curr_id
FROM cobmisc, cohead
WHERE ( (cobmisc_cohead_id=cohead_id)
 AND (NOT cobmisc_posted)
 AND (cobmisc_freight <> 0) )

UNION SELECT cohead_id AS orderid, -1 AS itemid,
             '' AS documentnumber,
             '' AS cust_number, '' AS billtoname,
             cohead_number::TEXT AS ordernumber, -1 AS linenumber,
             'Misc. Charge' AS item, cohead_misc_descrip AS itemdescrip, '' AS iteminvuom,
             NULL AS qtytobill, '' AS f_qtytobill,
             cobmisc_misc AS price, formatMoney(cobmisc_misc) AS f_price,
             cobmisc_misc AS extprice, formatMoney(cobmisc_misc) AS f_extprice,
             'Credit' AS sence,
             formatGLAccountLong(cobmisc_misc_accnt_id) AS account,
             cobmisc_curr_id AS curr_id
FROM cobmisc, cohead
WHERE ( (cobmisc_cohead_id=cohead_id)
 AND (NOT cobmisc_posted)
 AND (cobmisc_misc <> 0) )

UNION SELECT cohead_id AS orderid, -1 AS itemid,
             '' AS documentnumber,
             '' AS cust_number, '' AS billtoname,
             cohead_number::TEXT AS ordernumber, -1 AS linenumber,
             'Sales Tax' AS item, tax_descrip AS itemdescrip, '' AS iteminvuom,
             NULL AS qtytobill, '' AS f_qtytobill,
             cobmisc_tax AS price, formatMoney(cobmisc_tax) AS f_price,
             cobmisc_tax AS extprice, formatMoney(cobmisc_tax) AS f_extprice,
             'Credit' AS sence,
             COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                         FROM accnt
                         WHERE (accnt_id=tax_sales_accnt_id) ), 'Not Assigned' ) AS account,
             cobmisc_tax_curr_id AS curr_id
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
             cobill_qty AS qtytobill, formatQty(cobill_qty) AS f_qtytobill,
             coitem_price AS price, formatPrice(coitem_price) AS f_price,
             round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio),2) AS extprice,
             formatMoney(round((cobill_qty * coitem_qty_invuomratio) * (coitem_price / coitem_price_invuomratio),2)) AS f_extprice,
             'Credit' AS sence,
             COALESCE( ( SELECT formatGLAccountLong(accnt_id)
                         FROM accnt, salesaccnt
                         WHERE ( (salesaccnt_sales_accnt_id=accnt_id)
                          AND (salesaccnt_id=findSalesAccnt(itemsite_id, cohead_cust_id)) ) ), 'Not Assigned') AS account,
             cobmisc_curr_id AS curr_id
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
GRANT ALL ON billingEditList TO GROUP openmfg;

