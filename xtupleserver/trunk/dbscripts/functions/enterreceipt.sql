CREATE OR REPLACE FUNCTION enterReceipt(TEXT, INTEGER, NUMERIC, NUMERIC, TEXT, INTEGER, DATE) RETURNS INTEGER AS '
DECLARE
  pordertype	ALIAS FOR $1;
  porderitemid	ALIAS FOR $2;
  pQty		ALIAS FOR $3;
  pFreight	ALIAS FOR $4;
  pNotes	ALIAS FOR $5;
  pcurrid	ALIAS FOR $6;	-- NULL is handled by SELECT ... INTO _o
  precvdate	ALIAS FOR $7;	-- NULL is handled by INSERT INTO recv
  _o		RECORD;
  _recvid	INTEGER;

BEGIN
  SELECT NEXTVAL(''recv_recv_id_seq'') INTO _recvid;

  DELETE FROM recv
  WHERE ((NOT recv_posted)
    AND  (recv_order_type=pordertype)
    AND  (recv_orderitem_id=porderitemid) );

  IF (pQty > 0) THEN
    IF (pordertype = ''PO'') THEN
      SELECT pohead_number AS order_number, poitem_id AS orderitem_id,
	     pohead_agent_username AS agent,
	     CASE WHEN poitem_itemsite_id = -1 THEN NULL
	          ELSE poitem_itemsite_id
	     END AS itemsite_id,
	     pohead_vend_id AS vend_id,
	     poitem_vend_item_number AS vend_item_number,
	     poitem_vend_item_descrip AS vend_item_descrip,
	     poitem_vend_uom AS vend_uom,
	     poitem_duedate AS duedate, poitem_unitprice AS unitprice,
	     pohead_curr_id AS unitprice_curr_id,
	     COALESCE(pcurrid, pohead_curr_id) AS freight_curr_id INTO _o
      FROM pohead, poitem
      WHERE ((poitem_pohead_id=pohead_id)
	AND  (poitem_id=porderitemid) );

      IF (NOT FOUND) THEN
	RETURN -1;
      END IF;

    ELSEIF (pordertype = ''TO'' AND fetchMetricBool(''MultiWhs'')) THEN
      SELECT tohead_number AS order_number, toitem_id AS orderitem_id,
	     tohead_agent_username AS agent, itemsite_id,
	     NULL::INTEGER AS vend_id,
	     ''''::TEXT AS vend_item_number,
	     ''''::TEXT AS vend_item_descrip,
	     toitem_uom AS vend_uom,
	     toitem_duedate AS duedate, toitem_stdcost AS unitprice,
	     basecurrid() AS unitprice_curr_id,
	     COALESCE(pcurrid, tohead_freight_curr_id) AS freight_curr_id INTO _o
      FROM tohead, toitem, itemsite
      WHERE ((toitem_tohead_id=tohead_id)
	AND  (toitem_id=porderitemid)
	AND  (toitem_item_id=itemsite_item_id)
	AND  (tohead_dest_warehous_id=itemsite_warehous_id));

      IF (NOT FOUND) THEN
	RETURN -1;
      END IF;

    ELSE
      RETURN -11;
    END IF;

    INSERT INTO recv
    ( recv_id, recv_date,
      recv_order_number, recv_order_type, recv_orderitem_id,
      recv_trans_usr_name, recv_agent_username, recv_itemsite_id,
      recv_vend_id, -- recv_vend_item_number, recv_vend_item_descrip,
      recv_vend_uom, recv_qty, recv_duedate,
      recv_purchcost, recv_purchcost_curr_id,
      recv_notes, recv_freight, recv_freight_curr_id
    ) VALUES (
      _recvid, COALESCE(precvdate, CURRENT_DATE),
      _o.order_number::INTEGER, pordertype, _o.orderitem_id::INTEGER,
      CURRENT_USER, _o.agent, _o.itemsite_id::INTEGER,
      _o.vend_id::INTEGER, -- _o.vend_item_number, _o.vend_item_descrip,
      _o.vend_uom, pQty, _o.duedate,
      _o.unitprice, _o.unitprice_curr_id::INTEGER,
      pNotes, pFreight, _o.freight_curr_id::INTEGER);
  END IF;

  RETURN _recvid;

END;
' LANGUAGE 'plpgsql';
