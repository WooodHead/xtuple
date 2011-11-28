CREATE OR REPLACE FUNCTION avgCost(INTEGER) RETURNS NUMERIC AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pItemsiteid ALIAS FOR $1;
  _value NUMERIC;
  _qoh NUMERIC;
BEGIN
  SELECT itemsite_value, itemsite_qtyonhand
    INTO _value, _qoh
    FROM itemsite
   WHERE(itemsite_id=pItemsiteid);
  IF (_qoh = 0) THEN
    RETURN 0;
  END IF;
  RETURN _value / _qoh;
END;
$$ LANGUAGE 'plpgsql';

