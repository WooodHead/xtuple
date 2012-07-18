CREATE DOMAIN xqtyper AS NUMERIC;

COMMENT ON TYPE xqtyper IS
'xQtyPer represents the number of items used in the creation of
other items during manufacturing, such as the amount of yellow paint
required to coat a batch of truck bodies.  The end-user applications
try to limit xQtyPer values to SCALE_QTYPER decimal places. Developers
can use the xqtyper() database function to round appropriately.
However, the database itself does not enforce any particular scale
when storing data or through calls to CAST(x.yz AS xqtyper).';

CREATE OR REPLACE FUNCTION xqtyper(NUMERIC) RETURNS xqtyper AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CAST(ROUND($1, getnumscale('QTYPER')) AS xqtyper);
$$ LANGUAGE SQL STABLE;
