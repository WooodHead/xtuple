CREATE OR REPLACE FUNCTION getShipZoneId(text) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pShipZoneName ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (pShipZoneName IS NULL) THEN
	RETURN NULL;
  END IF;

  SELECT shipzone_id INTO _returnVal
  FROM shipzone
  WHERE (shipzone_name=pShipZoneName);

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION ''Ship Zone % not found.'', pShipZoneName;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
