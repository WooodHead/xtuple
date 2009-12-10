CREATE OR REPLACE FUNCTION correctProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN) RETURNS INTEGER AS $$
DECLARE
  pWoid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pBackflush ALIAS FOR $3;
  pBackflushOperations ALIAS FOR $4;

BEGIN

  RETURN  correctProduction(pWoid, pQty, pBackflush, pBackflushOperations, 0);

END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION correctProduction(INTEGER, NUMERIC, BOOLEAN, BOOLEAN, INTEGER) RETURNS INTEGER AS $$
DECLARE
  pWoid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pBackflush ALIAS FOR $3;
  pBackflushOperations ALIAS FOR $4;
  pItemlocSeries ALIAS FOR $5;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;
  _r RECORD;
  _wooperitem RECORD;
  _parentWIPAccntid INTEGER;
  _parentQty NUMERIC;
  _qty NUMERIC;
  _invqty NUMERIC;
  _rntime NUMERIC;
  _sense TEXT;

BEGIN

  IF (pQty = 0) THEN
    RETURN pItemlocseries;
  ELSIF (pQty > 0) THEN
    _sense := 'from';
  ELSE
    _sense := 'to';
  END IF;
  
  IF ( ( SELECT (NOT (wo_status='I'))
         FROM wo
         WHERE (wo_id=pWoid) ) ) THEN
    RETURN -1;
  END IF;

  IF ( ( SELECT (item_type IN ('B','J'))
         FROM wo, itemsite, item
         WHERE ( (wo_itemsite_id=itemsite_id)
          AND (itemsite_item_id=item_id)
          AND (wo_id=pWoid) ) ) ) THEN
    RETURN -2;
  END IF;

  SELECT roundQty(item_fractional, pQty) INTO _parentQty
  FROM wo, itemsite, item
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (wo_id=pWoid) );

  IF (pItemlocSeries = 0) THEN
    SELECT NEXTVAL('itemloc_series_seq') INTO _itemlocSeries;
  ELSE
    _itemlocSeries := pItemlocSeries;
  END IF;

--  Cache the parent WIP account (No SELECT ... INTO x, ... INTO x;!)
  SELECT costcat_wip_accnt_id INTO _parentWIPAccntid
  FROM wo, itemsite, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );
 
  IF (pBackflush) THEN
    FOR _r IN SELECT item_id, item_fractional,
                      itemsite_id, itemsite_warehous_id,
                      itemsite_controlmethod, itemsite_loccntrl,
                      womatl_id, womatl_qtyper, womatl_scrap,
                      womatl_issuemethod, womatl_uom_id
               FROM womatl, wo, itemsite, item
               WHERE ( (womatl_wo_id=wo_id)
                AND (womatl_itemsite_id=itemsite_id)
                AND (itemsite_item_id=item_id)
                AND (womatl_issuemethod = 'L')
                AND (wo_id=pWoid) ) FOR UPDATE LOOP

--  Cache the qty to be issued
      _qty = roundQty(_r.item_fractional, (_parentQty * _r.womatl_qtyper * (1 + _r.womatl_scrap)));
      _invqty = itemuomtouom(_r.item_id, _r.womatl_uom_id, NULL, (_parentQty * _r.womatl_qtyper * (1 + _r.womatl_scrap)));

      IF (_itemlocSeries = 0) THEN
        SELECT NEXTVAL('itemloc_series_seq') INTO _itemlocSeries;
      END IF;

      SELECT postInvTrans( itemsite_id, 'IM', (_invqty * -1),
                           'W/O', 'WO', formatwonumber(pWoid), '',
                           ('Correct Receive Inventory ' || item_number || ' ' || _sense || ' Manufacturing'),
                           _parentWIPAccntid, costcat_asset_accnt_id, _itemlocSeries ) INTO _invhistid
      FROM itemsite, item, costcat
      WHERE ( (itemsite_item_id=item_id)
       AND (itemsite_costcat_id=costcat_id)
       AND (itemsite_id=_r.itemsite_id) );

--  Decrease the parent W/O's WIP value by the value of the returned components
      UPDATE wo
      SET wo_wipvalue = (wo_wipvalue - ((stdcost(_r.item_id) * _invqty))),
          wo_postedvalue = (wo_postedvalue - ((stdcost(_r.item_id) * _invqty)))
      WHERE (wo_id=pWoid);

      UPDATE womatl
      SET womatl_qtyiss = (womatl_qtyiss - _qty),
          womatl_lastreturn = CURRENT_DATE
      WHERE (womatl_id=_r.womatl_id);

    END LOOP;

  END IF;

--  If request, backflush the wooper load
  IF (pBackflushOperations) THEN

    FOR _wooperitem IN SELECT wooper_id, wooper_qtyrcv, wooper_sutime,
                              wooper_suconsumed, wooper_sucomplete,
                              wooper_rncomplete, wooper_rnqtyper,
                              wooper_invproduomratio
                       FROM wooper
                       WHERE (wooper_wo_id=pWoid)
                       ORDER BY wooper_seqnumber LOOP

--  If this is a complete return reverse backflush Setup Time for the reported Qty.

        IF (COALESCE(_wooperitem.wooper_qtyrcv,0) = _parentQty) THEN
          PERFORM postSutime(_wooperitem.wooper_id, _wooperitem.wooper_sutime * -1, TRUE) AS result;
        END IF;

--  Reverse backflush Run Time for the reported Qty.

        _rnTime := (_wooperitem.wooper_rnqtyper / _wooperitem.wooper_invproduomratio * _parentQty * -1);
        PERFORM postRntime(wooper_id, _rnTime, TRUE, _wooperitem.wooper_invproduomratio * _parentQty * -1 )
        FROM wooper
        WHERE (wooper_id=_wooperitem.wooper_id);

        UPDATE wooper
        SET wooper_qtyrcv = (COALESCE(wooper_qtyrcv,0) - _parentQty)
        WHERE (wooper_id=_wooperitem.wooper_id);

    END LOOP;

  END IF;

--  Post the inventory transaction
  SELECT postInvTrans( itemsite_id, 'RM', (_parentQty * -1),
                       'W/O', 'WO', formatwonumber(pWoid), '',
                       ('Correct Receive Inventory ' || item_number || ' ' || _sense || ' Manufacturing'),
                       costcat_asset_accnt_id, costcat_wip_accnt_id, _itemlocSeries, CURRENT_DATE,
                       ((wo_postedvalue - wo_wipvalue) / wo_qtyrcv) * _parentQty -- only used when cost is average
                       ) INTO _invhistid
  FROM wo, itemsite, item, costcat
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (wo_id=pWoid) );

--  Decrease this W/O's qty. received and increase its WIP value
  UPDATE wo
  SET wo_qtyrcv = (wo_qtyrcv - _parentQty),
      wo_wipvalue = (wo_wipvalue + (CASE WHEN(itemsite_costmethod='A') THEN ((wo_postedvalue - wo_wipvalue) / wo_qtyrcv) ELSE stdcost(itemsite_item_id) END * _parentQty)),
      wo_postedvalue = (wo_postedvalue + (CASE WHEN(itemsite_costmethod='A') THEN ((wo_postedvalue - wo_wipvalue) / wo_qtyrcv) ELSE stdcost(itemsite_item_id) END * _parentQty))
  FROM itemsite, item
  WHERE ( (wo_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (wo_id=pWoid) );

  RETURN _itemlocSeries;

END;
$$ LANGUAGE 'plpgsql';
