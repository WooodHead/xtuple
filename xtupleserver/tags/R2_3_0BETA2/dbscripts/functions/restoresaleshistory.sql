CREATE OR REPLACE FUNCTION restoreSalesHistory(INTEGER) RETURNS INTEGER
    AS '
DECLARE
  pAsohistid ALIAS FOR $1;

BEGIN

  INSERT INTO cohist ( cohist_id, cohist_cust_id, cohist_itemsite_id,
                       cohist_shipdate, cohist_invcdate, cohist_duedate, cohist_promisedate,
                       cohist_ordernumber, cohist_invcnumber,
                       cohist_qtyshipped, cohist_unitprice, cohist_unitcost,
                       cohist_billtoname, cohist_billtoaddress1, cohist_billtoaddress2,
                       cohist_billtoaddress3, cohist_billtocity, cohist_billtostate, cohist_billtozip,
                       cohist_shiptoname, cohist_shiptoaddress1, cohist_shiptoaddress2,
                       cohist_shiptoaddress3, cohist_shiptocity, cohist_shiptostate, cohist_shiptozip,
                       cohist_shipto_id, cohist_shipvia, cohist_salesrep_id, cohist_tax_id,
                       cohist_misc_type, cohist_misc_descrip, cohist_misc_id,
                       cohist_commission, cohist_commissionpaid,
                       cohist_doctype, cohist_orderdate, cohist_imported,
		       cohist_ponumber, cohist_curr_id )
  SELECT asohist_id, asohist_cust_id, asohist_itemsite_id,
         asohist_shipdate, asohist_invcdate, asohist_duedate, asohist_promisedate,
         asohist_ordernumber::INTEGER, asohist_invcnumber::INTEGER,
         asohist_qtyshipped, asohist_unitprice, asohist_unitcost,
         asohist_billtoname, asohist_billtoaddress1, asohist_billtoaddress2,
         asohist_billtoaddress3, asohist_billtocity, asohist_billtostate, asohist_billtozip,
         asohist_shiptoname, asohist_shiptoaddress1, asohist_shiptoaddress2,
         asohist_shiptoaddress3, asohist_shiptocity, asohist_shiptostate, asohist_shiptozip,
         asohist_shipto_id, asohist_shipvia, asohist_salesrep_id, asohist_tax_id,
         asohist_misc_type, asohist_misc_descrip, asohist_misc_id,
         asohist_commission, asohist_commissionpaid,
         asohist_doctype, asohist_orderdate, asohist_imported,
	 asohist_ponumber, asohist_curr_id
  FROM asohist
  WHERE (asohist_id=pAsohistid);

  DELETE FROM asohist
  WHERE (asohist_id=pAsohistid);

  RETURN pAsohistid;

END;
'
    LANGUAGE plpgsql;
