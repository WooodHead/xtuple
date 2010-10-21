CREATE OR REPLACE FUNCTION shipmentsByItemValue(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pItemsiteid ALIAS FOR $1;
  pPeriodid ALIAS FOR $2;
  _value NUMERIC;
  _startDate DATE;
  _endDate DATE;

BEGIN

  _startDate := findPeriodStart(pPeriodid);
  _endDate := findPeriodEnd(pPeriodid);

-- returns in base currency
  SELECT SUM(currToBase(cohist_curr_id, cohist_qtyshipped * cohist_unitprice, cohist_invcdate)) INTO _value
  FROM cohist, itemsite, item
  WHERE ( (cohist_itemsite_id=itemsite_id)
   AND ( itemsite_item_id=item_id)
   AND ( itemsite_id=pItemsiteid)
   AND ( cohist_invcdate BETWEEN _startDate AND _endDate ) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';
