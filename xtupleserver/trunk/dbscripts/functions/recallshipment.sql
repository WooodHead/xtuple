CREATE OR REPLACE FUNCTION recallShipment(INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN recallShipment($1, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION recallShipment(INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pshipheadid		ALIAS FOR $1;
  _timestamp		TIMESTAMP WITH TIME ZONE := $2;
  _allInvoiced		BOOLEAN;
  _co			RECORD;
  _cobill		RECORD;
  _h			RECORD;
  _invhistid		INTEGER;
  _itemlocSeries	INTEGER;
  _qty			NUMERIC;
  _qtyToBill		NUMERIC;
  _shiphead		RECORD;
  _to			RECORD;
  _ti			RECORD;

BEGIN

  IF (_timestamp IS NULL) THEN
    _timestamp := CURRENT_TIMESTAMP;
  END IF;

  SELECT * INTO _shiphead
  FROM shiphead
  WHERE (shiphead_id=pshipheadid);
  IF (NOT FOUND OR NOT _shiphead.shiphead_shipped) THEN
    RETURN -1;
  END IF;

  IF (_shiphead.shiphead_order_type = ''SO'') THEN
    SELECT cohead_number AS head_number, cohead_cust_id AS cust_id INTO _h
      FROM cohead
     WHERE (cohead_id=_shiphead.shiphead_order_id);
    IF (NOT FOUND) THEN
      RETURN -1;
    END IF;

    SELECT COALESCE(BOOL_AND(shipitem_invoiced), FALSE) INTO _allInvoiced
     FROM cobill, shipitem
    WHERE ((cobill_coitem_id=shipitem_orderitem_id)
      AND  (shipitem_shiphead_id=pshipheadid));

    IF (_allInvoiced AND NOT hasPriv(''RecallInvoicedShipment'')) THEN
      RETURN -2;
    END IF;

    FOR _co IN SELECT coitem_id, coitem_itemsite_id
                 FROM coitem
                WHERE(coitem_id IN (SELECT shipitem_orderitem_id
                                      FROM shipitem, shiphead
                                     WHERE((shipitem_shiphead_id=shiphead_id)
                                       AND (shiphead_shipped)
                                       AND (shiphead_id=pshipheadid)))) FOR UPDATE LOOP

      SELECT SUM(shipitem_qty) INTO _qty
      FROM shipitem
      WHERE ( (shipitem_orderitem_id=_co.coitem_id)
       AND (shipitem_shiphead_id=pshipheadid) );

      UPDATE coitem
      SET coitem_qtyshipped = (coitem_qtyshipped - _qty)
      WHERE (coitem_id=_co.coitem_id);

      _qtyToBill := _qty;
      FOR _cobill IN SELECT cobill_id, cobill_qty
			 FROM cobill, shipitem
			WHERE ((cobill_coitem_id=shipitem_orderitem_id)
			  AND  (shipitem_shiphead_id=pshipheadid)
			  AND  (cobill_coitem_id=_co.coitem_id)) FOR UPDATE LOOP

	UPDATE cobill
	SET cobill_qty = noNeg(cobill_qty - _qtyToBill)
	WHERE (cobill_id=_cobill.cobill_id);

	_qtyToBill = _qtyToBill - _cobill.cobill_qty;
	EXIT WHEN (_qtyToBill <= 0.0);
      END LOOP;

  --  Distribute to G/L, debit Shipping Asset, credit COS
      PERFORM insertGLTransaction( ''S/R'', _shiphead.shiphead_order_type,
				   _h.head_number::TEXT, ''Recall Shipment'',
				   resolveCOSAccount(itemsite_id, _h.cust_id), costcat_shipasset_accnt_id, -1,
				   (stdcost(itemsite_item_id) * _qty),
				   _timestamp::DATE )
      FROM itemsite, costcat
      WHERE ( (itemsite_costcat_id=costcat_id)
       AND (itemsite_id=_co.coitem_itemsite_id) );

    END LOOP;

  ELSEIF (_shiphead.shiphead_order_type = ''TO'') THEN
    SELECT * INTO _to
      FROM tohead
     WHERE (tohead_id=_shiphead.shiphead_order_id);
    IF (NOT FOUND) THEN
      RETURN -1;
    END IF;

    FOR _ti IN SELECT toitem_id, toitem_item_id,
		      toitem_qty_received, toitem_qty_ordered, SUM(shipitem_qty) AS qty
	      FROM toitem, shipitem
	      WHERE ((toitem_id=shipitem_orderitem_id)
		AND  (shipitem_shiphead_id=pshipheadid))
	      GROUP BY toitem_id, toitem_item_id,
		       toitem_qty_received, toitem_qty_ordered LOOP

      -- don''t allow recall if it''s already been received at the dest
      IF (_ti.qty > _ti.toitem_qty_ordered - _ti.toitem_qty_received) THEN
	RETURN -3;
      END IF;

      IF (SELECT (itemsite_loccntrl OR itemsite_controlmethod IN (''L'', ''S''))
	  FROM itemsite
	  WHERE ((itemsite_item_id=_ti.toitem_item_id)
	    AND  (itemsite_warehous_id=_to.tohead_trns_warehous_id))) THEN
	IF (_itemlocSeries = 0 OR _itemlocSeries IS NULL) THEN
	  _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
	END IF;
      END IF;
      
      SELECT postInvTrans(si.itemsite_id, ''TS'', _ti.qty, ''I/M'',
			  _shiphead.shiphead_order_type, _to.tohead_number,
			  _to.tohead_number,
			  ''Recall Shipment from Transit To Src Warehouse'',
			  tc.costcat_shipasset_accnt_id,
			  sc.costcat_asset_accnt_id,
			  _itemlocSeries, _timestamp) INTO _invhistid
      FROM itemsite AS ti, costcat AS tc,
	   itemsite AS si, costcat AS sc
      WHERE ( (ti.itemsite_costcat_id=tc.costcat_id)
        AND  (si.itemsite_costcat_id=sc.costcat_id)
        AND  (ti.itemsite_item_id=_ti.toitem_item_id)
        AND  (si.itemsite_item_id=_ti.toitem_item_id)
        AND  (ti.itemsite_warehous_id=_to.tohead_src_warehous_id)
        AND  (si.itemsite_warehous_id=_to.tohead_trns_warehous_id) );

      IF (_invhistid < 0) THEN
	RETURN _invhistid;
      END IF;

      -- record inventory history and qoh changes at transit warehouse but
      -- there is only one g/l account to touch
      SELECT postInvTrans(ti.itemsite_id, ''TR'', _ti.qty, ''I/M'',
			  _shiphead.shiphead_order_type, _to.tohead_number,
			  _to.tohead_number,
			  ''Recall Shipment from Transit To Src Warehouse'',
			  tc.costcat_asset_accnt_id,
			  tc.costcat_asset_accnt_id,
			  _itemlocSeries, _timestamp) INTO _invhistid
      FROM itemsite AS ti, costcat AS tc
      WHERE ((ti.itemsite_costcat_id=tc.costcat_id)
        AND  (ti.itemsite_item_id=_ti.toitem_item_id)
        AND  (ti.itemsite_warehous_id=_to.tohead_src_warehous_id));

      IF (_invhistid < 0) THEN
	RETURN _invhistid;
      END IF;

      UPDATE toitem
      SET toitem_qty_shipped = (toitem_qty_shipped - _ti.qty)
      WHERE (toitem_id=_ti.toitem_id);

      UPDATE shipitem SET shipitem_shipdate=NULL, shipitem_shipped=FALSE
      WHERE ((shipitem_orderitem_id=_ti.toitem_id)
        AND  (shipitem_shiphead_id=pshipheadid));

      DELETE FROM recv
	WHERE ((recv_orderitem_id=_ti.toitem_id)
	  AND  (recv_order_type=''TO'')
	  AND  (NOT recv_posted));

    END LOOP;

  END IF;

  UPDATE shiphead
  SET shiphead_shipped=FALSE
  WHERE (shiphead_id=pshipheadid);

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
