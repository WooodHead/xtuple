CREATE OR REPLACE FUNCTION formatQty(NUMERIC) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1, 'qty');
$$ LANGUAGE SQL STABLE;
