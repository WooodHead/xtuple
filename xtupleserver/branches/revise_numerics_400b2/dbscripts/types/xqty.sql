CREATE DOMAIN xqty AS NUMERIC;

COMMENT ON TYPE xqty IS
'xQtys represent numeric quantities of goods. The end-user applications try
to limit xQty values to SCALE_QTY decimal places (e.g. if SCALE_QTY = 4
then the user might not be allowed to enter 57.78901 and must round this
to 57.7890 manually). Developers can use the xqty database function to
round appropriately. However, the database itself does not enforce any 
particular scale when storing data or through calls to CAST(x.yz AS xqty).';

CREATE OR REPLACE FUNCTION xqty(NUMERIC) RETURNS xqty AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CAST(ROUND($1, getnumscale('QTY')) AS xqty);
$$ LANGUAGE SQL STABLE;
