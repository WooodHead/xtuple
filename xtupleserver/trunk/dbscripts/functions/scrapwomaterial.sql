CREATE OR REPLACE FUNCTION scrapWoMaterial(INTEGER, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWomatlid ALIAS FOR $1;
  pQty ALIAS FOR $2;

BEGIN
  RETURN scrapWoMaterial(pWomatlid, pQty, FALSE);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION scrapWoMaterial(INTEGER, NUMERIC, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pWomatlid	ALIAS FOR $1;
  pQty		ALIAS FOR $2;
  pIssueRepl	ALIAS FOR $3;
  _toIssue		NUMERIC;
  _toScrap		NUMERIC;
  _preAlloc		NUMERIC;
  _wipScrap		NUMERIC;
  _itemlocSeries	INTEGER;
  _itemid               INTEGER;
  _uomid                INTEGER;

BEGIN
  IF (pIssueRepl) THEN
    SELECT womatl_qtyreq - roundQty(itemuomfractionalbyuom(itemsite_item_id, womatl_uom_id), womatl_qtyper * wo_qtyord),
	   womatl_qtywipscrap, itemsite_item_id, womatl_uom_id INTO _preAlloc, _wipScrap, _itemid, _uomid
    FROM womatl, wo, itemsite, item
    WHERE ((womatl_id=pWomatlid)
      AND  (womatl_wo_id=wo_id)
      AND  (womatl_itemsite_id=itemsite_id)
      AND  (itemsite_item_id=item_id));
    _toIssue := pQty - NoNeg(_preAlloc - _wipScrap);

    IF (_toIssue > 0) THEN
      _itemlocSeries := issueWoMaterial(pWomatlid, _toIssue);
      IF (_itemlocSeries < 0) THEN
	RETURN -1;
      END IF;

      PERFORM insertGLTransaction( ''W/O'', ''WO'', formatWoNumber(womatl_wo_id), ''Scrap Material from Work Order'',
				   costcat_wip_accnt_id, costcat_mfgscrap_accnt_id, -1,
				   (stdCost(itemsite_item_id) * itemuomtouom(_itemid, _uomid, NULL, _toIssue)), CURRENT_DATE )
      FROM womatl, itemsite, costcat
      WHERE ( (womatl_itemsite_id=itemsite_id)
       AND (itemsite_costcat_id=costcat_id)
       AND (womatl_id=pWomatlid) );
    END IF;

    _toScrap = pQty;

  ELSIF ( ( SELECT ((womatl_qtyiss - womatl_qtywipscrap) >= pQty)
	     FROM womatl
	     WHERE (womatl_id=pWomatlid) ) ) THEN

    --  Distribute to G/L
    PERFORM insertGLTransaction( ''W/O'', ''WO'', formatWoNumber(womatl_wo_id),
				 ''Scrap Material from Work Order'',
				 costcat_wip_accnt_id, costcat_mfgscrap_accnt_id, -1,
				 (stdCost(itemsite_item_id) * itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, pQty)), CURRENT_DATE )
    FROM womatl, itemsite, costcat
    WHERE ( (womatl_itemsite_id=itemsite_id)
     AND (itemsite_costcat_id=costcat_id)
     AND (womatl_id=pWomatlid) );

    _toScrap = pQty;

  ELSE
    _toScrap = 0;
  END IF;

  IF (_toScrap > 0) THEN
    UPDATE womatl
    SET womatl_qtywipscrap=(womatl_qtywipscrap + _toScrap),
	womatl_qtyiss=(womatl_qtyiss - _toScrap)
    WHERE (womatl_id=pWomatlid);

    RETURN pWomatlid;
  END IF;

  RETURN 0;
END;
' LANGUAGE 'plpgsql';
