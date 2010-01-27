CREATE OR REPLACE FUNCTION freightDetail(text,integer) RETURNS SETOF freightData AS $$
DECLARE
  pOrderType ALIAS FOR $1;
  pOrderId ALIAS FOR $2;
  _row freightData%ROWTYPE;
  _order RECORD;
  _weights RECORD;
  _price RECORD;
  _sales RECORD;
  _freightid INTEGER;
  _totalprice NUMERIC;
  _freight RECORD;
BEGIN
  --Get the order header information need to match
  --against price schedules
  IF (pOrderType = 'SO') THEN
    SELECT cohead_cust_id AS cust_id,
           custtype_id,
           custtype_code,
           COALESCE(shipto_id, -1) AS shipto_id,
           COALESCE(shipto_num, '') AS shipto_num,
           cohead_orderdate AS orderdate,
           cohead_shipvia AS shipvia,
           shipto_shipzone_id AS shipzone_id,
           cohead_curr_id AS curr_id,
           currConcat(cohead_curr_id) AS currAbbr
    INTO _order
    FROM cohead JOIN cust ON (cust_id=cohead_cust_id)
                JOIN custtype ON (custtype_id=cust_custtype_id)
                LEFT OUTER JOIN shipto ON (shipto_id=cohead_shipto_id)
    WHERE (cohead_id=pOrderId);
  ELSE
    SELECT quhead_cust_id AS cust_id,
           custtype_id,
           custtype_code,
           COALESCE(shipto_id, -1) AS shipto_id,
           COALESCE(shipto_num, '') AS shipto_num,
           quhead_quotedate AS orderdate,
           quhead_shipvia AS shipvia,
           shipto_shipzone_id AS shipzone_id,
           quhead_curr_id AS curr_id,
           currConcat(quhead_curr_id) AS currAbbr
    INTO _order
    FROM quhead JOIN cust ON (cust_id=quhead_cust_id)
                JOIN custtype ON (custtype_id=cust_custtype_id)
                LEFT OUTER JOIN shipto ON (shipto_id=quhead_shipto_id)
    WHERE (quhead_id=pOrderId);
  END IF;

  --Get a list of aggregated weights from sites and
  --freight classes used on order lines
  FOR _weights IN
    SELECT SUM(orderitem_qty_ordered * (item_prodweight + item_packweight)) AS weight,
           itemsite_warehous_id, item_freightclass_id
    FROM salesquoteitem JOIN itemsite ON (itemsite_id=orderitem_itemsite_id)
                        JOIN item ON (item_id=itemsite_item_id)
    WHERE ( (orderitem_orderhead_type=pOrderType)
      AND   (orderitem_orderhead_id=pOrderId) )
    GROUP BY itemsite_warehous_id, item_freightclass_id LOOP

-- First get a sales price if any so we when we find other prices
-- we can determine if we want that price or this price.
--  Check for a Sale Price
  SELECT ipsfreight_id,
         CASE WHEN (ipsfreight_type='F') THEN currToCurr(ipshead_curr_id, _order.curr_id,
                                                         ipsfreight_price, _order.orderdate)
              ELSE currToCurr(ipshead_curr_id, _order.curr_id,
                              (_weights.weight * ipsfreight_price), _order.orderdate)
         END AS price
         INTO _sales
  FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                  JOIN sale ON (sale_ipshead_id=ipshead_id)
  WHERE ( (ipsfreight_qtybreak <= _weights.weight)
    AND   ((ipsfreight_warehous_id IS NULL) OR (ipsfreight_warehous_id=_weights.itemsite_warehous_id))
    AND   ((ipsfreight_freightclass_id IS NULL) OR (ipsfreight_freightclass_id=_weights.item_freightclass_id))
    AND   ((ipsfreight_shipzone_id IS NULL) OR (ipsfreight_shipzone_id=_order.shipzone_id))
    AND   ((ipsfreight_shipvia IS NULL) OR (ipsfreight_shipvia=_order.shipvia))
    AND   (CURRENT_DATE BETWEEN sale_startdate AND sale_enddate) )
  ORDER BY ipsfreight_qtybreak DESC, price ASC
  LIMIT 1;

--  Check for a Customer Shipto Price
  SELECT ipsfreight_id,
         CASE WHEN (ipsfreight_type='F') THEN currToCurr(ipshead_curr_id, _order.curr_id,
                                                         ipsfreight_price, _order.orderdate)
              ELSE currToCurr(ipshead_curr_id, _order.curr_id,
                              (_weights.weight * ipsfreight_price), _order.orderdate)
         END AS price
         INTO _price
  FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                  JOIN ipsass ON (ipsass_ipshead_id=ipshead_id)
  WHERE ( (ipsfreight_qtybreak <= _weights.weight)
    AND   ((ipsfreight_warehous_id IS NULL) OR (ipsfreight_warehous_id=_weights.itemsite_warehous_id))
    AND   ((ipsfreight_freightclass_id IS NULL) OR (ipsfreight_freightclass_id=_weights.item_freightclass_id))
    AND   ((ipsfreight_shipzone_id IS NULL) OR (ipsfreight_shipzone_id=_order.shipzone_id))
    AND   ((ipsfreight_shipvia IS NULL) OR (ipsfreight_shipvia=_order.shipvia))
    AND   (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
    AND   (ipsass_cust_id=_order.cust_id)
    AND   (ipsass_shipto_id != -1)
    AND   (ipsass_shipto_id=_order.shipto_id) )
  ORDER BY ipsfreight_qtybreak DESC, price ASC
  LIMIT 1;

  IF (_price.price IS NULL) THEN
--  Check for a Customer Shipto Pattern Price
  SELECT ipsfreight_id,
         CASE WHEN (ipsfreight_type='F') THEN currToCurr(ipshead_curr_id, _order.curr_id,
                                                         ipsfreight_price, _order.orderdate)
              ELSE currToCurr(ipshead_curr_id, _order.curr_id,
                              (_weights.weight * ipsfreight_price), _order.orderdate)
         END AS price
         INTO _price
  FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                  JOIN ipsass ON (ipsass_ipshead_id=ipshead_id)
  WHERE ( (ipsfreight_qtybreak <= _weights.weight)
    AND   (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
    AND   (ipsass_cust_id=_order.cust_id)
    AND   (COALESCE(LENGTH(ipsass_shipto_pattern), 0) > 0)
    AND   (_order.shipto_num ~ ipsass_shipto_pattern)
    AND   ((ipsfreight_warehous_id IS NULL) OR (ipsfreight_warehous_id=_weights.itemsite_warehous_id))
    AND   ((ipsfreight_freightclass_id IS NULL) OR (ipsfreight_freightclass_id=_weights.item_freightclass_id))
    AND   ((ipsfreight_shipzone_id IS NULL) OR (ipsfreight_shipzone_id=_order.shipzone_id))
    AND   ((ipsfreight_shipvia IS NULL) OR (ipsfreight_shipvia=_order.shipvia)) )
  ORDER BY ipsfreight_qtybreak DESC, price ASC
  LIMIT 1;
  END IF;

  IF (_price.price IS NULL) THEN
--  Check for a Customer Price
  SELECT ipsfreight_id,
         CASE WHEN (ipsfreight_type='F') THEN currToCurr(ipshead_curr_id, _order.curr_id,
                                                         ipsfreight_price, _order.orderdate)
              ELSE currToCurr(ipshead_curr_id, _order.curr_id,
                              (_weights.weight * ipsfreight_price), _order.orderdate)
         END AS price
         INTO _price
  FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                  JOIN ipsass ON (ipsass_ipshead_id=ipshead_id)
  WHERE ( (ipsfreight_qtybreak <= _weights.weight)
    AND   ((ipsfreight_warehous_id IS NULL) OR (ipsfreight_warehous_id=_weights.itemsite_warehous_id))
    AND   ((ipsfreight_freightclass_id IS NULL) OR (ipsfreight_freightclass_id=_weights.item_freightclass_id))
    AND   ((ipsfreight_shipzone_id IS NULL) OR (ipsfreight_shipzone_id=_order.shipzone_id))
    AND   ((ipsfreight_shipvia IS NULL) OR (ipsfreight_shipvia=_order.shipvia))
    AND   (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
    AND   (ipsass_cust_id=_order.cust_id)
    AND   (COALESCE(LENGTH(ipsass_shipto_pattern), 0) = 0) )
  ORDER BY ipsfreight_qtybreak DESC, price ASC
  LIMIT 1;
  END IF;

  IF (_price.price IS NULL) THEN
--  Check for a Customer Type Price
  SELECT ipsfreight_id,
         CASE WHEN (ipsfreight_type='F') THEN currToCurr(ipshead_curr_id, _order.curr_id,
                                                         ipsfreight_price, _order.orderdate)
              ELSE currToCurr(ipshead_curr_id, _order.curr_id,
                              (_weights.weight * ipsfreight_price), _order.orderdate)
         END AS price
         INTO _price
  FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                  JOIN ipsass ON (ipsass_ipshead_id=ipshead_id)
  WHERE ( (ipsfreight_qtybreak <= _weights.weight)
    AND   ((ipsfreight_warehous_id IS NULL) OR (ipsfreight_warehous_id=_weights.itemsite_warehous_id))
    AND   ((ipsfreight_freightclass_id IS NULL) OR (ipsfreight_freightclass_id=_weights.item_freightclass_id))
    AND   ((ipsfreight_shipzone_id IS NULL) OR (ipsfreight_shipzone_id=_order.shipzone_id))
    AND   ((ipsfreight_shipvia IS NULL) OR (ipsfreight_shipvia=_order.shipvia))
    AND   (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
    AND   (ipsass_custtype_id=_order.custtype_id) )
  ORDER BY ipsfreight_qtybreak DESC, price ASC
  LIMIT 1;
  END IF;

  IF (_price.price IS NULL) THEN
--  Check for a Customer Type Pattern Price
  SELECT ipsfreight_id,
         CASE WHEN (ipsfreight_type='F') THEN currToCurr(ipshead_curr_id, _order.curr_id,
                                                         ipsfreight_price, _order.orderdate)
              ELSE currToCurr(ipshead_curr_id, _order.curr_id,
                              (_weights.weight * ipsfreight_price), _order.orderdate)
         END AS price
         INTO _price
  FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                  JOIN ipsass ON (ipsass_ipshead_id=ipshead_id)
  WHERE ( (ipsfreight_qtybreak <= _weights.weight)
    AND   ((ipsfreight_warehous_id IS NULL) OR (ipsfreight_warehous_id=_weights.itemsite_warehous_id))
    AND   ((ipsfreight_freightclass_id IS NULL) OR (ipsfreight_freightclass_id=_weights.item_freightclass_id))
    AND   ((ipsfreight_shipzone_id IS NULL) OR (ipsfreight_shipzone_id=_order.shipzone_id))
    AND   ((ipsfreight_shipvia IS NULL) OR (ipsfreight_shipvia=_order.shipvia))
    AND   (CURRENT_DATE BETWEEN ipshead_effective AND (ipshead_expires - 1))
    AND   (COALESCE(LENGTH(ipsass_custtype_pattern), 0) > 0)
    AND   (_order.custtype_code ~ ipsass_custtype_pattern) )
  ORDER BY ipsfreight_qtybreak DESC, price ASC
  LIMIT 1;
  END IF;

  -- Select the lowest price  
  IF ( (_price.price IS NOT NULL) AND ((_sales.price IS NULL) OR (_price.price < _sales.price)) ) THEN
    _freightid := _price.ipsfreight_id;
    _totalprice := _price.price;
  ELSE
    IF ( (_sales.price IS NOT NULL) AND ((_price.price IS NULL) OR (_sales.price <= _price.price)) ) THEN
      _freightid := _sales.ipsfreight_id;
      _totalprice := _sales.price;
    END IF;
  END IF;

  -- Get information for the selected ipsfreight
  -- and return
  IF (_freightid IS NULL) THEN
    _row.freightdata_schedule := 'N/A';
    _row.freightdata_from := '';
    _row.freightdata_to := '';
    _row.freightdata_shipvia := '';
    _row.freightdata_freightclass := '';
    _row.freightdata_weight := 0;
    _row.freightdata_uom := '';
    _row.freightdata_price := 0;
    _row.freightdata_type := '';
    _row.freightdata_total := 0;
    _row.freightdata_currency := '';
    RETURN NEXT _row;
  ELSE
    SELECT ipshead_name,
           COALESCE(warehous_code, 'Any') AS warehouse,
           COALESCE(shipzone_name, 'Any') AS shipzone,
           COALESCE(ipsfreight_shipvia, 'Any') AS shipvia,
           COALESCE(freightclass_code, 'Any') AS freightclass,
           uom_name,
           currToCurr(ipshead_curr_id, _order.curr_id, ipsfreight_price, _order.orderdate) AS price,
           CASE WHEN (ipsfreight_type='F') THEN 'Flat Rate'
                ELSE 'Per UOM'
           END AS type
    INTO _freight
    FROM ipsfreight JOIN ipshead ON (ipshead_id=ipsfreight_ipshead_id)
                    LEFT OUTER JOIN uom ON (uom_item_weight)
                    LEFT OUTER JOIN whsinfo ON (warehous_id=ipsfreight_warehous_id)
                    LEFT OUTER JOIN shipzone ON (shipzone_id=ipsfreight_shipzone_id)
                    LEFT OUTER JOIN freightclass ON (freightclass_id=ipsfreight_freightclass_id)
    WHERE (ipsfreight_id=_freightid);

    _row.freightdata_schedule := _freight.ipshead_name;
    _row.freightdata_from := _freight.warehouse;
    _row.freightdata_to := _freight.shipzone;
    _row.freightdata_shipvia := _freight.shipvia;
    _row.freightdata_freightclass := _freight.freightclass;
    _row.freightdata_weight := _weights.weight;
    _row.freightdata_uom := _freight.uom_name;
    _row.freightdata_price := _freight.price;
    _row.freightdata_type := _freight.type;
    _row.freightdata_total := _totalprice;
    _row.freightdata_currency := _order.currAbbr;
    RETURN NEXT _row;
  END IF;

  END LOOP;
  RETURN;
END;
$$ LANGUAGE 'plpgsql';
