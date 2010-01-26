CREATE OR REPLACE FUNCTION returnShipmentTransaction(INTEGER) RETURNS INTEGER AS $$
BEGIN
  RETURN returnShipmentTransaction($1, 0, CURRENT_TIMESTAMP);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION returnShipmentTransaction(INTEGER, INTEGER) RETURNS INTEGER AS $$
BEGIN
  RETURN returnShipmentTransaction($1, $2, CURRENT_TIMESTAMP);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION returnShipmentTransaction(INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
DECLARE
  pshipitemid		ALIAS FOR $1;
  _itemlocSeries	INTEGER			 := $2;
  _timestamp		TIMESTAMP WITH TIME ZONE := $3;
  _invhistid INTEGER;
  _rows INTEGER;
  _r RECORD;

BEGIN

    IF (COALESCE(_itemlocSeries,0) = 0 ) THEN
      _itemlocSeries := NEXTVAL('itemloc_series_seq');
    END IF;
  
    -- Find the shipment transaction record
    SELECT shipitem_id, shipitem_qty, shipitem_invhist_id, shipitem_value,
      shipitem_orderitem_id,
      shiphead_order_id, shiphead_id, shiphead_order_type,
      itemsite_loccntrl, itemsite_costmethod, itemsite_controlmethod
      INTO _r
    FROM shipitem
      JOIN shiphead ON (shiphead_id=shipitem_shiphead_id)
      JOIN invhist ON (invhist_id=shipitem_invhist_id)
      JOIN itemsite ON (itemsite_id=invhist_itemsite_id)
    WHERE ((NOT shiphead_shipped)
      AND  (shipitem_id=pshipitemid));
      
    GET DIAGNOSTICS _rows = ROW_COUNT;
    
    IF (_rows > 0 ) THEN  
      IF (_r.shiphead_order_type = 'SO') THEN
        -- Handle inventory transaction
        SELECT postInvTrans( itemsite_id, 'RS', _r.shipitem_qty * coitem_qty_invuomratio,
        		  'S/R', _r.shiphead_order_type, formatSoNumber(_r.shipitem_orderitem_id),
			  shiphead_number, 'Return from Shipping',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp, _r.shipitem_value, _r.shipitem_invhist_id ) INTO _invhistid
        FROM coitem, itemsite, costcat, shiphead, shipitem
        WHERE ( (coitem_itemsite_id=itemsite_id)
         AND (itemsite_costcat_id=costcat_id)
         AND (coitem_id=_r.shipitem_orderitem_id)
         AND (shiphead_order_type=_r.shiphead_order_type)
         AND (shiphead_id=shipitem_shiphead_id)
         AND (shipitem_orderitem_id=_r.shipitem_orderitem_id) );   
 
        IF (_r.itemsite_costmethod = 'J') THEN   
          -- Reopen the work order
          UPDATE wo SET wo_status = 'I' WHERE ((wo_ordtype='S') AND (wo_ordid=_r.shipitem_orderitem_id));
          
          --  Job cost, so correct Production Posting referencing original receipt for reverse info.
          PERFORM correctProduction(wo_id, r.invhist_invqty, false, _itemlocSeries, _timestamp, r.invhist_id)
          FROM wo, invhist r, invhist s
          WHERE ((wo_ordtype = 'S')
             AND (wo_ordid = _r.shipitem_orderitem_id) 
             AND (r.invhist_series=s.invhist_series)
             AND (r.invhist_transtype='RM')
             AND (s.invhist_id=_r.shipitem_invhist_id));
             
          --  Return eligble material
          PERFORM returnWoMaterial(womatlpost_womatl_id, _itemlocSeries, _timestamp, womatlpost_invhist_id)
          FROM womatlpost, invhist m, invhist s 
          WHERE ((womatlpost_invhist_id=m.invhist_id)
           AND (m.invhist_series=s.invhist_series)
           AND (m.invhist_transtype='IM')
           AND (s.invhist_id=_r.shipitem_invhist_id));
           
        END IF;

      ELSIF (_r.shiphead_order_type = 'TO') THEN
        SELECT postInvTrans( itemsite_id, 'RS', _r.shipitem_qty,
			  'S/R', _r.shiphead_order_type, tohead_number,
			  '', 'Return from Shipping',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp, _r.shipitem_value, _r.shipitem_invhist_id ) INTO _invhistid
        FROM toitem, tohead, itemsite, costcat
        WHERE ((toitem_item_id=itemsite_item_id)
          AND  (toitem_tohead_id=tohead_id)
  	  AND  (tohead_src_warehous_id=itemsite_warehous_id)
          AND  (itemsite_costcat_id=costcat_id)
          AND  (toitem_id=_r.shipitem_orderitem_id) );

      ELSE
        -- Don't know what kind of order this is
        RETURN -11;
      END IF;

      UPDATE shiphead
      SET shiphead_sfstatus='D'
      WHERE ((shiphead_id=_r.shiphead_id)
        AND  (shiphead_sfstatus='P'));

      DELETE FROM shipitem WHERE (shipitem_id = _r.shipitem_id );
    END IF;

    RETURN _itemlocSeries;

END;
$$ LANGUAGE 'plpgsql';
