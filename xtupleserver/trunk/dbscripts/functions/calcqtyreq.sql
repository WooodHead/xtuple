CREATE OR REPLACE FUNCTION calcQtyReq(INTEGER, INTEGER, NUMERIC, NUMERIC, NUMERIC) RETURNS NUMERIC AS $$
DECLARE
  pItemid ALIAS FOR $1;
  pUomid ALIAS FOR $2;
  pQtyord ALIAS FOR $3;
  pQtyper ALIAS FOR $4;
  pScrap ALIAS FOR $5;
  _qtyreq NUMERIC := 0;

BEGIN

  SELECT roundQty(itemuomfractionalbyuom(pItemid, pUomid),
                  (pQtyper * pQtyord * (1 + pScrap))) INTO _qtyreq;

  RETURN COALESCE(_qtyreq, 0);

END;
$$ LANGUAGE 'plpgsql';
