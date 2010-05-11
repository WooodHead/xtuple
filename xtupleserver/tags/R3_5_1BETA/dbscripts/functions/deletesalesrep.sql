CREATE OR REPLACE FUNCTION deleteSalesRep(INTEGER) RETURNS INTEGER AS '
DECLARE
  pSalesrepid ALIAS FOR $1;

BEGIN

  IF (EXISTS(SELECT cust_id
             FROM custinfo
             WHERE (cust_salesrep_id=pSalesrepid))) THEN
    RETURN -1;
  END IF;

  IF (EXISTS(SELECT shipto_id
             FROM shipto
             WHERE (shipto_salesrep_id=pSalesrepid))) THEN
    RETURN -2;
  END IF;

  IF (EXISTS(SELECT aropen_id 
             FROM aropen 
             WHERE (aropen_salesrep_id=pSalesrepid) 

             UNION SELECT cohead_id 
             FROM cohead 
             WHERE (cohead_salesrep_id=pSalesrepid) 
 
             UNION SELECT cmhead_id 
             FROM cmhead 
             WHERE (cmhead_salesrep_id=pSalesrepid) 

             UNION SELECT cohist_id 
             FROM cohist 
             WHERE (cohist_salesrep_id=pSalesrepid))) THEN
    RETURN -3;
  END IF;

  DELETE FROM salesrep
  WHERE (salesrep_id=pSalesrepid);

  RETURN 0;

END;
' LANGUAGE plpgsql;
