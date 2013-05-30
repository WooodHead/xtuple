SELECT dropIfExists('view', 'saleshistory');
CREATE VIEW saleshistory AS
SELECT cohist.*,
       CASE WHEN (cohist_invcnumber='-1') THEN 'Credit'
            ELSE cohist_invcnumber
       END AS invoicenumber,
       cust_number, cust_name, cust_curr_id, cust_custtype_id, custtype_code,
       salesrep_number, salesrep_name,
       itemsite_warehous_id, itemsite_item_id,
       item_number, item_descrip1, (item_descrip1 || ' ' || item_descrip2) AS itemdescription,
       item_prodcat_id, warehous_code,
       currtobase(cohist_curr_id, cohist_unitprice, cohist_invcdate) AS baseunitprice,
       currtocurr(cohist_curr_id, cust_curr_id, cohist_unitprice, cohist_invcdate) AS custunitprice,
       round((cohist_qtyshipped * cohist_unitprice), 2) AS extprice,
       round((cohist_qtyshipped * currtobase(cohist_curr_id, cohist_unitprice, cohist_invcdate)), 2) AS baseextprice,
       round((cohist_qtyshipped * currtocurr(cohist_curr_id, cust_curr_id, cohist_unitprice, cohist_invcdate)), 2) AS custextprice,
       round((cohist_qtyshipped * cohist_unitcost), 4) AS extcost
FROM cohist JOIN cust ON (cust_id=cohist_cust_id)
            JOIN custtype ON (custtype_id=cust_custtype_id)
            JOIN salesrep ON (salesrep_id=cohist_salesrep_id)
            JOIN itemsite ON (itemsite_id=cohist_itemsite_id)
            JOIN site() ON (warehous_id=itemsite_warehous_id)
            JOIN item ON (item_id=itemsite_item_id);

REVOKE ALL ON TABLE saleshistory FROM PUBLIC;
GRANT  ALL ON TABLE saleshistory TO GROUP openmfg;

COMMENT ON VIEW saleshistory IS 'Single point of sales history calculations.';
