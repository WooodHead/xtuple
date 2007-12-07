CREATE OR REPLACE FUNCTION sufficientInventoryToShipOrder(TEXT, INTEGER) RETURNS INTEGER AS '
DECLARE
  pordertype	ALIAS FOR $1;
  porderid	ALIAS FOR $2;
  _s		RECORD;
  _returnVal	INTEGER := 0;

BEGIN
  FOR _s IN SELECT shipitem_orderitem_id
	    FROM shipitem, shiphead
	    WHERE ((shipitem_shiphead_id=shiphead_id)
	      AND  (shiphead_order_id=porderid)
	      AND  (shiphead_order_type=pordertype)
	      AND  (NOT shiphead_shipped)) LOOP

    _returnVal := sufficientInventoryToShipItem(pordertype,
						_s.shipitem_orderitem_id);
    EXIT WHEN (_returnVal < 0);
  END LOOP;

  RAISE NOTICE ''%'', _returnVal;
  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
