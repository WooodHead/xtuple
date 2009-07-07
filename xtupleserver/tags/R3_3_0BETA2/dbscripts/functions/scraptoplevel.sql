

CREATE OR REPLACE FUNCTION scrapTopLevel(INTEGER, NUMERIC) RETURNS INTEGER AS '
DECLARE
  pWoid		ALIAS FOR $1;
  pQty		ALIAS FOR $2;

BEGIN
  RETURN scrapTopLevel(pWoid, pQty, FALSE);
END;
' LANGUAGE 'plpgsql';

-- keep pIssueRepl code in sync with scrapWoMaterial above
CREATE OR REPLACE FUNCTION scrapTopLevel(INTEGER, NUMERIC, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pWoid		ALIAS FOR $1;
  pQty		ALIAS FOR $2;
  pIssueRepl	ALIAS FOR $3;
  _toIssue		NUMERIC;
  _itemlocSeries	INTEGER := 0;
  _p			RECORD;

BEGIN
    IF (pIssueRepl) THEN
      FOR _p IN SELECT womatl_id, (pQty * womatl_qtyper) AS toScrap,
		       womatl_qtyreq - roundQty(item_fractional, womatl_qtyper * wo_qtyord) AS preAlloc,
		       womatl_qtywipscrap
		FROM womatl, wo, itemsite, item
		WHERE ((womatl_wo_id=pWoid)
		  AND  (womatl_wo_id=wo_id)
		  AND  (womatl_itemsite_id=itemsite_id)
		  AND  (itemsite_item_id=item_id)) LOOP
	_toIssue := _p.toScrap - NoNeg(_p.preAlloc - _p.womatl_qtywipscrap);
	IF (_toIssue > 0) THEN
	  _itemlocSeries := issueWoMaterial(_p.womatl_id, _toIssue, _itemlocSeries);
	  IF (_itemlocSeries < 0) THEN
	    RETURN _itemlocSeries;
	  END IF;
	END IF;

	UPDATE womatl
	SET womatl_qtywipscrap=(womatl_qtywipscrap + _p.toScrap),
	    womatl_qtyiss=(womatl_qtyiss - _p.toScrap)
	WHERE (womatl_id=_p.womatl_id);
      END LOOP;
    END IF;

    -- BIG ASSUMPTION - the item to scrap has been received into inventory
    SELECT invScrap(itemsite_id, pQty, formatWoNumber(wo_id),
		    ''Top Level Item'') INTO _itemlocSeries
    FROM wo, itemsite
    WHERE ((wo_id=pWoid)
      AND  (itemsite_id=wo_itemsite_id));

    RETURN _itemlocSeries;
END;
' LANGUAGE 'plpgsql';