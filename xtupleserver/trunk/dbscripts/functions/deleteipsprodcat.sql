
CREATE OR REPLACE FUNCTION deleteIpsProdCat(INTEGER) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pIpsProdCatId	ALIAS FOR $1;
BEGIN

  DELETE FROM ipsprodcat WHERE ipsprodcat_id=pIpsProdCatId;
  
  RETURN 1;
END;
' LANGUAGE 'plpgsql';

