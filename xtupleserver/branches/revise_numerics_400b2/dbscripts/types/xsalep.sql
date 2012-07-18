CREATE TYPE xsalep AS (amount NUMERIC, curr CHAR(3));

COMMENT ON TYPE xsalep IS
'xSalePs represent Sales Prices. They are like xMoneys but rounded to a different number of decimal places.';

CREATE OR REPLACE FUNCTION xsalep(NUMERIC, TEXT) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('SALEP', $2)) AS amount, $2 AS curr;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION xsalep(NUMERIC) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('SALEP')) AS amount, CAST('' AS TEXT) AS curr;
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (NUMERIC AS xsalep);
CREATE CAST (NUMERIC AS xsalep) WITH FUNCTION xsalep(NUMERIC) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xsalep(xmoney) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xmoney AS xsalep);
CREATE CAST (xmoney AS xsalep) WITH FUNCTION xsalep(xmoney) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xmoney(xsalep) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xsalep AS xmoney);
CREATE CAST (xsalep AS xmoney) WITH FUNCTION xmoney(xsalep) AS ASSIGNMENT;
