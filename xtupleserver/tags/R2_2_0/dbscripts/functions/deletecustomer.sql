
CREATE OR REPLACE FUNCTION deleteCustomer(INTEGER) RETURNS INTEGER AS '
DECLARE
  pCustid ALIAS FOR $1;

BEGIN

  PERFORM shipto_id
  FROM shipto
  WHERE (shipto_cust_id=pCustid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;

  PERFORM cohead_id
  FROM cohead
  WHERE (cohead_cust_id=pCustid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -2;
  END IF;

  PERFORM cmhead_id
  FROM cmhead
  WHERE (cmhead_cust_id=pCustid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -3;
  END IF;

  PERFORM cohist_id
  FROM cohist
  WHERE (cohist_cust_id=pCustid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -4;
  END IF;

  PERFORM aropen_id
  FROM aropen
  WHERE (aropen_cust_id=pCustid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -5;
  END IF;

  DELETE FROM taxreg
   WHERE ((taxreg_rel_type=''C'')
     AND  (taxreg_rel_id=pCustid));

  DELETE FROM ipsass
  WHERE (ipsass_cust_id=pCustid);

  DELETE FROM custinfo
  WHERE (cust_id=pCustid);

  UPDATE crmacct SET crmacct_cust_id = NULL
  WHERE (crmacct_cust_id=pCustid);

  RETURN 0;

END;
' LANGUAGE 'plpgsql';

