CREATE OR REPLACE FUNCTION issueWoMaterial(INTEGER, NUMERIC, INTEGER, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pItemlocSeries ALIAS FOR $3;
  pMarkPush ALIAS FOR $4;
  _itemlocSeries INTEGER;

BEGIN

  SELECT issueWoMaterial(pWomatlid, pQty, pItemlocSeries) INTO _itemlocSeries;

  IF (pMarkPush) THEN
    UPDATE womatl
    SET womatl_issuemethod=''S''
    WHERE ((womatl_issuemethod=''M'')
     AND (womatl_id=pWomatlid));
  END IF;

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION issueWoMaterial(INTEGER, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  _itemlocSeries INTEGER;

BEGIN

  SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  RETURN issueWoMaterial(pWomatlid, pQty, _itemlocSeries);

END;
' LANGUAGE 'plpgsql';
  

CREATE OR REPLACE FUNCTION issueWoMaterial(INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pItemlocSeries ALIAS FOR $3;
  _p RECORD;
  _invhistid INTEGER;
  _itemlocSeries INTEGER;

BEGIN

  IF (pQty < 0) THEN
    RETURN pItemlocSeries;
  END IF;

  SELECT item_id,
         itemsite_id AS c_itemsite_id,
         wo_itemsite_id AS p_itemsite_id,
         itemsite_loccntrl, itemsite_controlmethod,
         womatl_wo_id,
         roundQty(item_fractional, itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, pQty)) AS qty,
         formatWoNumber(wo_id) AS woNumber,
         womatl_issuemethod AS issueMethod INTO _p
  FROM wo, womatl, itemsite, item
  WHERE ( (womatl_wo_id=wo_id)
   AND (womatl_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (womatl_id=pWomatlid) )
  FOR UPDATE;

  IF (pItemlocSeries <> 0) THEN
    _itemlocSeries := pItemlocSeries;
  ELSE
    SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
  END IF;
  SELECT postInvTrans( ci.itemsite_id, ''IM'', _p.qty,
                      ''W/O'', ''WO'', _p.woNumber, '''', ''Material Issue to Work Order'',
                      pc.costcat_wip_accnt_id, cc.costcat_asset_accnt_id, _itemlocSeries ) INTO _invhistid
  FROM itemsite AS ci, itemsite AS pi,
       costcat AS cc, costcat AS pc
  WHERE ( (ci.itemsite_costcat_id=cc.costcat_id)
   AND (pi.itemsite_costcat_id=pc.costcat_id)
   AND (ci.itemsite_id=_p.c_itemsite_id)
   AND (pi.itemsite_id=_p.p_itemsite_id) );

--  Create linkage to the transaction created
  IF (_invhistid != -1) THEN
    INSERT INTO womatlpost (womatlpost_womatl_id,womatlpost_invhist_id)
                VALUES (pWomatlid,_invhistid);
  END IF;

--  Increase the parent W/O''s WIP value by the value of the issued components
  UPDATE wo
  SET wo_wipvalue = (wo_wipvalue + (stdcost(_p.item_id) * _p.qty)),
      wo_postedvalue = (wo_postedvalue + (stdcost(_p.item_id) * _p.qty))
  WHERE (wo_id=_p.womatl_wo_id);

  UPDATE womatl
  SET womatl_qtyiss = (womatl_qtyiss + pQty),
      womatl_lastissue = CURRENT_DATE
  WHERE (womatl_id=pWomatlid);

  UPDATE wo
  SET wo_status=''I''
  WHERE ( (wo_status <> ''I'')
   AND (wo_id=_p.womatl_wo_id) );

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
  

CREATE OR REPLACE FUNCTION issueWoMaterial(INTEGER, NUMERIC, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pMarkPush ALIAS FOR $3;
  _itemlocSeries INTEGER;

BEGIN

  SELECT issueWoMaterial(pWomatlid, pQty) INTO _itemlocSeries;
  IF (_itemlocSeries < 0) THEN
    RETURN _itemlocSeries;
  END IF;

  IF (pMarkPush) THEN
    UPDATE womatl
    SET womatl_issuemethod=''S''
    WHERE ((womatl_issuemethod=''M'')
     AND (womatl_id=pWomatlid));
  END IF;

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
