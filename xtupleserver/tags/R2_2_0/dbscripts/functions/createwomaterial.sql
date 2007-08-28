CREATE OR REPLACE FUNCTION createWoMaterial(INTEGER, INTEGER, char(1), NUMERIC, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  pItemsiteid ALIAS FOR $2;
  pIssueMethod ALIAS FOR $3;
  pQtyPer ALIAS FOR $4;
  pScrap ALIAS FOR $5;
  _womatlid INTEGER;

BEGIN

  _womatlid := (SELECT NEXTVAL(''womatl_womatl_id_seq''));

  INSERT INTO womatl
  ( womatl_id, womatl_wo_id, womatl_itemsite_id,
    womatl_issuemethod, womatl_qtyper, womatl_scrap,
    womatl_qtyreq, womatl_qtyiss, womatl_qtywipscrap,
    womatl_wooper_id, womatl_bomitem_id, womatl_duedate )
  SELECT _womatlid, wo_id, pItemsiteid,
         pIssueMethod, pQtyPer, pScrap,
         roundQty(item_fractional, (wo_qtyord * (pQtyPer * (1 + pScrap)))), 0, 0,
         -1, -1, wo_startdate
  FROM wo, itemsite, item
  WHERE ( (itemsite_item_id=item_id)
   AND (wo_id=pWoid)
   AND (itemsite_id=pItemsiteid) );

  UPDATE wo
  SET wo_adhoc=TRUE
  WHERE (wo_id=pWoid);

  UPDATE wo
  SET wo_status=''E''
  WHERE ( (wo_status=''O'')
   AND (wo_id=pWoid) );

  RETURN _womatlid;
END;
' LANGUAGE 'plpgsql';