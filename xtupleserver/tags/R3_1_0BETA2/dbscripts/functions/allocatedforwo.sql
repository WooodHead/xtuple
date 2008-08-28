CREATE OR REPLACE FUNCTION allocatedForWo(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pLookAheadDays ALIAS FOR $2;

BEGIN

  RETURN allocatedForWo(pItemsiteid, startOfTime(), (CURRENT_DATE + pLookaheadDays));

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION allocatedForWo(INTEGER, DATE) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pDate ALIAS FOR $2;

BEGIN

  RETURN allocatedForWo(pItemsiteid, startOfTime(), pDate);

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION allocatedForWo(INTEGER, DATE, DATE) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pStartDate ALIAS FOR $2;
  pEndDate ALIAS FOR $3;
  _qty NUMERIC;

BEGIN

  SELECT COALESCE(SUM(noNeg(itemuomtouom(itemsite_item_id, womatl_uom_id, NULL, womatl_qtyreq - womatl_qtyiss))), 0.0) INTO _qty
  FROM wo, womatl, itemsite
  WHERE ( (womatl_itemsite_id=pItemsiteid)
   AND (womatl_itemsite_id=itemsite_id)
   AND (womatl_duedate BETWEEN pStartDate AND pEndDate) 
   AND (wo_id=womatl_wo_id)
   AND (wo_status IN (''E'',''I'',''R'')) );

  RETURN _qty;

END;
' LANGUAGE 'plpgsql';
