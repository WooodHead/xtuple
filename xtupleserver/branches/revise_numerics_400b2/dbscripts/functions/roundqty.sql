CREATE OR REPLACE FUNCTION roundQty(pFractional BOOLEAN, pQty NUMERIC) RETURNS NUMERIC AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN $1 THEN ROUND($2, getNumScale('QTY'))
              WHEN TRUNC($2) < ROUND($2, getNumScale('QTY')) THEN TRUNC($2) + 1
              ELSE TRUNC($2)
         END;
$$ LANGUAGE SQL STABLE;

