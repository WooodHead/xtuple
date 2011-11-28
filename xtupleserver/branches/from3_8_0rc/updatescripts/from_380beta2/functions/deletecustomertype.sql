
CREATE OR REPLACE FUNCTION deleteCustomerType(INTEGER) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pCusttypeid ALIAS FOR $1;

BEGIN

--  Check to see if any customers are assigned to the passed custype
  PERFORM cust_id
  FROM cust
  WHERE (cust_custtype_id=pCusttypeid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;

--  Delete all entries in referring tables
  DELETE FROM ipsass
  WHERE (ipsass_custtype_id=pCusttypeid);

  DELETE FROM salesaccnt
  WHERE (salesaccnt_custtype_id=pCusttypeid);

  DELETE FROM araccnt
  WHERE (araccnt_custtype_id=pCusttypeid);

  DELETE FROM custform
  WHERE (custform_custtype_id=pCusttypeid);

--  Delete the passed custtype
  DELETE FROM custtype
  WHERE (custtype_id=pCusttypeid);

  RETURN pCusttypeid;

END;
' LANGUAGE 'plpgsql';

