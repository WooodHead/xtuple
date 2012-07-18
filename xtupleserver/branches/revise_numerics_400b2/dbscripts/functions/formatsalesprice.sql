CREATE OR REPLACE FUNCTION formatSalesPrice(NUMERIC) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1, 'salesprice');
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION formatSalesPrice(xsalep) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1.amount, 'salesprice');
$$ LANGUAGE SQL STABLE;

