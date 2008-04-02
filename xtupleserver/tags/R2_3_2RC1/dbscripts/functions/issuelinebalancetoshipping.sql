CREATE OR REPLACE FUNCTION issueLineBalanceToShipping(INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN issueLineBalanceToShipping(''SO'', $1, NULl);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION issueLineBalanceToShipping(TEXT, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pordertype		ALIAS FOR $1;
  pitemid		ALIAS FOR $2;
  ptimestamp		ALIAS FOR $3;
  _itemlocSeries	INTEGER := 0;
  _qty			NUMERIC;

BEGIN
  IF (pordertype = ''SO'') THEN
    SELECT noNeg( coitem_qtyord - coitem_qtyshipped + coitem_qtyreturned - 
                ( SELECT COALESCE(SUM(shipitem_qty), 0)
                  FROM shipitem, shiphead
                  WHERE ((shipitem_orderitem_id=coitem_id)
                    AND  (shipitem_shiphead_id=shiphead_id)
                    AND  (NOT shiphead_shipped) ) ) ) INTO _qty
    FROM coitem
    WHERE (coitem_id=pitemid);
  ELSEIF (pordertype = ''TO'') THEN
    SELECT noNeg( toitem_qty_ordered - toitem_qty_shipped - 
                ( SELECT COALESCE(SUM(shipitem_qty), 0)
                  FROM shipitem, shiphead
                  WHERE ( (shipitem_orderitem_id=toitem_id)
                   AND (shipitem_shiphead_id=shiphead_id)
                   AND (NOT shiphead_shipped) ) ) ) INTO _qty
    FROM toitem
    WHERE (toitem_id=pitemid);
  ELSE
    RETURN -1;
  END IF;

  IF (_qty > 0) THEN
    _itemlocSeries := issueToShipping(pordertype, pitemid, _qty, 0, ptimestamp);
  END IF;

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
