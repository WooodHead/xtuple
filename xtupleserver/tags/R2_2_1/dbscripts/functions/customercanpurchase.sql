CREATE OR REPLACE FUNCTION customerCanPurchase(INTEGER, INTEGER) RETURNS BOOL AS '
DECLARE
  pitemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;

BEGIN
  RETURN customerCanPurchase(pitemid, pCustid, -1);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION customerCanPurchase(INTEGER, INTEGER, INTEGER) RETURNS BOOL AS '
DECLARE
  pitemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pShiptoid AlIAS FOR $3;
  _id INTEGER;

BEGIN

--  Make sure that this is at least a sold Item
  IF ( SELECT (NOT item_sold)
       FROM item 
       WHERE (item_id=pItemid) ) THEN
    RETURN FALSE;
  END IF;

--  Everyone can purchase a non-exclusive item
  IF ( SELECT (NOT item_exclusive)
       FROM item
       WHERE (item_id=pItemid) ) THEN
    RETURN TRUE;
  END IF;

--  Check for a shipto Assigned Price
  SELECT ipsprice_id INTO _id
  FROM ipsprice, ipshead, ipsass
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_item_id=pItemid)
   AND (ipsass_shipto_id != -1)
   AND (ipsass_shipto_id=pShiptoid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN TRUE;
  END IF;

--  Check for a Shipto Pattern Assigned Price
  SELECT ipsprice_id INTO _id
  FROM ipsprice, ipshead, ipsass, shipto
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (COALESCE(length(ipsass_shipto_pattern), 0) > 0)
   AND (shipto_num ~ ipsass_shipto_pattern)
   AND (ipsass_cust_id=pCustid)
   AND (ipsprice_item_id=pItemid)
   AND (shipto_id=pShiptoid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN TRUE;
  END IF;

--  Check for a Customer Assigned Price
  SELECT ipsprice_id INTO _id
  FROM ipsprice, ipshead, ipsass
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_item_id=pItemid)
   AND (COALESCE(length(ipsass_shipto_pattern), 0) = 0)
   AND (ipsass_cust_id=pCustid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN TRUE;
  END IF;

--  Check for a Customer Type Assigned Price
  SELECT ipsprice_id INTO _id
  FROM ipsprice, ipshead, ipsass, cust
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (ipsass_custtype_id != -1)
   AND (cust_custtype_id = ipsass_custtype_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_item_id=pItemid)
   AND (cust_id=pCustid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN TRUE;
  END IF;

--  Check for a Customer Type Pattern Assigned Price
  SELECT ipsprice_id INTO _id
  FROM ipsprice, ipshead, ipsass, custtype, cust
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
   AND (ipsass_ipshead_id=ipshead_id)
   AND (coalesce(length(ipsass_custtype_pattern), 0) > 0)
   AND (custtype_code ~ ipsass_custtype_pattern)
   AND (cust_custtype_id=custtype_id)
   AND (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
   AND (ipsprice_item_id=pItemid)
   AND (cust_id=pCustid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN TRUE;
  END IF;

--  That''s it, Sales don''t count - yet
  RETURN FALSE;

END;
' LANGUAGE 'plpgsql';
