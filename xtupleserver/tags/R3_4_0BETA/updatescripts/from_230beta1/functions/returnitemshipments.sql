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
  _value NUMERIC;
  _invhistid INTEGER;
  _itemtype CHAR(1);

BEGIN

  SELECT COALESCE(SUM(shipitem_qty), 0),COALESCE(SUM(shipitem_value),0) INTO _qty, _value
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
      IF (SELECT (item_type != ''J'')
          FROM coitem, itemsite, item
          WHERE ((coitem_id=pItemid)
          AND (coitem_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id))) THEN
        SELECT postInvTrans( itemsite_id, ''RS'', _qty * coitem_qty_invuomratio,
			  ''S/R'', pordertype, formatSoNumber(pitemid),
			  '''', ''Return from Shipping'',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp ) INTO _invhistid
        FROM coitem, itemsite, costcat
        WHERE ( (coitem_itemsite_id=itemsite_id)
         AND (itemsite_costcat_id=costcat_id)
         AND (coitem_id=pitemid) );
      
      ELSE
        SELECT insertGLTransaction( ''S/R'', ''RS'', formatSoNumber(pItemid), ''Return from Shipping'',
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
        AND (wo_ordid = pItemid)
        AND (coitem_id = pItemid));
      END IF;

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
