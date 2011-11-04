
CREATE OR REPLACE FUNCTION deleteIpsItem(INTEGER) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pIpsItemId    ALIAS FOR $1;
BEGIN

  DELETE FROM ipsitem WHERE ipsitem_id=pIpsItemId;

  RETURN 1;
END;
$$ LANGUAGE 'plpgsql';

