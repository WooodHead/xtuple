CREATE OR REPLACE FUNCTION returnItemShipments(INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN returnItemShipments(''SO'', $1, 0, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION returnItemShipments(INTEGER, INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN returnItemShipments(''SO'', $1, $2, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION returnItemShipments(TEXT, INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pordertype		ALIAS FOR $1;
  pitemid		ALIAS FOR $2;
  _itemlocSeries	INTEGER				:= $3;
  _timestamp		TIMESTAMP WITH TIME ZONE	:= $4;
  _qty NUMERIC;
  _invhistid INTEGER;

BEGIN

  SELECT COALESCE(SUM(shipitem_qty), 0) INTO _qty
  FROM shipitem, shiphead
  WHERE ((shipitem_shiphead_id=shiphead_id)
    AND  (NOT shiphead_shipped)
    AND  (shiphead_order_type=pordertype)
    AND  (shipitem_orderitem_id=pitemid) );

  IF (_qty <> 0) THEN
    IF (_itemlocSeries = 0) THEN
      _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
    END IF;

    IF (pordertype = ''SO'') THEN
      SELECT postInvTrans( itemsite_id, ''RS'', _qty * coitem_qty_invuomratio,
			  ''S/R'', pordertype, formatSoNumber(pitemid),
			  '''', ''Return from Shipping'',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp ) INTO _invhistid
      FROM coitem, itemsite, costcat
      WHERE ( (coitem_itemsite_id=itemsite_id)
       AND (itemsite_costcat_id=costcat_id)
       AND (coitem_id=pitemid) );

    ELSEIF (pordertype = ''TO'') THEN
      SELECT postInvTrans( itemsite_id, ''RS'', _qty,
			  ''S/R'', pordertype, tohead_number,
			  '''', ''Return from Shipping'',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp ) INTO _invhistid
      FROM toitem, tohead, itemsite, costcat
      WHERE ((toitem_item_id=itemsite_item_id)
        AND  (toitem_tohead_id=tohead_id)
	AND  (tohead_src_warehous_id=itemsite_warehous_id)
        AND  (itemsite_costcat_id=costcat_id)
        AND  (toitem_id=pitemid) );

    ELSE
      RETURN -11;
    END IF;

    UPDATE shiphead
    SET shiphead_sfstatus=''D''
    FROM shipitem
    WHERE ((shipitem_shiphead_id=shiphead_id)
      AND  (shiphead_sfstatus=''P'')
      AND  (shiphead_order_type=pordertype)
      AND  (shipitem_orderitem_id=pitemid) );

    DELETE FROM shipitem
    WHERE (shipitem_id IN ( SELECT shipitem_id
			    FROM shipitem, shiphead
			    WHERE ((shipitem_shiphead_id=shiphead_id)
			      AND  (NOT shiphead_shipped)
			      AND  (shiphead_order_type=pordertype)
			      AND  (shipitem_orderitem_id=pitemid)) ) );

    RETURN _itemlocSeries;
  ELSE
    RETURN 0;
  END IF;

END;
' LANGUAGE 'plpgsql';
