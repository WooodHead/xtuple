CREATE OR REPLACE FUNCTION relocateInventory(INTEGER, INTEGER, INTEGER, NUMERIC, TEXT) RETURNS INTEGER AS '
DECLARE
  pSourceItemlocid ALIAS FOR $1;
  pTargetLocationid ALIAS FOR $2;
  pItemsiteid ALIAS FOR $3;
  pQty ALIAS FOR $4;
  pComments ALIAS FOR $5;
  _targetItemlocid INTEGER;
  _invhistid INTEGER;
  _p RECORD;
  _qty NUMERIC;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN (''R'', ''F''))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

--  Cache some parameters
  SELECT itemloc_lotserial,
         itemloc_itemsite_id AS itemsiteid,
         itemloc_expiration,
         itemloc_qty,
         sourceloc.location_netable AS sourcenet,
         targetloc.location_netable AS targetnet INTO _p
  FROM itemloc, location AS sourceloc, location AS targetloc
  WHERE ( (itemloc_location_id=sourceloc.location_id)
   AND (targetloc.location_id=pTargetLocationid)
   AND (itemloc_id=pSourceItemlocid) );

--  Check to make sure the qty being transfered exists
  IF (_p.itemloc_qty < pQty) THEN
    RETURN -1;
  END IF;

--  Create the RL transaction
  SELECT NEXTVAL(''invhist_invhist_id_seq'') INTO _invhistid;
  INSERT INTO invhist
  ( invhist_id, invhist_itemsite_id,
    invhist_transtype, invhist_invqty,
    invhist_qoh_before, invhist_qoh_after,
    invhist_comments,
    invhist_invuom, invhist_unitcost ) 
  SELECT _invhistid, itemsite_id,
         ''RL'', 0,
         itemsite_qtyonhand, itemsite_qtyonhand,
         pComments,
         uom_name, stdCost(item_id)
  FROM item, itemsite, uom
  WHERE ((itemsite_item_id=item_id)
   AND (item_inv_uom_id=uom_id)
   AND (itemsite_controlmethod <> ''N'')
   AND (itemsite_id=pItemsiteid));

--  Relocate the inventory from the source and record the transactions
  INSERT INTO invdetail
  ( invdetail_invhist_id, invdetail_location_id, invdetail_lotserial,
    invdetail_qty, invdetail_qty_before, invdetail_qty_after )
  SELECT _invhistid, itemloc_location_id, itemloc_lotserial,
         (pQty * -1), itemloc_qty, (itemloc_qty - pQty)
  FROM itemloc
  WHERE (itemloc_id=pSourceItemlocid);

  UPDATE itemloc
  SET itemloc_qty=(itemloc_qty - pQty)
  FROM itemsite
  WHERE ( (itemloc_itemsite_id=itemsite_id)
   AND (NOT itemsite_freeze)
   AND (itemloc_id=pSourceItemlocid) );

--  Check to see if there is anything left at the source Itemloc and delete if not
  DELETE FROM itemloc
  WHERE ( (itemloc_qty=0)
   AND (itemloc_id=pSourceItemlocid) );

--  Check to see if any of the current Lot/Serial #/Expiration exists at the target location
  SELECT itemloc_id INTO _targetItemlocid
  FROM itemloc 
  WHERE ( (itemloc_lotserial=_p.itemloc_lotserial)
   AND (itemloc_expiration=_p.itemloc_expiration)
   AND (itemloc_itemsite_id=pItemsiteid)
   AND (itemloc_location_id=pTargetLocationid) );

  IF (NOT FOUND) THEN
    SELECT NEXTVAL(''itemloc_itemloc_id_seq'') INTO _targetItemlocid;
    INSERT INTO itemloc
    ( itemloc_id, itemloc_itemsite_id, itemloc_location_id,
      itemloc_lotserial, itemloc_expiration, itemloc_qty )
    VALUES
    ( _targetItemlocid, pItemsiteid, pTargetLocationid,
      _p.itemloc_lotserial, _p.itemloc_expiration, 0 );
  END IF;

--  Relocate the inventory to the resultant target and record the transactions
  INSERT INTO invdetail
  ( invdetail_invhist_id, invdetail_location_id, invdetail_lotserial,
    invdetail_qty, invdetail_qty_before, invdetail_qty_after )
  SELECT _invhistid, pTargetLocationid, _p.itemloc_lotserial,
         pQty, itemloc_qty, (itemloc_qty + pQty)
  FROM itemloc
  WHERE (itemloc_id=_targetItemlocid);

  UPDATE itemloc
  SET itemloc_qty=(itemloc_qty + pQty)
  FROM itemsite
  WHERE ( (itemloc_itemsite_id=itemsite_id)
   AND (NOT itemsite_freeze)
   AND (itemloc_id=_targetItemlocid) );

  UPDATE invhist
  SET invhist_hasdetail=TRUE
  WHERE (invhist_id=_invhistid);

--  Post in incomming or outgoing NN transaction if required
  IF (_p.sourcenet <> _p.targetnet) THEN
    IF (_p.targetnet) THEN
      _qty = (pQty * -1);
    ELSE
      _qty = pQty;
    END IF;

    INSERT INTO invhist
    ( invhist_itemsite_id,
      invhist_transtype, invhist_invqty,
      invhist_qoh_before, invhist_qoh_after,
      invhist_docnumber, invhist_comments,
      invhist_invuom, invhist_unitcost ) 
    SELECT itemsite_id,
           ''NN'', (_qty * -1),
           itemsite_qtyonhand, (itemsite_qtyonhand - _qty),
           '''', '''',
           uom_name, stdCost(item_id)
    FROM item, itemsite, uom
    WHERE ( (itemsite_item_id=item_id)
     ANd (item_inv_uom_id=uom_id)
     AND (itemsite_controlmethod <> ''N'')
     AND (itemsite_id=_p.itemsiteid) );

    UPDATE itemsite
    SET itemsite_qtyonhand = (itemsite_qtyonhand - _qty),
        itemsite_nnqoh = (itemsite_nnqoh + _qty)
    WHERE (itemsite_id=_p.itemsiteid);
  END IF;

--  Return the invhist_id
  RETURN _invhistid;

END;
' LANGUAGE 'plpgsql';
