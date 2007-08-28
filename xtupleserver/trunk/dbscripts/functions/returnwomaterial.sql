
CREATE OR REPLACE FUNCTION returnWoMaterial(INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pItemlocSeries ALIAS FOR $3;
  _woNumber TEXT;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

  _itemlocSeries := 0;
  
  IF ( SELECT (womatl_qtyiss < pQty)
       FROM womatl
       WHERE (womatl_id=pWomatlid) ) THEN
    RETURN pItemlocSeries;
  END IF;

  SELECT formatWoNumber(womatl_wo_id) INTO _woNumber
  FROM womatl
  WHERE (womatl_id=pWomatlid);

  IF (pItemlocSeries = 0) THEN
    SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  ELSE
    _itemlocSeries = pItemlocSeries;
  END IF;
  SELECT postInvTrans( itemsite_id, ''IM'', (pQty * -1), 
                       ''W/O'', ''WO'', _woNumber, '''', ''Return Material from Work Order'',
                       costcat_wip_accnt_id, costcat_asset_accnt_id, _itemlocSeries ) INTO _invhistid
  FROM womatl, itemsite, costcat
  WHERE ( (womatl_itemsite_id=itemsite_id)
   AND (itemsite_costcat_id=costcat_id)
   AND (womatl_id=pWomatlid) );

--  Decrease the parent W/O''s WIP value by the value of the returned components
  UPDATE wo
  SET wo_wipvalue = (wo_wipvalue - (stdcost(itemsite_item_id) * pQty)),
      wo_postedvalue = (wo_postedvalue - (stdcost(itemsite_item_id) * pQty))
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