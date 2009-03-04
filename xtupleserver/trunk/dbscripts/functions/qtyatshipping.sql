CREATE OR REPLACE FUNCTION qtyAtShipping(INTEGER) RETURNS NUMERIC AS '
BEGIN
  RETURN qtyAtShipping(''SO'', $1);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION qtyAtShipping(TEXT, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pordertype	ALIAS FOR $1;
  plineitemid	ALIAS FOR $2;
  _qty NUMERIC;

BEGIN

  IF (pordertype NOT IN (''SO'', ''TO'')) THEN
    RAISE EXCEPTION ''% is not a valid order type'', pordertype;
  END IF;

  SELECT COALESCE(SUM(shipitem_qty), 0.0) INTO _qty
  FROM shipitem, shiphead
  WHERE ((shipitem_shiphead_id=shiphead_id)
    AND  (NOT shiphead_shipped)
    AND  (shiphead_order_type=pordertype)
    AND  (shipitem_orderitem_id=plineitemid) );

  RETURN _qty;

END;
' LANGUAGE 'plpgsql';
