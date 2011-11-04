CREATE OR REPLACE FUNCTION getIpsheadId(text) RETURNS INTEGER AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pIpsName ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (pIpsName IS NULL) THEN
	RETURN NULL;
  END IF;

  SELECT ipshead_id INTO _returnVal
  FROM ipshead
  WHERE (ipshead_name=pIpsName);

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION ''Pricing Schedule % not found.'', pIpsName;
  END IF;

  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
