CREATE OR REPLACE FUNCTION itemPrice(INTEGER, INTEGER, NUMERIC) RETURNS NUMERIC AS '
DECLARE
  pItemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pQty ALIAS FOR $3;

BEGIN
  RETURN itemPrice(pItemid, pCustid, -1, pQty, baseCurrId(), CURRENT_DATE);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION itemPrice(INTEGER, INTEGER, INTEGER, NUMERIC) RETURNS NUMERIC AS '
DECLARE
  pItemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pShiptoid ALIAS FOR $3;
  pQty ALIAS FOR $4;

BEGIN
  RETURN itemPrice(pItemid, pCustid, pShiptoid, pQty, baseCurrId(), CURRENT_DATE);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION itemPrice(INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pItemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pShiptoid ALIAS FOR $3;
  pQty ALIAS FOR $4;
  pCurrid ALIAS FOR $5;

BEGIN
  RETURN itemPrice(pItemId, pCustid, pShiptoid, pQty, pCurrid, CURRENT_DATE);
END;
' LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION itemPrice(INTEGER, INTEGER, INTEGER, NUMERIC, INTEGER, DATE) RETURNS NUMERIC AS '
DECLARE
  pItemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pShiptoid ALIAS FOR $3;
  pQty ALIAS FOR $4;
  pCurrid ALIAS FOR $5;
  pEffective ALIAS FOR $6;
  _price NUMERIC;
  _sales NUMERIC;
  _item RECORD;

BEGIN
-- Return the itemPrice in the currency passed in as pCurrid

-- First get a sales price if any so we when we find other prices
-- we can determine if we want that price or this price.
--  Check for a Sale Price
  SELECT MIN(currToCurr(ipshead_curr_id, pCurrid,
                      ipsprice_price - (ipsprice_price * cust_discntprcnt),
                      pEffective)) INTO _sales
  FROM ipsprice, ipshead, sale, cust
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (sale_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN sale_startdate AND sale_enddate)
   AND (ipsprice_qtybreak <= pQty)
   AND (ipsprice_item_id=pItemid)
   AND (cust_id=pCustid) );

--  Check for a Customer Shipto Price
  SELECT MIN(currToCurr(ipshead_curr_id, pCurrid, ipsprice_price, pEffective)) INTO _price
  FROM ipsprice, ipshead, ipsass
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_qtybreak <= pQty)
   AND (ipsprice_item_id=pItemid)
   AND (ipsass_shipto_id != -1)
   AND (ipsass_shipto_id=pShiptoid) );

  IF (_price IS NOT NULL) THEN
    IF ((_sales IS NOT NULL) AND (_sales < _price)) THEN
      RETURN _sales;
    END IF;
    RETURN _price;
  END IF;

--  Check for a Customer Shipto Pattern Price
  SELECT MIN(currToCurr(ipshead_curr_id, pCurrid, ipsprice_price, pEffective)) INTO _price
  FROM ipsprice, ipshead, ipsass, shipto
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_qtybreak <= pQty)
   AND (ipsprice_item_id=pItemid)
   AND (COALESCE(length(ipsass_shipto_pattern), 0) > 0)
   AND (shipto_num ~ ipsass_shipto_pattern)
   AND (ipsass_cust_id=pCustid)
   AND (shipto_id=pShiptoid) );

  IF (_price IS NOT NULL) THEN
    IF ((_sales IS NOT NULL) AND (_sales < _price)) THEN
      RETURN _sales;
    END IF;
    RETURN _price;
  END IF;

--  Check for a Customer Price
  SELECT MIN(currToCurr(ipshead_curr_id, pCurrid, ipsprice_price, pEffective)) INTO _price
  FROM ipsprice, ipshead, ipsass
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_qtybreak <= pQty)
   AND (ipsprice_item_id=pItemid)
   AND (COALESCE(length(ipsass_shipto_pattern), 0) = 0)
   AND (ipsass_cust_id=pCustid) );

  IF (_price IS NOT NULL) THEN
    IF ((_sales IS NOT NULL) AND (_sales < _price)) THEN
      RETURN _sales;
    END IF;
    RETURN _price;
  END IF;

--  Check for a Customer Type Price
  SELECT MIN(currToCurr(ipshead_curr_id, pCurrid, ipsprice_price, pEffective)) INTO _price
  FROM ipsprice, ipshead, ipsass, cust
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (ipsass_custtype_id=cust_custtype_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_qtybreak <= pQty)
   AND (ipsprice_item_id=pItemid)
   AND (cust_id=pCustid) );

  IF (_price IS NOT NULL) THEN
    IF ((_sales IS NOT NULL) AND (_sales < _price)) THEN
      RETURN _sales;
    END IF;
    RETURN _price;
  END IF;

--  Check for a Customer Type Pattern Price
  SELECT MIN(currToCurr(ipshead_curr_id, pCurrid, ipsprice_price, pEffective)) INTO _price
  FROM ipsprice, ipshead, ipsass, custtype, cust
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (coalesce(length(ipsass_custtype_pattern), 0) > 0)
   AND (custtype_code ~ ipsass_custtype_pattern)
   AND (cust_custtype_id=custtype_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_qtybreak <= pQty)
   AND (ipsprice_item_id=pItemid)
   AND (cust_id=pCustid) );

  IF (_price IS NOT NULL) THEN
    IF ((_sales IS NOT NULL) AND (_sales < _price)) THEN
      RETURN _sales;
    END IF;
    RETURN _price;
  END IF;

-- If we have not found another price yet and we have a
-- sales price we will use that.
  IF (_sales IS NOT NULL) THEN
    RETURN _sales;
  END IF;

--  Check for a list price
  SELECT MIN(currToLocal(pCurrid,
                       item_listprice - (item_listprice * COALESCE(cust_discntprcnt, 0)),
                       pEffective)) AS price,
         item_exclusive INTO _item
  FROM item LEFT OUTER JOIN cust ON (cust_id=pCustid)
  WHERE (item_id=pItemid)
  GROUP BY item_exclusive;
  IF (FOUND) THEN
    IF (NOT _item.item_exclusive) THEN
      IF (_item.price < 0) THEN
        RETURN 0;
      ELSE
        RETURN _item.price;
      END IF;
    ELSE
      RETURN -9999;
    END IF;
  ELSE
    RETURN -9999;
  END IF;

END;
' LANGUAGE 'plpgsql';
