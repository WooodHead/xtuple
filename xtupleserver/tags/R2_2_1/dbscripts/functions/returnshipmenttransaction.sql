CREATE OR REPLACE FUNCTION returnShipmentTransaction(INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN returnShipmentTransaction($1, 0, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION returnShipmentTransaction(INTEGER, INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN returnShipmentTransaction($1, $2, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION returnShipmentTransaction(INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pshipitemid		ALIAS FOR $1;
  _itemlocSeries	INTEGER			 := $2;
  _timestamp		TIMESTAMP WITH TIME ZONE := $3;
  _invhistid		INTEGER;
  _orderitemid		INTEGER;
  _ordertype		TEXT;
  _qty			NUMERIC;

BEGIN
  SELECT DISTINCT shiphead_order_type, shipitem_orderitem_id, shipitem_qty INTO
		_ordertype, _orderitemid, _qty
  FROM shiphead, shipitem
  WHERE ((shiphead_id=shipitem_shiphead_id)
    AND  (shipitem_id=pshipitemid));

  IF (_itemlocSeries = 0) THEN
    _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
  END IF;

  IF (_ordertype = ''SO'') THEN
    SELECT postInvTrans( itemsite_id, ''RS'', _qty,
			 ''S/R'', _ordertype, formatSoNumber(coitem_id), '''',
			 ''Return from Shipping'',
			 costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			 _itemlocSeries, _timestamp ) INTO _invhistid
    FROM coitem, itemsite, costcat
    WHERE ((_orderitemid=coitem_id)
      AND  (coitem_itemsite_id=itemsite_id)
      AND  (itemsite_costcat_id=costcat_id));

  ELSEIF (_ordertype = ''TO'') THEN
    SELECT postInvTrans( itemsite_id, ''RS'', _qty,
			''S/R'', _ordertype, tohead_number, '''',
			''Return from Shipping'',
			costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			_itemlocSeries, _timestamp ) INTO _invhistid
    FROM toitem, tohead, itemsite, costcat
    WHERE ((toitem_item_id=itemsite_item_id)
      AND  (toitem_tohead_id=tohead_id)
      AND  (tohead_src_warehous_id=itemsite_warehous_id)
      AND  (itemsite_costcat_id=costcat_id)
      AND  (toitem_id=_orderitemid) );

  END IF;

  UPDATE shiphead
  SET shiphead_sfstatus=''D''
  FROM shipitem
  WHERE ( (shipitem_shiphead_id=shiphead_id)
   AND (shiphead_sfstatus=''P'')
   AND (shipitem_id=pshipitemid) );

  DELETE FROM shipitem
  WHERE (shipitem_id=pshipitemid);

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
