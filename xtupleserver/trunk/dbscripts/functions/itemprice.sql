
CREATE OR REPLACE FUNCTION itemPrice(pItemid INTEGER,
                                     pCustid INTEGER,
                                     pShiptoid INTEGER,
                                     pQty NUMERIC,
                                     pCurrid INTEGER,
                                     pEffective DATE) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _item RECORD;

BEGIN
  SELECT item_inv_uom_id, item_price_uom_id
    INTO _item
    FROM item
   WHERE(item_id=pItemid);
  IF (FOUND) THEN
    RETURN itemPrice(pItemid, pCustid, pShiptoid, pQty, _item.item_inv_uom_id, _item.item_price_uom_id, pCurrid, pEffective);
  END IF;
  RETURN -9999;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION itemPrice(pItemid INTEGER,
                                     pCustid INTEGER,
                                     pShiptoid INTEGER,
                                     pQty NUMERIC,
                                     pQtyUOM INTEGER,
                                     pPriceUOM INTEGER,
                                     pCurrid INTEGER,
                                     pEffective DATE) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE

BEGIN
  RETURN itemPrice(pItemid, pCustid, pShiptoid, pQty, pQtyUOM, pPriceUOM, pCurrid, pEffective, CURRENT_DATE);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION itemPrice(pItemid INTEGER,
                                     pCustid INTEGER,
                                     pShiptoid INTEGER,
                                     pQty NUMERIC,
                                     pQtyUOM INTEGER,
                                     pPriceUOM INTEGER,
                                     pCurrid INTEGER,
                                     pEffective DATE,
                                     pAsOf DATE) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pItemid ALIAS FOR $1;
  pCustid ALIAS FOR $2;
  pShiptoid ALIAS FOR $3;
  pQty ALIAS FOR $4;
  pQtyUOM ALIAS FOR $5;
  pPriceUOM ALIAS FOR $6;
  pCurrid ALIAS FOR $7;
  pEffective ALIAS FOR $8;
  pAsOf ALIAS FOR $9;

BEGIN
  RETURN itemPrice(pItemid, pCustid, pShiptoid, pQty, pQtyUOM, pPriceUOM, pCurrid, pEffective, pAsOf, NULL);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION itemPrice(pItemid INTEGER,
                                     pCustid INTEGER,
                                     pShiptoid INTEGER,
                                     pQty NUMERIC,
                                     pQtyUOM INTEGER,
                                     pPriceUOM INTEGER,
                                     pCurrid INTEGER,
                                     pEffective DATE,
                                     pAsOf DATE,
                                     pSiteid INTEGER) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _price NUMERIC;
  _sales NUMERIC;
  _r RECORD;
  _item RECORD;
  _cust RECORD;
  _shipto RECORD;
  _iteminvpricerat NUMERIC;
  _qty NUMERIC;
  _asof DATE;
  _debug BOOLEAN := true;

BEGIN
-- Return the itemPrice in the currency passed in as pCurrid
  _qty := itemuomtouom(pItemid, pQtyUOM, NULL, pQty);

-- If no as of passed, use current date
  _asof := COALESCE(pAsOf, CURRENT_DATE);

-- Get a value here so we do not have to call the function several times
  SELECT itemuomtouomratio(pItemid, pPriceUOM, NULL) AS ratio
    INTO _iteminvpricerat;

--  Cache Item, Customer and Shipto
  SELECT * INTO _item
  FROM item
  WHERE (item_id=pItemid);

  SELECT * INTO _cust
  FROM custinfo JOIN custtype ON (custtype_id=cust_custtype_id)
  WHERE (cust_id=pCustid);

  SELECT * INTO _shipto
  FROM shiptoinfo
  WHERE (shipto_id=pShiptoid);

-- First get a sales price if any so we when we find other prices
-- we can determine if we want that price or this price.
--  Check for a Sale Price
  SELECT currToCurr(ipshead_curr_id, pCurrid, ipsprice_price, pEffective) INTO _sales
  FROM (
  SELECT ipsitem_ipshead_id AS ipsprice_ipshead_id,
         CASE WHEN ipsitem_type = 'N' THEN (ipsitem_price * itemuomtouomratio(ipsitem_item_id, NULL, ipsitem_price_uom_id)) * _iteminvpricerat
              WHEN ipsitem_type = 'D' THEN noNeg(_item.item_listprice - (_item.item_listprice * ipsitem_discntprcnt) - ipsitem_fixedamtdiscount)
              WHEN ipsitem_type = 'M' THEN (_item.item_listcost + (_item.item_listcost * ipsitem_discntprcnt) + ipsitem_fixedamtdiscount)
              ELSE 0.00
         END AS ipsprice_price,
         CASE WHEN (ipsitem_item_id=_item.item_id) THEN itemuomtouom(ipsitem_item_id, ipsitem_qty_uom_id, NULL, ipsitem_qtybreak)
              ELSE ipsitem_qtybreak
         END AS ipsprice_qtybreak,
         (ipsitem_price_uom_id=COALESCE(pPriceUOM,-1)) AS uommatched
    FROM ipsiteminfo
   WHERE(ipsitem_item_id=_item.item_id) OR (ipsitem_prodcat_id=_item.item_prodcat_id) ) AS
        ipsprice, ipshead, sale
  WHERE ( (ipsprice_ipshead_id=ipshead_id)
    AND   (sale_ipshead_id=ipsprice_ipshead_id)
    AND   (_asof BETWEEN sale_startdate AND sale_enddate)
    AND   (ipsprice_qtybreak <= _qty) )
  ORDER BY uommatched DESC, ipsprice_qtybreak DESC, ipsprice_price ASC
  LIMIT 1;

-- Find the best Price Schedule Price
 
  SELECT INTO _r
    *, currToCurr(ipshead_curr_id, pCurrid, protoprice, pEffective) AS rightprice
  
  FROM (
    SELECT *,
           CASE WHEN (COALESCE(ipsass_shipto_id, -1) > 0) THEN 1
             WHEN (COALESCE(LENGTH(ipsass_shipto_pattern), 0) > 0) THEN 2
             WHEN (COALESCE(ipsass_cust_id, -1) > 0) THEN 3
             WHEN (COALESCE(ipsass_custtype_id, -1) > 0) THEN 4
             WHEN (COALESCE(LENGTH(ipsass_custtype_pattern), 0) > 0) THEN 5
             ELSE 99
           END AS assignseq,
           CASE WHEN ipsitem_type = 'N' THEN (ipsitem_price * itemuomtouomratio(_item.item_id, NULL, ipsitem_price_uom_id)) * _iteminvpricerat
                WHEN ipsitem_type = 'D' THEN noNeg(_item.item_listprice - (_item.item_listprice * ipsitem_discntprcnt) - ipsitem_fixedamtdiscount)
                WHEN ipsitem_type = 'M' THEN (_item.item_listcost + (_item.item_listcost * ipsitem_discntprcnt) + ipsitem_fixedamtdiscount)
                ELSE 0.00
           END AS protoprice,
           CASE WHEN (ipsitem_item_id=_item.item_id) THEN itemuomtouom(ipsitem_item_id, ipsitem_qty_uom_id, NULL, ipsitem_qtybreak)
                ELSE ipsitem_qtybreak
           END AS protoqtybreak,
           (COALESCE(ipsitem_price_uom_id, -1)=COALESCE(pPriceUOM, -1)) AS uommatched
    FROM ipsass JOIN ipshead ON (ipshead_id=ipsass_ipshead_id)
                JOIN ipsiteminfo ON (ipsitem_ipshead_id=ipshead_id)
    WHERE ((ipsitem_item_id=_item.item_id) OR (ipsitem_prodcat_id=_item.item_prodcat_id))
      AND (_asof BETWEEN ipshead_effective AND ipshead_expires)
      AND ((ipsitem_warehous_id=pSiteid) OR (pSiteid IS NULL))
      AND ( (ipsass_shipto_id=_shipto.shipto_id)
       OR   ((COALESCE(LENGTH(ipsass_shipto_pattern), 0) > 0) AND (_shipto.shipto_num ~ ipsass_shipto_pattern))
       OR   (ipsass_cust_id=_cust.cust_id)
       OR   (ipsass_custtype_id=_cust.cust_custtype_id)
       OR   ((COALESCE(LENGTH(ipsass_custtype_pattern), 0) > 0) AND (_cust.custtype_code ~ ipsass_custtype_pattern))
          )
  ) AS proto
  WHERE (protoqtybreak <= pQty)
  ORDER BY assignseq, protoqtybreak DESC, rightprice
  LIMIT 1;
 
  IF (_r.rightprice IS NOT NULL) THEN
    IF ((_sales IS NOT NULL) AND (_sales < _r.rightprice)) THEN
      IF(_debug) THEN
        raise notice 'itemprice, item=%, cust=%, shipto=%, sale price= %', pItemid, pCustid, pShiptoid, _sales;
      END IF;
      RETURN _sales;
    END IF;
    IF(_debug) THEN
      raise notice 'itemprice, item=%, cust=%, shipto=%, schedule price= %', pItemid, pCustid, pShiptoid, _r.rightprice;
    END IF;
    RETURN _r.rightprice;
  END IF;

--  If item is exclusive then list list price does not apply
  IF (_item.item_exclusive) THEN
    IF(_debug) THEN
      raise notice 'itemprice, item=%, cust=%, shipto=%, item exclusive, price=-9999', pItemid, pCustid, pShiptoid;
    END IF;
    RETURN -9999.0;
  END IF;

--  Check for a list price
  _price := noNeg(dToLocal(pCurrid, _item.item_listprice - (_item.item_listprice * COALESCE(_cust.cust_discntprcnt, 0.0)), pEffective)
                  * itemuomtouomratio(pItemid, pPriceUOM, _item.item_price_uom_id));

  IF(_debug) THEN
    raise notice 'itemprice, item=%, cust=%, shipto=%, list price= %', pItemid, pCustid, pShiptoid, _price;
  END IF;

  RETURN _price;

END;
$$ LANGUAGE 'plpgsql';
