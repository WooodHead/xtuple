
CREATE OR REPLACE FUNCTION getPacklistItemLotSerial(INTEGER, INTEGER) RETURNS TEXT AS '
DECLARE
  pShipheadId ALIAS FOR $1;
  pOrderItemId ALIAS FOR $2;
  _lotserial text;
  _r RECORD;
  _first BOOLEAN;
  
BEGIN
 
  --Test to see if Lot/Serial Enabled
  SELECT metric_value INTO _lotserial
  FROM metric
  WHERE ((metric_name=''LotSerialControl'')
  AND (metric_value =''t''));

  IF (FOUND) THEN
    _lotserial := '''';
    _first := true;

    FOR _r IN SELECT DISTINCT invdetail_lotserial
              FROM invdetail, invhist, shipitem
             WHERE ((shipitem_shiphead_id=pShipheadId)
               AND  (shipitem_orderitem_id=pOrderItemId)
               AND  (shipitem_invhist_id=invhist_id)
               AND  (invhist_id=invdetail_invhist_id)) LOOP
      IF ((_r.invdetail_lotserial IS NOT NULL) AND (_r.invdetail_lotserial != '''')) THEN
        IF (_first = false) THEN
          _lotserial := _lotserial || '', '';
        END IF;
        _lotserial := _lotserial || _r.invdetail_lotserial;
        _first := false;
      END IF;
    END LOOP;

    RETURN _lotserial;
  ELSE
    RETURN '''';
  END IF;
  
END
' LANGUAGE 'plpgsql';