CREATE OR REPLACE FUNCTION FetchDefaultFob(integer) RETURNS TEXT AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pWarehousId ALIAS FOR $1;
  _returnVal TEXT;
BEGIN
  SELECT warehous_fob INTO _returnVal
  FROM warehous
  WHERE (warehous_id=pWarehousId);
  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
