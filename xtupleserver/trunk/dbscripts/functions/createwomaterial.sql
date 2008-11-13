CREATE OR REPLACE FUNCTION createWoMaterial(INTEGER, INTEGER, char(1), NUMERIC, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  pItemsiteid ALIAS FOR $2;
  pIssueMethod ALIAS FOR $3;
  pQtyPer ALIAS FOR $4;
  pScrap ALIAS FOR $5;
  _result INTEGER;
BEGIN
  SELECT createWoMaterial(pWoid, pItemsiteid, pIssueMethod, item_inv_uom_id, pQtyPer, pScrap)
    INTO _result
    FROM itemsite JOIN item ON (itemsite_item_id=item_id)
   WHERE(itemsite_id=pItemsiteid);
  RETURN _result;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createWoMaterial(INTEGER, INTEGER, char(1), INTEGER, NUMERIC, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  pItemsiteid ALIAS FOR $2;
  pIssueMethod ALIAS FOR $3;
  pUomId ALIAS FOR $4;
  pQtyPer ALIAS FOR $5;
  pScrap ALIAS FOR $6;
  _womatlid INTEGER;

BEGIN

  SELECT createWoMaterial(pWoid,pItemsiteid,pIssueMethod,pUomId,pQtyPer,pScrap,-1, NULL, NULL) INTO _womatlid;

  RETURN _womatlid;
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createWoMaterial(INTEGER, INTEGER, char(1), INTEGER, NUMERIC, NUMERIC, INTEGER, TEXT, TEXT) RETURNS INTEGER AS '
DECLARE
  pWoid ALIAS FOR $1;
  pItemsiteid ALIAS FOR $2;
  pIssueMethod ALIAS FOR $3;
  pUomId ALIAS FOR $4;
  pQtyPer ALIAS FOR $5;
  pScrap ALIAS FOR $6;
  pBomitemId ALIAS FOR $7;
  pNotes ALIAS FOR $8;
  pRef ALIAS FOR $9;
  _womatlid INTEGER;

BEGIN

  _womatlid := (SELECT NEXTVAL(''womatl_womatl_id_seq''));

  INSERT INTO womatl
  ( womatl_id, womatl_wo_id, womatl_itemsite_id,
    womatl_issuemethod, womatl_uom_id, womatl_qtyper, womatl_scrap,
    womatl_qtyreq, womatl_qtyiss, womatl_qtywipscrap,
    womatl_wooper_id, womatl_bomitem_id, womatl_duedate, womatl_notes, womatl_ref )
  SELECT _womatlid, wo_id, pItemsiteid,
         pIssueMethod, pUomId, pQtyPer, pScrap,
         roundQty(item_fractional, (wo_qtyord * (pQtyPer * (1 + pScrap)))), 0, 0,
         -1, pBomitemId, wo_startdate, pNotes, pRef 
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


