CREATE OR REPLACE FUNCTION xtpos.getSaleheadId(text) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pSaleNumber ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  IF (pSaleNumber IS NULL) THEN
	RETURN NULL;
  END IF;

  SELECT salehead_id INTO _returnVal
  FROM xtpos.salehead
  WHERE (salehead_number=pSaleNumber);

  IF (_returnVal IS NULL) THEN
	RAISE EXCEPTION 'Sale Number % not found.', pSaleNumber;
  END IF;

  RETURN _returnVal;
END;
$$ LANGUAGE 'plpgsql';
