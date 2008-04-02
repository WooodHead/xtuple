CREATE OR REPLACE FUNCTION updatePrice(INTEGER, NUMERIC) RETURNS NUMERIC AS '
DECLARE
  pIpsitemid ALIAS FOR $1;
  pUpdateBy ALIAS FOR $2;

BEGIN

  UPDATE ipsitem
  SET ipsitem_price = (ipsitem_price * pUpdateBy)
  WHERE (ipsitem_id=pIpsitemid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';
