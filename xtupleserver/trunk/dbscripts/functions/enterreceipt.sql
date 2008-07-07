CREATE OR REPLACE FUNCTION enterReceipt(TEXT, INTEGER, NUMERIC, NUMERIC, TEXT, INTEGER, DATE) RETURNS INTEGER AS $$
DECLARE
  pordertype	ALIAS FOR $1;
  porderitemid	ALIAS FOR $2;
  pQty		ALIAS FOR $3;
  pFreight	ALIAS FOR $4;
  pNotes	ALIAS FOR $5;
  pcurrid	ALIAS FOR $6;	-- NULL is handled by SELECT ... INTO _o
  precvdate	ALIAS FOR $7;	-- NULL is handled by INSERT INTO recv
  _timestamp    TIMESTAMP;
  _o		RECORD;
  _recvid	INTEGER;
  _warehouseid 	INTEGER;

BEGIN
  IF(precvdate IS NULL OR precvdate = CURRENT_DATE) THEN
    _timestamp := CURRENT_TIMESTAMP;
  ELSE
    _timestamp := precvdate;
  END IF;
  SELECT NEXTVAL('recv_recv_id_seq') INTO _recvid;

  DELETE FROM recv
  WHERE ((NOT recv_posted)
    AND  (recv_order_type=pordertype)
    AND  (recv_orderitem_id=porderitemid) );

  IF (pQty > 0) THEN
    IF (fetchmetricbool('MultiWhs')) THEN
      SELECT orderhead_number,
  	   orderitem_id,
	   orderhead_agent_username,
	   CASE WHEN (orderitem_itemsite_id = -1) THEN NULL
		WHEN (pordertype='TO') THEN
		     (SELECT itemsite_id
		      FROM itemsite, tohead, toitem
		      WHERE ((itemsite_warehous_id=tohead_dest_warehous_id)
			AND  (tohead_id=toitem_tohead_id)
			AND  (itemsite_item_id=toitem_item_id)
			AND  (toitem_id=orderitem_id)))
		ELSE orderitem_itemsite_id
	   END AS itemsite_id,
	   CASE WHEN (pordertype='PO') THEN orderhead_from_id
		ELSE NULL
	   END AS vend_id,
	   COALESCE(poitem_vend_item_number, '') AS vend_item_number,
	   COALESCE(poitem_vend_item_descrip, '') AS vend_item_descrip,
	   COALESCE(poitem_vend_uom, '') AS vend_uom,
	   orderitem_scheddate AS duedate,
	   orderitem_unitcost,
	   orderitem_unitcost_curr_id,
	   orderhead_curr_id AS freight_curr_id INTO _o
        FROM orderhead, orderitemdata(pordertype, NULL, porderitemid) AS orderitem LEFT OUTER JOIN
	   poitem ON (orderitem_orderhead_type='PO' AND orderitem_id=poitem_id)
        WHERE ((orderhead_id=orderitem_orderhead_id)
          AND  (orderhead_type=orderitem_orderhead_type));

        --Make sure user has site privileges
        IF ((FOUND) AND (
            SELECT (count(usrpref_id)=1) 
            FROM usrpref 
            WHERE ((usrpref_name='selectedSites')
            AND (usrpref_username=current_user)
            AND (usrpref_value='t')))) THEN
          SELECT usrsite_warehous_id INTO _warehouseid
          FROM usrsite,itemsite
          WHERE ((itemsite_id=_o.itemsite_id)
          AND (usrsite_warehous_id=itemsite_warehous_id)
          AND (usrsite_username=current_user));
          
          IF (NOT FOUND) THEN
            RETURN 0;
          END IF;
        END IF;
    ELSE
     SELECT orderhead_number,
	   orderitem_id,
	   orderhead_agent_username,
	   CASE WHEN (orderitem_itemsite_id = -1) THEN NULL
           ELSE orderitem_itemsite_id
	   END AS itemsite_id,
	   CASE WHEN (pordertype='PO') THEN orderhead_from_id
		ELSE NULL
	   END AS vend_id,
	   COALESCE(poitem_vend_item_number, '') AS vend_item_number,
	   COALESCE(poitem_vend_item_descrip, '') AS vend_item_descrip,
	   COALESCE(poitem_vend_uom, '') AS vend_uom,
	   orderitem_scheddate AS duedate,
	   orderitem_unitcost,
	   orderitem_unitcost_curr_id,
	   orderhead_curr_id AS freight_curr_id INTO _o
        FROM orderhead, orderitemdata(pordertype, NULL, porderitemid) AS orderitem LEFT OUTER JOIN
	   poitem ON (orderitem_orderhead_type='PO' AND orderitem_id=poitem_id)
        WHERE ((orderhead_id=orderitem_orderhead_id)
          AND  (orderhead_type=orderitem_orderhead_type));
    END IF;

      IF (NOT FOUND) THEN
	RETURN -1;
      END IF;

    INSERT INTO recv
    ( recv_id, recv_date,
      recv_order_number, recv_order_type, recv_orderitem_id,
      recv_trans_usr_name, recv_agent_username, recv_itemsite_id,
      recv_vend_id, recv_vend_item_number, recv_vend_item_descrip,
      recv_vend_uom, recv_qty, recv_duedate,
      recv_purchcost, recv_purchcost_curr_id,
      recv_notes, recv_freight, recv_freight_curr_id
    ) VALUES (
      _recvid, _timestamp,
      _o.orderhead_number::INTEGER, pordertype, _o.orderitem_id::INTEGER,
      CURRENT_USER, _o.orderhead_agent_username, _o.itemsite_id::INTEGER,
      _o.vend_id::INTEGER, _o.vend_item_number, _o.vend_item_descrip,
      _o.vend_uom, pQty, _o.duedate,
      _o.orderitem_unitcost, _o.orderitem_unitcost_curr_id::INTEGER,
      pNotes, pFreight, _o.freight_curr_id::INTEGER);
  END IF;

  RETURN _recvid;

END;
$$ LANGUAGE 'plpgsql';
