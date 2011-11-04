CREATE OR REPLACE FUNCTION updatePrice(INTEGER, NUMERIC) RETURNS NUMERIC AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pIpsitemid ALIAS FOR $1;
  pUpdateBy ALIAS FOR $2;

BEGIN

  RETURN updatePrice(pIpsitemid, ''P'', pUpdateBy);
  
END;

' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION updatePrice(INTEGER, CHAR, NUMERIC) RETURNS NUMERIC AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pIpsitemid ALIAS FOR $1;
  pUpdateType ALIAS FOR $2;
  pUpdateBy ALIAS FOR $3;

BEGIN

  IF (pUpdateType IN(''V'')) THEN
    UPDATE ipsitem
    SET ipsitem_price = (ipsitem_price + pUpdateBy)
    WHERE (ipsitem_id=pIpsitemid);
    RETURN 1;
  ELSE
    UPDATE ipsitem
    SET ipsitem_price = (ipsitem_price * pUpdateBy)
    WHERE (ipsitem_id=pIpsitemid);
    RETURN 1;
  END IF;

END;
' LANGUAGE 'plpgsql';
