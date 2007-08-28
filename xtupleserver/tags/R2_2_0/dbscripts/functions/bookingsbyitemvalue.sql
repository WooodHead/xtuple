CREATE OR REPLACE FUNCTION bookingsByItemValue(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pPeriodid ALIAS FOR $2;
  _value NUMERIC;
  _startDate DATE;
  _endDate DATE;

BEGIN

  _startDate := findPeriodStart(pPeriodid);
  _endDate := findPeriodEnd(pPeriodid);

  SELECT SUM(round(coitem_qtyord * coitem_price / item_invpricerat,2)) INTO _value
  FROM coitem, cohead, itemsite, item
  WHERE ( (coitem_cohead_id=cohead_id)
   AND (coitem_status <> ''X'')
   AND (coitem_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (itemsite_id=pItemsiteid)
   AND (cohead_orderdate BETWEEN _startDate AND _endDate) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';
