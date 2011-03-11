CREATE OR REPLACE FUNCTION invReceiptIssueToWomatl(INTEGER, NUMERIC, TEXT, INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pQty ALIAS FOR $2;
  pDocumentNumber ALIAS FOR $3;
  pWomatlid ALIAS FOR $4;
  pComments ALIAS FOR $5;
  _test INTEGER;
  _invhistid INTEGER;

BEGIN

--  Make sure the passed itemsite points to a real item
  IF ( ( SELECT (item_type IN (''R'', ''F'', ''J''))
         FROM itemsite, item
         WHERE ( (itemsite_item_id=item_id)
          AND (itemsite_id=pItemsiteid) ) ) ) THEN
    RETURN 0;
  END IF;

--  Verify the the passed womatl requires the passed itemsite
  SELECT womatl_id INTO _test
  FROM womatl, itemsite
  WHERE ( (womatl_itemsite_id=itemsite_id)
   AND (itemsite_id=pItemsiteid)
   AND (womatl_id=pWomatlid) );
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

--  Post the Receipt
  SELECT postInvTrans( itemsite_id, ''RX'', pQty,
                       ''I/M'', ''WO'', formatWoNumber(womatl_wo_id), pDocumentNumber, pComments,
                       costcat_asset_accnt_id, costcat_liability_accnt_id, 0 ) INTO _invhistid
  FROM womatl, itemsite, costcat
  WHERE ( (itemsite_costcat_id=costcat_id)
   AND (itemsite_id=pItemsiteid)
   AND (womatl_id=pWomatlid) );

--  Post the Issue
  SELECT postInvTrans( ci.itemsite_id, ''IM'', pQty,
                       ''I/M'', ''WO'', formatWoNumber(wo_id), pDocumentNumber, pComments,
                       pc.costcat_wip_accnt_id, cc.costcat_asset_accnt_id, 0 ) INTO _invhistid
  FROM itemsite AS ci, itemsite AS pi,
       costcat AS cc, costcat AS pc,
       womatl, wo
  WHERE ( (ci.itemsite_costcat_id=cc.costcat_id)
   AND (pi.itemsite_costcat_id=pc.costcat_id)
   AND (ci.itemsite_id=pItemsiteid)
   AND (womatl_wo_id=wo_id)
   AND (wo_itemsite_id=pi.itemsite_id)
   AND (womatl_id=pWomatlid) );

--  Increase the parent W/O''s WIP value by the value of the issued components
  UPDATE wo
  SET wo_wipvalue = (wo_wipvalue + (stdcost(itemsite_item_id) * pQty)),
      wo_postedvalue = (wo_postedvalue + (stdcost(itemsite_item_id) * pQty))
  FROM itemsite, womatl
  WHERE ( (womatl_itemsite_id=itemsite_id)
   AND (womatl_wo_id=wo_id)
   AND (womatl_id=pWomatlid) );

  UPDATE womatl
     SET womatl_qtyiss = (womatl_qtyiss + itemuomtouom(itemsite_item_id, NULL, womatl_uom_id, pQty)),
         womatl_lastissue = CURRENT_DATE
    FROM itemsite
   WHERE((womatl_id=pWomatlid)
     AND (womatl_itemsite_id=itemsite_id));

  UPDATE wo
  SET wo_status=''I''
  FROM womatl
  WHERE ( (womatl_wo_id=wo_id)
   AND (wo_status <> ''I'')
   AND (wo_id=pWomatlid) );

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
