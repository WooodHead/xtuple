CREATE OR REPLACE FUNCTION creditmemoTotal(INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pCreditmemoId ALIAS FOR $1;
  _result NUMERIC;

BEGIN

  -- TO DO:  Add in line item taxes
  SELECT COALESCE(cmhead_freight,0.0) + COALESCE(cmhead_tax,0.0) + COALESCE(cmhead_misc,0.0) +
         ( SELECT COALESCE(SUM((cmitem_qtycredit * cmitem_qty_invuomratio) * cmitem_unitprice / cmitem_price_invuomratio), 0.0)
             FROM cmitem
            WHERE (cmitem_cmhead_id=pCreditmemoId)
           ) INTO _result
  FROM cmhead
  WHERE (cmhead_id=pCreditmemoId);

  IF (NOT FOUND) THEN
    return 0;
  ELSE
    RETURN _result;
  END IF;

END;
$$ LANGUAGE 'plpgsql';