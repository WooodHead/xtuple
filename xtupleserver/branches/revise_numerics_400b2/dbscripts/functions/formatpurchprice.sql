CREATE OR REPLACE FUNCTION formatPurchPrice(NUMERIC) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1, 'purchprice');
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION formatPurchPrice(xpurchp) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1.amount, 'purchprice');
$$ LANGUAGE SQL STABLE;
