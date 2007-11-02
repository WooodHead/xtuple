CREATE OR REPLACE FUNCTION orderedByWo(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pLookAheadDays ALIAS FOR $2;

BEGIN

  RETURN orderedByWo(pItemsiteid, startOfTime(), (CURRENT_DATE + pLookAheadDays));

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION orderedByWo(INTEGER, DATE, DATE) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pStartDate ALIAS FOR $2;
  pEndDate ALIAS FOR $3;
  _itemType CHARACTER(1);
  _qty NUMERIC;

BEGIN

  SELECT item_type INTO _itemType
  FROM itemsite, item
  WHERE ( (itemsite_item_id=item_id)
   AND (itemsite_id=pItemsiteid) );
  
  IF (_itemType = ''M'') THEN
    SELECT COALESCE(SUM(noNeg(wo_qtyord - wo_qtyrcv)), 0.0) INTO _qty
    FROM wo
    WHERE ( (wo_status <> ''C'')
     AND (wo_itemsite_id=pItemsiteid)
     AND (wo_duedate BETWEEN pStartDate AND pEndDate) );
  ELSIF (_itemType = ''C'') THEN
    SELECT COALESCE(SUM((noNeg(wo_qtyord - wo_qtyrcv) * brddist_stdqtyper)), 0.0) INTO _qty
    FROM wo, brddist
    WHERE ( (wo_status <> ''C'')
     AND (brddist_wo_id=wo_id)
     AND (brddist_itemsite_id=pItemsiteid)
     AND (wo_duedate BETWEEN pStartDate AND pEndDate) );
  ELSE
    RETURN 0.0;
  END IF;

  RETURN _qty;

END;
' LANGUAGE 'plpgsql';
