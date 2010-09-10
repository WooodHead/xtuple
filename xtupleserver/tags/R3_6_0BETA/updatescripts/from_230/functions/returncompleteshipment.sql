CREATE OR REPLACE FUNCTION returnCompleteShipment(INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN returnCompleteShipment($1, 0, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION returnCompleteShipment(INTEGER, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pshipheadid		ALIAS FOR $1;
  _itemlocSeries	INTEGER			 := $2;
  _timestamp		TIMESTAMP WITH TIME ZONE := $3;
  _r RECORD;

BEGIN
  FOR _r IN SELECT shipitem_id
            FROM shipitem, shiphead
            WHERE ( (shipitem_shiphead_id=shiphead_id)
             AND (NOT shiphead_shipped)
             AND (shiphead_id=pshipheadid) ) LOOP
    _itemlocSeries := returnShipmentTransaction(_r.shipitem_id, _itemlocSeries, _timestamp);
  END LOOP;

  DELETE FROM pack
   WHERE(pack_shiphead_id=pshipheadid);
  DELETE FROM shiphead
  WHERE (shiphead_id=pshipheadid);

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
