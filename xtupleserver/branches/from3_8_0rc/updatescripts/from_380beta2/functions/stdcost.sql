CREATE OR REPLACE FUNCTION stdCost(INTEGER) RETURNS NUMERIC AS '
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pItemid ALIAS FOR $1;
  _cost NUMERIC;

BEGIN

  SELECT SUM(itemcost_stdcost) INTO _cost
  FROM itemcost
  WHERE (itemcost_item_id=pItemid);

  IF (_cost IS NULL) THEN
    RETURN 0;
  ELSE
    RETURN _cost;
  END IF;

END;
' LANGUAGE 'plpgsql';
