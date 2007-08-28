CREATE OR REPLACE FUNCTION correctReceipt(INTEGER, NUMERIC, NUMERIC, INTEGER, INTEGER, DATE) RETURNS INTEGER AS '
DECLARE
  precvid		ALIAS FOR $1;
  pQty			ALIAS FOR $2;
  pFreight		ALIAS FOR $3;
  _itemlocSeries	INTEGER := $4;
  _currid		INTEGER := $5;
  pEffective		ALIAS FOR $6;
  _freight		NUMERIC;
  _qty			NUMERIC;
  _invhistid		INTEGER;
  _o			RECORD;
  _ordertype		TEXT;
  _r			RECORD;

BEGIN
  SELECT recv_qty, recv_date::DATE AS recv_date, recv_freight_curr_id,
	 recv_orderitem_id,
	 round(currToCurr(recv_freight_curr_id, COALESCE(_currid, recv_freight_curr_id),
         recv_freight, recv_date::DATE),2) AS recv_freight,
         recv_posted, recv_order_type,
         COALESCE(itemsite_id, -1) AS itemsiteid,
	 itemsite_item_id INTO _r
  FROM recv LEFT OUTER JOIN itemsite ON (recv_itemsite_id=itemsite_id)
  WHERE (recv_id=precvid);

  IF (NOT FOUND) THEN
    RETURN _itemlocSeries;
  END IF;

  IF (_r.recv_order_type = ''PO'') THEN
    SELECT currToBase(pohead_curr_id, poitem_unitprice, _r.recv_date::DATE)
		AS unitprice_base,
	   pohead_number AS order_number,
	   poitem_expcat_id AS expcat_id,
	   pohead_curr_id AS freight_curr_id,
	   poitem_invvenduomratio AS invvenduomratio INTO _o
    FROM pohead, poitem
    WHERE ( (_r.recv_orderitem_id=poitem_id)
     AND (poitem_pohead_id=pohead_id));

    IF (NOT FOUND) THEN
      RETURN _itemlocSeries;
    END IF;

    _ordertype := ''PO'';

  ELSEIF (_r.recv_order_type = ''TO'' AND fetchMetricBool(''MultiWhs'')) THEN
    SELECT toitem_stdcost AS unitprice_base,
	   tohead_number AS order_number,
	   NULL::INTEGER AS expcat_id,	-- TODO: what is the expcat here?
	   toitem_freight_curr_id AS freight_curr_id,
	   1 AS invvenduomratio INTO _o
    FROM tohead, toitem
    WHERE ( (_r.recv_orderitem_id=toitem_id)
     AND (toitem_tohead_id=tohead_id));

    IF (NOT FOUND) THEN
      RETURN _itemlocSeries;
    END IF;

    _ordertype := ''TO'';

  ELSE
    RETURN -11;
  END IF;

  IF (_r.recv_posted) THEN
    IF (_currid IS NULL) THEN
      _currid := _r.recv_freight_curr_id;
    END IF;

    _qty := (pQty - _r.recv_qty);
    IF (_qty <> 0) THEN
      IF (_r.itemsiteid = -1) THEN
	PERFORM insertGLTransaction( ''S/R'', _r.recv_order_type,
				      _o.order_number,
				      ''Receive Non-Inventory from '' || _ordertype,
				     expcat_liability_accnt_id, expcat_exp_accnt_id, -1,
				     ROUND((_o.unitprice_base * _qty),2),
				      pEffective )
	FROM expcat
	WHERE (expcat_id=_o.expcat_id);

	UPDATE recv
	SET recv_qty=pQty, recv_value=(recv_value + round(_o.unitprice_base * _qty,2))
	WHERE (recv_id=precvid);

      ELSE
	IF (_itemlocSeries = 0 OR _itemlocSeries IS NULL) THEN
	  _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
	END IF;

	IF (_r.itemsiteid <> -1) THEN
	  SELECT postInvTrans( itemsite_id, ''RP'', (_qty * _o.invvenduomratio),
			       ''S/R'', _r.recv_order_type,
			       _o.order_number, '''',
			       ''Receive Inventory from '' || _ordertype,
			       costcat_asset_accnt_id, costcat_liability_accnt_id, _itemlocSeries, pEffective ) INTO _invhistid
	  FROM itemsite, costcat
	  WHERE ( (itemsite_costcat_id=costcat_id)
	  AND (itemsite_id=_r.itemsiteid) );
	END IF;

	UPDATE recv
	SET recv_qty=pQty, recv_value=(recv_value + stdcost(_r.itemsite_item_id) * _qty * _o.invvenduomratio)
	WHERE (recv_id=precvid);

      END IF;

      IF (_r.recv_order_type = ''PO'') THEN
	UPDATE poitem
	SET poitem_qty_received=(poitem_qty_received + _qty)
	WHERE (poitem_id=_r.recv_orderitem_id);
      ELSEIF (_r.recv_order_type = ''TO'' AND fetchMetricBool(''MultiWhs'')) THEN
	UPDATE toitem
	SET toitem_qty_received=(toitem_qty_received + _qty)
	WHERE (toitem_id=_r.recv_orderitem_id);
      END IF;

    END IF;

    _freight := (pFreight - _r.recv_freight);
    IF (_freight <> 0) THEN

      IF (_r.itemsiteid = -1) THEN
	PERFORM insertGLTransaction( ''S/R'', _r.recv_order_type,
				    _o.order_number,
				    ''Receive Non-Inventory Freight from '' || _ordertype,
				     expcat_liability_accnt_id, expcat_freight_accnt_id, -1,
				      ROUND(currToBase(_currid, _freight,
						    pEffective), 2),
				     pEffective )
	FROM expcat
	WHERE (expcat_id=_o.expcat_id);
      ELSE
	PERFORM insertGLTransaction(''S/R'', _r.recv_order_type,
				    _o.order_number, 
				    ''Receive Non-Inventory Freight from '' || _ordertype,
				   costcat_liability_accnt_id, costcat_freight_accnt_id, -1,
				   round(currToBase(_currid, _freight,
						    pEffective), 2),
				   pEffective )
	FROM itemsite, costcat
	WHERE ( (itemsite_costcat_id=costcat_id)
	  AND   (itemsite_id=_r.itemsiteid) );
      END IF;

      IF (_r.recv_order_type = ''PO'') THEN
	UPDATE poitem
	SET poitem_freight_received=(poitem_freight_received +
				   currToCurr(_currid, _o.freight_curr_id,
					      _freight, pEffective))
	WHERE (poitem_id=_o.orderitem_id);

      ELSEIF (_r.recv_order_type = ''TO'' AND fetchMetricBool(''MultiWhs'')) THEN
	UPDATE toitem
	SET toitem_freight_received=(toitem_freight_received +
				   currToCurr(_currid, _o.freight_curr_id,
					      _freight, pEffective))
	WHERE (toitem_id=_o.orderitem_id);
      END IF;

      UPDATE recv
      SET recv_freight=currToCurr(_currid, recv_freight_curr_id, pFreight,
				  pEffective),
	  recv_date = pEffective
      WHERE (recv_id=precvid);
    END IF;

  ELSE

-- Receipt not posted yet
    UPDATE recv SET recv_qty=pQty, recv_freight=pFreight WHERE recv_id=precvid;
  END IF;

RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
