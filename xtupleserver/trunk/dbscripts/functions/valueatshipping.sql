CREATE OR REPLACE FUNCTION valueAtShipping(INTEGER) RETURNS NUMERIC AS $$
BEGIN
  RETURN valueAtShipping('SO', $1);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION valueAtShipping(TEXT, INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pordertype	ALIAS FOR $1;
  plineitemid	ALIAS FOR $2;
  _qty NUMERIC;
  _cost NUMERIC;
  _value NUMERIC;

BEGIN

  IF (pordertype NOT IN ('SO', 'TO')) THEN
    RAISE EXCEPTION '% is not a valid order type', pordertype;
  END IF;

  SELECT COALESCE(SUM(shipitem_qty), 0.0) INTO _qty
  FROM shipitem, shiphead
  WHERE ((shipitem_shiphead_id=shiphead_id)
    AND  (NOT shipitem_shipped)
    AND  (shiphead_order_type=pordertype)
    AND  (shipitem_orderitem_id=plineitemid) );

  IF (pordertype = 'SO') THEN
    SELECT COALESCE(CASE WHEN (itemsite_costmethod = 'N') THEN 0
                         WHEN (itemsite_costmethod = 'S') THEN stdCost(itemsite_item_id)
                         ELSE avgCost(itemsite_item_id)
                    END, 0.0) INTO _cost
    FROM coitem JOIN itemsite ON (itemsite_id=coitem_itemsite_id)
    WHERE (coitem_id=plineitemid);
  ELSE
    SELECT COALESCE(CASE WHEN (itemsite_costmethod = 'N') THEN 0
                         WHEN (itemsite_costmethod = 'S') THEN stdCost(itemsite_item_id)
                         ELSE avgCost(itemsite_item_id)
                    END, 0.0) INTO _cost
    FROM toitem JOIN itemsite ON (itemsite_id=toitem_itemsite_id)
    WHERE (toitem_id=plineitemid);
  END IF;

  _value := _qty * _cost;

  RETURN _value;

END;
$$ LANGUAGE 'plpgsql';
