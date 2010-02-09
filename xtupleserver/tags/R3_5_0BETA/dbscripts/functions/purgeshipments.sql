CREATE OR REPLACE FUNCTION purgeShipments(DATE) RETURNS INTEGER  AS '
DECLARE
  pcutoff ALIAS FOR $1;

BEGIN

  -- TODO: add support for transfer orders shipments (which are never invoiced)
  DELETE FROM shipitem
  WHERE ((SELECT shiphead_shipped
	  FROM shiphead
	  WHERE (shipitem_shiphead_id=shiphead_id))
    AND  (shipitem_invoiced)
    AND  (DATE(shipitem_shipdate) <= pcutoff));

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
