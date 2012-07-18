CREATE DOMAIN xuomratio AS NUMERIC;

COMMENT ON TYPE xuomratio IS
'xUOMRatios represent ratios of two units of measure, such as the
number of inches in a foot.  The end-user applications try to limit
xUOMRatios to SCALE_UOMRATIO decimal places. Developers can use the
xuomratio() database function to round appropriately. However, the
database itself does not enforce any particular scale when storing
data or through calls to CAST(x.yz AS xuomratio).';

CREATE OR REPLACE FUNCTION xuomratio(NUMERIC) RETURNS xuomratio AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CAST(ROUND($1, getnumscale('UOMRATIO')) AS xuomratio);
$$ LANGUAGE SQL STABLE;
