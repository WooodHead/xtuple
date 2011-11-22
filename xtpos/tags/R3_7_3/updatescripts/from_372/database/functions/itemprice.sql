CREATE OR REPLACE FUNCTION xtpos.itemPrice(INTEGER, INTEGER, NUMERIC) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pItemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pQty ALIAS FOR $3;

BEGIN
  RETURN itemPrice(pItemid, pCustid, -1, pQty, baseCurrId(), CURRENT_DATE);
END;
$$ LANGUAGE 'plpgsql';
