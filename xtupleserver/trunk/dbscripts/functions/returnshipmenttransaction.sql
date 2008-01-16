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

      IF (SELECT (item_type != ''J'')
          FROM coitem, itemsite, item
          WHERE ((coitem_id=_orderitemid)
          AND (coitem_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id))) THEN
    SELECT postInvTrans( itemsite_id, ''RS'', _qty * coitem_qty_invuomratio,
			 ''S/R'', _ordertype, formatSoNumber(coitem_id), '''',
			 ''Return from Shipping'',
			 costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			 _itemlocSeries, _timestamp ) INTO _invhistid
    FROM coitem, itemsite, costcat
    WHERE ((_orderitemid=coitem_id)
      AND  (coitem_itemsite_id=itemsite_id)
      AND  (itemsite_costcat_id=costcat_id));
      
      ELSE
        SELECT insertGLTransaction( ''S/R'', ''RS'', formatSoNumber(_orderitemid), ''Return from Shipping'',
                                     costcat_shipasset_accnt_id,
				     costcat_wip_accnt_id,
                                     -1, _value, current_date ) INTO _invhistid
        FROM coitem, itemsite, costcat
        WHERE ( (coitem_itemsite_id=itemsite_id)
         AND (itemsite_costcat_id=costcat_id)
         AND (coitem_id=pitemid) )
        GROUP BY costcat_shipasset_accnt_id,costcat_wip_accnt_id;


  --  Update the work order about what happened
        UPDATE wo SET 
          wo_qtyrcv = wo_qtyrcv - _qty * coitem_qty_invuomratio,
          wo_wipvalue = wo_wipvalue + _value,
          wo_status =''I''
        FROM coitem
        WHERE ((wo_ordtype = ''S'')
        AND (wo_ordid = _orderitemid)
        AND (coitem_id = _orderitemid));
      END IF;

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
