CREATE OR REPLACE FUNCTION formatMoney(NUMERIC) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1, 'curr');
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION formatMoney(xmoney) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT formatNumeric($1.amount, 'curr');
$$ LANGUAGE SQL STABLE;
