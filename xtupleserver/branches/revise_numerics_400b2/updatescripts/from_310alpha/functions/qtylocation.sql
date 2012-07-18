CREATE OR REPLACE FUNCTION qtyLocation(INTEGER, INTEGER, INTEGER, TEXT, INTEGER) RETURNS NUMERIC AS '
DECLARE
  pLocationId  ALIAS FOR $1;
  pLsId        ALIAS FOR $2;
  pItemsiteId  ALIAS FOR $3;
  pOrderType   ALIAS FOR $4;
  pOrderId     ALIAS FOR $5;
  _qty         NUMERIC = 0.0;
  _qtyReserved NUMERIC = 0.0;

BEGIN
-- Summarize itemloc qty for this location/itemsite
  SELECT COALESCE(SUM(itemloc_qty), 0) INTO _qty
    FROM itemloc
   WHERE ( (itemloc_location_id=pLocationId)
     AND   (COALESCE(itemloc_ls_id, -1)=COALESCE(pLsId, -1))
     AND   (itemloc_itemsite_id=pItemsiteId) );

-- Summarize itemlocrsrv qty for this location/itemsite
-- that is reserved for a different order
  IF (fetchMetricBool(''EnableSOReservationsByLocation'')) THEN
    SELECT COALESCE(SUM(itemlocrsrv_qty), 0) INTO _qtyReserved
      FROM itemloc JOIN itemlocrsrv ON ( (itemlocrsrv_itemloc_id=itemloc_id)
                                    AND  ((itemlocrsrv_source <> COALESCE(pOrderType, '''')) OR
                                          (itemlocrsrv_source_id <> COALESCE(pOrderId, -1))) )
     WHERE ( (itemloc_location_id=pLocationId)
       AND   (COALESCE(itemloc_ls_id, -1)=COALESCE(pLsId, -1))
       AND   (itemloc_itemsite_id=pItemsiteId) );
  END IF;

  RETURN (_qty - _qtyReserved);

END;
' LANGUAGE 'plpgsql';
