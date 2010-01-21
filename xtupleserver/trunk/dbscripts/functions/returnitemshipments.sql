CREATE OR REPLACE FUNCTION returnItemShipments(INTEGER) RETURNS INTEGER AS $$
BEGIN
  RETURN returnItemShipments('SO', $1, 0, CURRENT_TIMESTAMP);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION returnItemShipments(INTEGER, INTEGER) RETURNS INTEGER AS $$
BEGIN
  RETURN returnItemShipments('SO', $1, $2, CURRENT_TIMESTAMP);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION returnItemShipments(TEXT, INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
DECLARE
  pordertype		ALIAS FOR $1;
  pitemid		ALIAS FOR $2;
  _itemlocSeries	INTEGER				:= $3;
  _timestamp		TIMESTAMP WITH TIME ZONE	:= $4;
  _qty NUMERIC;
  _value NUMERIC;
  _undoinvhistid INTEGER;
  _invhistid INTEGER;
  _itemtype CHAR(1);
  _oldinvhistid INTEGER;
  _itemlocdistid INTEGER;
  _r RECORD;
  _m RECORD;

BEGIN

  SELECT COALESCE(SUM(shipitem_qty), 0),COALESCE(SUM(shipitem_value),0), MAX(shipitem_invhist_id) INTO _qty, _value, _oldinvhistid
  FROM shipitem, shiphead
  WHERE ((shipitem_shiphead_id=shiphead_id)
    AND  (NOT shiphead_shipped)
    AND  (shiphead_order_type=pordertype)
    AND  (shipitem_orderitem_id=pitemid) );

  IF (_qty <> 0) THEN
    IF (_itemlocSeries = 0) THEN
      _itemlocSeries := NEXTVAL('itemloc_series_seq');
    END IF;  

  --  Find out if there is location or lot/serial detail to undo
    SELECT shipitem_invhist_id AS undoinvhistid,
           (itemsite_controlmethod IN ('L', 'S')) AS lotserial,
           (itemsite_loccntrl) AS loccntrl
      INTO _r
    FROM shiphead JOIN shipitem ON (shipitem_shiphead_id=shiphead_id)
                  JOIN invhist ON (invhist_id=shipitem_invhist_id)
                  JOIN itemsite ON (itemsite_id=invhist_itemsite_id)
    WHERE ( (NOT shiphead_shipped)
      AND   (shiphead_order_type=pordertype)
      AND   (shipitem_orderitem_id=pitemid) );

    IF (pordertype = 'SO') THEN
      IF (SELECT (itemsite_costmethod = 'J' AND itemsite_controlmethod = 'N' )
          FROM coitem, itemsite
          WHERE ((coitem_id=pItemid)
          AND (coitem_itemsite_id=itemsite_id))) THEN
  -- Handle Job cost that is not inventory controlled
        SELECT insertGLTransaction( 'S/R', 'RS', formatSoNumber(pItemid), 'Return from Shipping',
                                     costcat_shipasset_accnt_id,
				     costcat_wip_accnt_id,
                                     -1, _value, current_date ) INTO _invhistid
        FROM coitem, itemsite, costcat
        WHERE ( (coitem_itemsite_id=itemsite_id)
         AND (itemsite_costcat_id=costcat_id)
         AND (coitem_id=pitemid) )
        GROUP BY costcat_shipasset_accnt_id,costcat_wip_accnt_id;

  --  Reverse Backflush eligble material
      FOR _m IN SELECT item_id, item_fractional,
                        itemsite_id, itemsite_warehous_id,
                        itemsite_controlmethod, itemsite_loccntrl,
                        itemsite_costmethod, wo_qtyrcv,
                        womatl_id, womatl_qtyfxd, womatl_qtyper, 
                        womatl_scrap, womatl_issuemethod, womatl_uom_id
                 FROM womatl, wo, itemsite, item, shipitem, shiphead
	        WHERE ((womatl_issuemethod = 'L')
	  	  AND  (womatl_wo_id=wo_id)
	  	  AND  (womatl_itemsite_id=itemsite_id)
		  AND  (itemsite_item_id=item_id)
		  AND  (wo_ordtype = 'S')
		  AND  (wo_ordid = shipitem_orderitem_id)
		  AND  (shiphead_order_type = pordertype)
		  AND  (shiphead_id=shipitem_shiphead_id)
		  AND  (shipitem_orderitem_id=pitemid)) FOR UPDATE LOOP

        _qty = roundQty(_m.item_fractional,(_m.womatl_qtyfxd + _m.wo_qtyrcv * _m.womatl_qtyper) * (1 + _m.womatl_scrap));

        IF (_qty > 0) THEN
          SELECT returnWoMaterial(_m.womatl_id, _qty , _itemlocSeries, now()) INTO _itemlocSeries;
        END IF;
    
      END LOOP;

  --  Update the work order about what happened
        UPDATE wo SET 
          wo_qtyrcv = 0,
          wo_wipvalue = wo_wipvalue + _value,
          wo_status ='I'
        FROM coitem
        WHERE ((wo_ordtype = 'S')
        AND (wo_ordid = pItemid)
        AND (coitem_id = pItemid));

      ELSE
      -- Handle regular inventory transaction
              SELECT postInvTrans( itemsite_id, 'RS', _qty * coitem_qty_invuomratio,
			  'S/R', pordertype, formatSoNumber(pitemid),
			  shiphead_number, 'Return from Shipping',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp, _value, _r.undoinvhistid ) INTO _invhistid
        FROM coitem, itemsite, costcat, shiphead, shipitem
        WHERE ( (coitem_itemsite_id=itemsite_id)
         AND (itemsite_costcat_id=costcat_id)
         AND (coitem_id=pitemid)
         AND (shiphead_order_type=pordertype)
         AND (shiphead_id=shipitem_shiphead_id)
         AND (shipitem_orderitem_id=pitemid) );

      -- Going to handle distribution automatically later so remove the distribution records
      -- DELETE FROM itemlocdist WHERE (itemlocdist_series=_itemlocSeries);
      END IF;

    ELSEIF (pordertype = 'TO') THEN
      SELECT postInvTrans( itemsite_id, 'RS', _qty,
			  'S/R', pordertype, tohead_number,
			  '', 'Return from Shipping',
			  costcat_asset_accnt_id, costcat_shipasset_accnt_id,
			  _itemlocSeries, _timestamp, _value, _r.undoinvhistid ) INTO _invhistid
      FROM toitem, tohead, itemsite, costcat
      WHERE ((toitem_item_id=itemsite_item_id)
        AND  (toitem_tohead_id=tohead_id)
	AND  (tohead_src_warehous_id=itemsite_warehous_id)
        AND  (itemsite_costcat_id=costcat_id)
        AND  (toitem_id=pitemid) );

      -- Going to handle distribution automatically later so remove the distribution records
      -- DELETE FROM itemlocdist WHERE (itemlocdist_series=_itemlocSeries);

    ELSE
      RETURN -11;
    END IF;

  --  Find out if there is location or lot/serial detail to undo and handle it 
--    FOR _r IN 
--      SELECT  itemsite_id, invdetail_ls_id, (invdetail_qty * -1) AS invdetail_qty,
--        invdetail_location_id, invdetail_expiration,
--        (itemsite_controlmethod IN ('L', 'S')) AS lotserial,
--        (itemsite_loccntrl) AS loccntrl
--      FROM shiphead, shipitem, invdetail, invhist, itemsite
--      WHERE ( (shipitem_invhist_id=invhist_id)
--        AND  (invhist_id=invdetail_invhist_id)
--        AND  (invhist_itemsite_id=itemsite_id)
--        AND  (shipitem_shiphead_id=shiphead_id)
--        AND  (NOT shiphead_shipped)
--        AND  (shiphead_order_type=pordertype)
--        AND  (shipitem_orderitem_id=pitemid) )
--    LOOP
--      _itemlocdistid := nextval('itemlocdist_itemlocdist_id_seq');
          
--      IF (( _r.lotserial) AND (NOT _r.loccntrl))  THEN          
--        INSERT INTO itemlocdist
--          ( itemlocdist_id, itemlocdist_source_type, itemlocdist_source_id,
--            itemlocdist_itemsite_id, itemlocdist_ls_id, itemlocdist_expiration,
--            itemlocdist_qty, itemlocdist_series, itemlocdist_invhist_id ) 
--          VALUES (_itemlocdistid, 'L', -1,
--                  _r.itemsite_id, _r.invdetail_ls_id,  COALESCE(_r.invdetail_expiration,startoftime()),
--                  _r.invdetail_qty, _itemlocSeries, _invhistid );

--        INSERT INTO lsdetail 
--          ( lsdetail_itemsite_id, lsdetail_ls_id, lsdetail_created,
--            lsdetail_source_type, lsdetail_source_id, lsdetail_source_number ) 
--          VALUES ( _r.itemsite_id, _r.invdetail_ls_id, CURRENT_TIMESTAMP,
--                   'I', _itemlocdistid, '');

        PERFORM distributeitemlocseries(_itemlocSeries);
--      ELSE
--        INSERT INTO itemlocdist
--          ( itemlocdist_id, itemlocdist_source_type, itemlocdist_source_id,
--            itemlocdist_itemsite_id, itemlocdist_ls_id, itemlocdist_expiration,
--            itemlocdist_qty, itemlocdist_series, itemlocdist_invhist_id ) 
--        VALUES (_itemlocdistid, 'O', -1,
--                _r.itemsite_id, _r.invdetail_ls_id, COALESCE(_r.invdetail_expiration,startoftime()),
--                _r.invdetail_qty, _itemlocSeries, _invhistid );
 
--        INSERT INTO itemlocdist
--          ( itemlocdist_itemlocdist_id, itemlocdist_source_type, itemlocdist_source_id,
--            itemlocdist_itemsite_id, itemlocdist_ls_id, itemlocdist_expiration,
--            itemlocdist_qty) 
--        VALUES (_itemlocdistid, 'L', _r.invdetail_location_id,
--                _r.itemsite_id, _r.invdetail_ls_id, COALESCE(_r.invdetail_expiration,startoftime()),
--                _r.invdetail_qty);

--        PERFORM distributetolocations(_itemlocdistid);
--      END IF;
--    END LOOP;

    UPDATE shiphead
    SET shiphead_sfstatus='D'
    FROM shipitem
    WHERE ((shipitem_shiphead_id=shiphead_id)
      AND  (shiphead_sfstatus='P')
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
$$ LANGUAGE 'plpgsql';
