
CREATE OR REPLACE FUNCTION deleteShippingCharge(INTEGER) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pShipchrgid ALIAS FOR $1;

BEGIN

--  Check to see if the passed shipchrg is used as a default for any customers
  PERFORM cust_id
  FROM cust
  WHERE (cust_shipchrg_id=pShipchrgid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -1;
  END IF;

--  Delete the passed shipchrg
  DELETE FROM shipchrg
  WHERE (shipchrg_id=pShipchrgid);

  RETURN pShipchrgid;

END;
' LANGUAGE 'plpgsql';

