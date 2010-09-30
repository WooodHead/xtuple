CREATE OR REPLACE FUNCTION bookingsByItemQty(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pPeriodid ALIAS FOR $2;
  _value NUMERIC;
  _startDate DATE;
  _endDate DATE;

BEGIN

  _startDate := findPeriodStart(pPeriodid);
  _endDate := findPeriodEnd(pPeriodid);

  SELECT SUM(coitem_qtyord) INTO _value
  FROM coitem, cohead
  WHERE ( (coitem_cohead_id=cohead_id)
   AND (coitem_status <> ''X'')
   AND (coitem_itemsite_id=pItemsiteid)
   AND ( cohead_orderdate BETWEEN _startDate AND _endDate ) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';
