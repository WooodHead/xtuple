CREATE OR REPLACE FUNCTION bookingsByCustomerValue(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pCustid ALIAS FOR $1;
  pPeriodid ALIAS FOR $2;
  _value NUMERIC;
  _startDate DATE;
  _endDate DATE;

BEGIN

  _startDate := findPeriodStart(pPeriodid);
  _endDate := findPeriodEnd(pPeriodid);

  SELECT SUM(round((coitem_qtyord * coitem_qty_invuomratio) *
                   (currtobase(cohead_curr_id, coitem_price, cohead_orderdate) / coitem_price_invuomratio), 2)) INTO _value
  FROM coitem, cohead, itemsite, item
  WHERE ( (cohead_cust_id=pCustid)
   AND (coitem_cohead_id=cohead_id)
   AND (coitem_status <> ''X'')
   AND (coitem_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND ( cohead_orderdate BETWEEN _startDate AND _endDate ) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';
