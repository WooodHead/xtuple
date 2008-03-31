CREATE OR REPLACE FUNCTION distributeItemlocSeries(INTEGER) RETURNS INTEGER AS '
DECLARE
  pItemlocSeries ALIAS FOR $1;
  _distCounter INTEGER;
  _itemlocdist RECORD;
  _itemlocid INTEGER;
  _invhistid INTEGER;

BEGIN

  _distCounter := 0;

--  March through all of the itemlocdists for pItemlocSeries
  FOR _itemlocdist IN SELECT itemlocdist_id AS itemlocdistid,
                             itemlocdist_source_type AS type,
                             itemlocdist_source_id AS sourceid,
                             itemlocdist_qty AS qty,
                             itemlocdist_itemsite_id AS itemsiteid,
                             itemsite_freeze,
                             itemlocdist_invhist_id AS invhistid,
                             itemlocdist_lotserial AS lotserial,
                             itemlocdist_expiration AS expiration,
                             itemlocdist_flush,
                             itemlocdist_warranty AS warranty
                      FROM itemlocdist, itemsite
                      WHERE ( (itemlocdist_itemsite_id=itemsite_id)
                       AND (itemlocdist_series=pItemlocSeries) )
                      ORDER BY itemlocdist_flush DESC LOOP

    _distCounter := _distCounter + 1;

--  Commit invhist to itemsite
    PERFORM postInvHist(_itemlocdist.invhistid);

--  Mark the invhist tuple for the itemlocdist in question as having detail
    UPDATE invhist
    SET invhist_hasdetail=TRUE
    WHERE ( (NOT invhist_hasdetail)
     AND (invhist_id=_itemlocdist.invhistid) );

--  If this itemlocdist is a flush, write a invdetail tuple that records the empty
    IF (_itemlocdist.itemlocdist_flush) THEN
      INSERT INTO invdetail
      ( invdetail_invhist_id, invdetail_location_id, invdetail_lotserial,
        invdetail_qty, invdetail_qty_before, invdetail_qty_after, invdetail_expiration,
        invdetail_warrpurc )
      SELECT _itemlocdist.invhistid, itemloc_location_id, itemloc_lotserial,
             (itemloc_qty * -1), itemloc_qty, 0, itemloc_expiration, 
             _itemlocdist.warranty
      FROM itemloc
      WHERE ( (itemloc_qty <> 0)
       AND (itemloc_id=_itemlocdist.sourceid) );

--  Delete the flushed itemloc if its parent itemsite is not frozen
      IF (NOT _itemlocdist.itemsite_freeze) THEN
        DELETE FROM itemloc
        WHERE (itemloc_id=_itemlocdist.sourceid);
      END IF;

    ELSE
--  If this is a location type distribution, check to see if the target itemloc
--  already exists
      IF (_itemlocdist.type = ''L'') THEN
        SELECT itemloc_id INTO _itemlocid
        FROM itemloc
        WHERE ( (itemloc_itemsite_id=_itemlocdist.itemsiteid)
         AND (itemloc_location_id=_itemlocdist.sourceid)
         AND (itemloc_lotserial=_itemlocdist.lotserial)
         AND (itemloc_expiration=_itemlocdist.expiration) );

--  Nope, create it
        IF (NOT FOUND) THEN
          SELECT NEXTVAL(''itemloc_itemloc_id_seq'') INTO _itemlocid;

          INSERT INTO itemloc
          ( itemloc_id, itemloc_itemsite_id,
            itemloc_location_id, itemloc_qty,
            itemloc_lotserial, itemloc_expiration )
          VALUES
          ( _itemlocid, _itemlocdist.itemsiteid,
            _itemlocdist.sourceid, 0,
            _itemlocdist.lotserial, _itemlocdist.expiration );
        END IF;

      ELSE
        _itemlocid = _itemlocdist.sourceid;
      END IF;

--  Record the invdetail
      INSERT INTO invdetail
      (invdetail_invhist_id, invdetail_location_id, invdetail_lotserial,
       invdetail_qty, invdetail_qty_before, invdetail_qty_after, invdetail_expiration,
       invdetail_warrpurc)
      SELECT _itemlocdist.invhistid, itemloc_location_id, _itemlocdist.lotserial,
             _itemlocdist.qty, itemloc_qty, (itemloc_qty + _itemlocdist.qty),
             itemloc_expiration,_itemlocdist.warranty
      FROM itemloc
      WHERE (itemloc_id=_itemlocid);

--  Update the itemloc_qty if its parent itemsite is not frozen
      IF (NOT _itemlocdist.itemsite_freeze) THEN
        UPDATE itemloc
        SET itemloc_qty = (itemloc_qty + _itemlocdist.qty)
        WHERE (itemloc_id=_itemlocid);
      END IF;

--  Adjust QOH if this itemlocdist is to/from a non-netable location
      IF ( SELECT (NOT location_netable)
           FROM itemloc, location
           WHERE ( (itemloc_location_id=location_id)
            AND (itemloc_id=_itemlocid) ) ) THEN

--  Record the netable->non-netable (or visaveras) invhist
        SELECT NEXTVAL(''invhist_invhist_id_seq'') INTO _invhistid;
        INSERT INTO invhist
        ( invhist_id, invhist_itemsite_id, 
          invhist_transtype, invhist_invqty,
          invhist_qoh_before, invhist_qoh_after,
          invhist_docnumber, invhist_comments,
          invhist_invuom, invhist_unitcost ) 
        SELECT _invhistid, itemsite_id, 
               ''NN'', (_itemlocdist.qty * -1),
               itemsite_qtyonhand, (itemsite_qtyonhand - _itemlocdist.qty),
               invhist_docnumber, invhist_comments,
               uom_name, stdCost(item_id)
        FROM item, itemsite, invhist, uom
        WHERE ((itemsite_item_id=item_id)
         AND (item_inv_uom_id=uom_id)
         AND (itemsite_controlmethod <> ''N'')
         AND (itemsite_id=_itemlocdist.itemsiteid)
         AND (invhist_id=_itemlocdist.invhistid));

--  Adjust the parent itemsite
        UPDATE itemsite
        SET itemsite_qtyonhand = (itemsite_qtyonhand - _itemlocdist.qty),
            itemsite_nnqoh = (itemsite_nnqoh + _itemlocdist.qty)
        FROM itemloc
        WHERE ((itemloc_itemsite_id=itemsite_id)
         AND (itemloc_id=_itemlocid));
      END IF;

    END IF;

--  If, after the distribution, the target itemloc_qty = 0, delete the itemloc
--  if its parent itemsite is not frozen
    IF (NOT _itemlocdist.itemsite_freeze) THEN
      DELETE FROM itemloc
      WHERE ( (itemloc_qty=0)
       AND (itemloc_id=_itemlocid) );
    END IF;

  END LOOP;

  DELETE FROM itemlocdist
  WHERE (itemlocdist_series=pItemlocSeries);

  RETURN _distCounter;

END;
' LANGUAGE 'plpgsql';
