CREATE OR REPLACE FUNCTION shipmentsByCustomerValue(INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pCustid ALIAS FOR $1;
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
  WHERE ( (cohist_itemsite_id<>-1)
   AND (cohist_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (cohist_cust_id=pCustid)
   AND (cohist_invcdate BETWEEN _startDate AND _endDate) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION shipmentsByCustomerValue(INTEGER, INTEGER, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pCustid ALIAS FOR $1;
  pPeriodid ALIAS FOR $2;
  pProdcatid ALIAS FOR $3;
  _value NUMERIC;
  _startDate DATE;
  _endDate DATE;

BEGIN

  _startDate := findPeriodStart(pPeriodid);
  _endDate := findPeriodEnd(pPeriodid);

-- returns in base currency
  SELECT SUM(currToBase(cohist_curr_id, cohist_qtyshipped * cohist_unitprice, cohist_invcdate)) INTO _value
  FROM cohist, itemsite, item
  WHERE ( (cohist_cust_id=pCustid)
   AND (cohist_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (item_prodcat_id=pProdcatid)
   AND (cohist_invcdate BETWEEN _startDate AND _endDate) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION shipmentsByCustomerValue(INTEGER, INTEGER, TEXT) RETURNS NUMERIC AS '
DECLARE
  pCustid ALIAS FOR $1;
  pPeriodid ALIAS FOR $2;
  pProdcat ALIAS FOR $3;
  _value NUMERIC;
  _startDate DATE;
  _endDate DATE;

BEGIN

  _startDate := findPeriodStart(pPeriodid);
  _endDate := findPeriodEnd(pPeriodid);

-- returns in base currency
  SELECT SUM(currToBase(cohist_curr_id, cohist_qtyshipped * cohist_unitprice, cohist_invcdate)) INTO _value
  FROM cohist, itemsite, item, prodcat
  WHERE ( (cohist_cust_id=pCustid)
   AND (cohist_itemsite_id=itemsite_id)
   AND (itemsite_item_id=item_id)
   AND (item_prodcat_id=prodcat_id)
   AND (prodcat_code ~ pProdcat)
   AND (cohist_invcdate BETWEEN _startDate AND _endDate) );

  IF (_value IS NULL) THEN
    _value := 0;
  END IF;

  RETURN _value;

END;
' LANGUAGE 'plpgsql';
