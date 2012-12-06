CREATE OR REPLACE FUNCTION postReceipt(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  precvid		ALIAS FOR $1;
  _itemlocSeries	INTEGER := $2;
  _freightAccnt		INTEGER;
  _glDate		TIMESTAMP WITH TIME ZONE;
  _o			RECORD;
  _ordertypeabbr	TEXT;
  _r			RECORD;
  _recvvalue		NUMERIC := 0;
  _tmp			INTEGER;
  _to			RECORD;
  _toitemitemid		INTEGER;

BEGIN
  SELECT recv_order_type, recv_orderitem_id, recv_qty,
	 round(currToBase(recv_freight_curr_id, recv_freight, recv_date::DATE),2)
	      AS recv_freight_base,
	 recv_freight, recv_freight_curr_id, recv_date, recv_gldistdate,
	 itemsite_id, itemsite_item_id
	 INTO _r
  FROM recv LEFT OUTER JOIN itemsite ON (recv_itemsite_id=itemsite_id)
  WHERE ((recv_id=precvid)
    AND  (NOT recv_posted));

  IF (NOT FOUND) THEN
    IF (_itemlocSeries IS NULL OR _itemlocSeries = 0) THEN
      RETURN -10;
    END IF;
    RETURN _itemlocSeries;
  ELSEIF (_r.recv_qty <= 0) THEN
    RETURN -11;
  END IF;

  IF (fetchMetricBool(''MultiWhs'')) THEN
    SELECT pohead_number AS order_number, poitem_id AS orderitem_id,
	 poitem_expcat_id AS expcat_id,
	 currToBase(pohead_curr_id, poitem_unitprice, recv_date::DATE)
	      AS item_unitprice_base,
	 poitem_invvenduomratio AS invvenduomratio,
	 pohead_orderdate AS orderdate
    FROM recv, pohead, poitem
    WHERE ((recv_orderitem_id=poitem_id)
      AND  (poitem_pohead_id=pohead_id)
      AND  (recv_id=precvid)
      AND  (NOT recv_posted)
      AND  (_r.recv_order_type = ''PO''))  INTO _o
    UNION
    SELECT tohead_number AS order_number, toitem_id AS orderitem_id,
	 NULL::INTEGER AS expcat_id,
	 toitem_stdcost AS item_unitprice_base,
	 1 AS invvenduomratio,
	 tohead_orderdate AS orderdate
    FROM recv, tohead, toitem
    WHERE ((recv_orderitem_id=toitem_id)
      AND  (toitem_tohead_id=tohead_id)
      AND  (recv_id=precvid)
      AND  (NOT recv_posted)
      AND  (_r.recv_order_type = ''TO''));
  ELSE
    SELECT pohead_number AS order_number, poitem_id AS orderitem_id,
	 poitem_expcat_id AS expcat_id,
	 currToBase(pohead_curr_id, poitem_unitprice, recv_date::DATE)
	      AS item_unitprice_base,
	 poitem_invvenduomratio AS invvenduomratio,
	 pohead_orderdate AS orderdate
    FROM recv, pohead, poitem
    WHERE ((recv_orderitem_id=poitem_id)
      AND  (poitem_pohead_id=pohead_id)
      AND  (recv_id=precvid)
      AND  (NOT recv_posted)
      AND  (_r.recv_order_type = ''PO''))  INTO _o;
  END IF;

  IF (_r.recv_order_type =''PO'') THEN
    _ordertypeabbr := ''P/O'';
  ELSIF (_r.recv_order_type =''TO'') THEN
    _ordertypeabbr := ''T/O'';
  END IF;

  IF (NOT FOUND) THEN
    IF (_itemlocSeries IS NULL OR _itemlocSeries = 0) THEN
      RETURN -10;
    END IF;
    RETURN _itemlocSeries;
  END IF;

  IF (_itemlocSeries IS NULL OR _itemlocSeries = 0) THEN
    _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
  ELSEIF (_itemlocSeries < 0) THEN
    RETURN _itemlocSeries;
  END IF;

  _glDate := COALESCE(_r.recv_gldistdate, _r.recv_date);

  IF (_r.itemsite_id = -1 OR _r.itemsite_id IS NULL) THEN
    SELECT insertGLTransaction( ''S/R'', _r.recv_order_type, _o.order_number,
				''Receive Non-Inventory from '' || _ordertypeabbr,
				 expcat_liability_accnt_id,
				 expcat_exp_accnt_id, -1,
				 round((_o.item_unitprice_base * _r.recv_qty),2),
				 _glDate::DATE ) INTO _tmp
    FROM expcat
    WHERE (expcat_id=_o.expcat_id);
    IF (_tmp < 0 AND _tmp != -3) THEN -- error but not 0-value transaction
      RETURN _tmp;
    END IF;
    SELECT insertGLTransaction( ''S/R'', _r.recv_order_type, _o.order_number,
				''Receive Non-Inventory Freight from '' || _ordertypeabbr,
				 expcat_liability_accnt_id,
				 expcat_freight_accnt_id, -1,
				 _r.recv_freight_base,
				 _glDate::DATE ),
	   expcat_freight_accnt_id INTO _tmp, _freightAccnt
    FROM expcat
    WHERE (expcat_id=_o.expcat_id);
    IF (_tmp < 0 AND _tmp != -3) THEN -- error but not 0-value transaction
      RETURN _tmp;
    END IF;

    _recvvalue := ROUND((_o.item_unitprice_base * _r.recv_qty),2);

    UPDATE poitem
    SET poitem_qty_received = (poitem_qty_received + _r.recv_qty),
	poitem_freight_received = (poitem_freight_received + _r.recv_freight_base)
    WHERE (poitem_id=_o.orderitem_id);

  ELSE	-- not ELSIF: the code to handle freight is shared between diff order types
    IF (_r.recv_order_type = ''PO'') THEN
      SELECT postInvTrans( itemsite_id, ''RP''::TEXT,
			   (_r.recv_qty * _o.invvenduomratio),
			   ''S/R''::TEXT,
			   _r.recv_order_type::TEXT, _o.order_number::TEXT,
			   ''''::TEXT,
			   ''Receive Inventory from '' || _ordertypeabbr,
			   costcat_asset_accnt_id, costcat_liability_accnt_id,
			   _itemlocSeries,
			   _glDate
			   ) INTO _tmp
      FROM itemsite, costcat
      WHERE ( (itemsite_costcat_id=costcat_id)
       AND (itemsite_id=_r.itemsite_id) );
      IF (_tmp < -1) THEN -- less than -1 because -1 means it is a none controlled item
	IF(_tmp = -3) THEN
	  RETURN -12; -- The GL trans value was 0 which means we likely do not have a std cost
	END IF;
	RETURN _tmp;
      END IF;

      SELECT insertGLTransaction( ''S/R'', _r.recv_order_type, _o.order_number,
				  ''Receive Inventory Freight from '' || _o.order_number,
				   costcat_liability_accnt_id,
				   costcat_freight_accnt_id, -1,
				   _r.recv_freight_base,
				   _glDate::DATE ),
	     costcat_freight_accnt_id INTO _tmp, _freightAccnt
      FROM itemsite, costcat
      WHERE ( (itemsite_costcat_id=costcat_id)
       AND (itemsite_id=_r.itemsite_id) );
      IF (_tmp < 0 AND _tmp != -3) THEN -- error but not 0-value transaction
	RETURN _tmp;
      END IF;

      UPDATE poitem
      SET poitem_qty_received = (poitem_qty_received + _r.recv_qty),
	  poitem_freight_received = (poitem_freight_received + _r.recv_freight_base)
      WHERE (poitem_id=_o.orderitem_id);

    ELSIF (_r.recv_order_type = ''TO'' AND fetchMetricBool(''MultiWhs'')) THEN
      SELECT tohead.* INTO _to
	FROM tohead, toitem
       WHERE ((tohead_id=toitem_tohead_id)
         AND  (toitem_id=_r.recv_orderitem_id));

      SELECT toitem_item_id INTO _toitemitemid
      FROM toitem
      WHERE (toitem_id=_r.recv_orderitem_id);

      SELECT postInvTrans(si.itemsite_id, ''TS'', _r.recv_qty, ''I/M'',
			  _r.recv_order_type, _to.tohead_number,
			  _to.tohead_number,
			  ''Receive from Transit To Dest Warehouse'',
			  tc.costcat_asset_accnt_id,
			  sc.costcat_asset_accnt_id,
			  _itemlocSeries, _glDate) INTO _tmp
      FROM itemsite AS ti, costcat AS tc,
	   itemsite AS si, costcat AS sc
      WHERE ((ti.itemsite_costcat_id=tc.costcat_id)
        AND  (si.itemsite_costcat_id=sc.costcat_id)
        AND  (ti.itemsite_item_id=_toitemitemid)
        AND  (si.itemsite_item_id=_toitemitemid)
	AND  (ti.itemsite_warehous_id=_to.tohead_dest_warehous_id)
	AND  (si.itemsite_warehous_id=_to.tohead_trns_warehous_id));

      IF (_tmp < 0) THEN
	RETURN _tmp;
      END IF;

      -- record inventory history and qoh changes at dest warehouse but
      -- there is only one g/l account to touch
      SELECT postInvTrans(ti.itemsite_id, ''TR'', _r.recv_qty, ''I/M'',
			  _r.recv_order_type, _to.tohead_number,
			  _to.tohead_number,
			  ''Receive from Transit To Dest Warehouse'',
			  tc.costcat_asset_accnt_id,
			  tc.costcat_asset_accnt_id,
			  _itemlocSeries, _glDate) INTO _tmp
      FROM itemsite AS ti, costcat AS tc,
	   itemsite AS si, costcat AS sc
      WHERE ((ti.itemsite_costcat_id=tc.costcat_id)
        AND  (si.itemsite_costcat_id=sc.costcat_id)
        AND  (ti.itemsite_item_id=_toitemitemid)
        AND  (si.itemsite_item_id=_toitemitemid)
	AND  (ti.itemsite_warehous_id=_to.tohead_dest_warehous_id)
	AND  (si.itemsite_warehous_id=_to.tohead_trns_warehous_id));

      IF (_tmp < 0) THEN
	RETURN _tmp;
      END IF;

      SELECT insertGLTransaction( ''S/R'', _r.recv_order_type, _o.order_number,
				  ''Receive Inventory Freight from '' || _o.order_number,
				   costcat_toliability_accnt_id,
				   costcat_freight_accnt_id, -1,
				   _r.recv_freight_base,
				   _glDate::DATE ),
	     costcat_freight_accnt_id INTO _tmp, _freightAccnt
      FROM itemsite, costcat
      WHERE ( (itemsite_costcat_id=costcat_id)
       AND (itemsite_id=_r.itemsite_id) );
      IF (_tmp < 0 AND _tmp != -3) THEN -- error but not 0-value transaction
	RETURN _tmp;
      END IF;

      UPDATE toitem
      SET toitem_qty_received = (toitem_qty_received + _r.recv_qty),
	  toitem_freight_received = (toitem_freight_received +
				      currToCurr(_r.recv_freight_curr_id,
						 toitem_freight_curr_id,
						 _r.recv_freight, _glDate::DATE))
      WHERE (toitem_id=_o.orderitem_id);

    END IF;

    _recvvalue := ROUND(stdcost(_r.itemsite_item_id) * _r.recv_qty * _o.invvenduomratio, 2);
  END IF;

  UPDATE recv
  SET recv_value=_recvvalue, recv_posted=TRUE, recv_gldistdate=_glDate::DATE
  WHERE (recv_id=precvid);

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
