
CREATE OR REPLACE FUNCTION returnWoMaterial(INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pItemlocSeries ALIAS FOR $3;
  _woNumber TEXT;
  _woid INTEGER;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;
  _qty NUMERIC;

BEGIN

  _itemlocSeries := 0;
  
  IF ( SELECT (womatl_qtyiss < pQty)
       FROM womatl
       WHERE (womatl_id=pWomatlid) ) THEN
    RETURN pItemlocSeries;
  END IF;

  SELECT itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, pQty)
    INTO _qty
    FROM womatl, itemsite
   WHERE((womatl_itemsite_id=itemsite_id)
     AND (womatl_id=pWomatlid));
  IF (NOT FOUND) THEN
    _qty := pQty;
  END IF;

  SELECT womatl_wo_id, formatWoNumber(womatl_wo_id) INTO _woid, _woNumber
  FROM womatl
  WHERE (womatl_id=pWomatlid);

  IF (pItemlocSeries = 0) THEN
    SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  ELSE
    _itemlocSeries = pItemlocSeries;
  END IF;
  SELECT postInvTrans( ci.itemsite_id, ''IM'', (_qty * -1), 
                       ''W/O'', ''WO'', _woNumber, '''', ''Return Material from Work Order'',
                       pc.costcat_wip_accnt_id, cc.costcat_asset_accnt_id, _itemlocSeries ) INTO _invhistid
    FROM womatl, wo,
         itemsite AS ci, costcat AS cc,
         itemsite AS pi, costcat AS pc
   WHERE((womatl_itemsite_id=ci.itemsite_id)
     AND (ci.itemsite_costcat_id=cc.costcat_id)
     AND (womatl_wo_id=wo_id)
     AND (wo_itemsite_id=pi.itemsite_id)
     AND (pi.itemsite_costcat_id=pc.costcat_id)
     AND (womatl_id=pWomatlid) );

--  Create linkage to the transaction created
  INSERT INTO womatlpost (womatlpost_wo_id,womatlpost_invhist_id)
              VALUES (_woid,_invhistid);

--  Decrease the parent W/O''s WIP value by the value of the returned components
  UPDATE wo
  SET wo_wipvalue = (wo_wipvalue - (stdcost(itemsite_item_id) * _qty)),
      wo_postedvalue = (wo_postedvalue - (stdcost(itemsite_item_id) * _qty))
  FROM womatl, itemsite
  WHERE ( (wo_id=womatl_wo_id)
   AND (womatl_itemsite_id=itemsite_id)
   AND (womatl_id=pWomatlid) );

  UPDATE womatl
  SET womatl_qtyiss = (womatl_qtyiss - pQty),
      womatl_lastreturn = CURRENT_DATE
  WHERE (womatl_id=pWomatlid);

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION returnWoMaterial(INTEGER, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  _itemlocSeries INTEGER;

BEGIN

  SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  RETURN returnWoMaterial(pWomatlid, pQty, _itemlocSeries);

END;
' LANGUAGE 'plpgsql';
