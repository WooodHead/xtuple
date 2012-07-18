CREATE TYPE xcost AS (amount NUMERIC, curr CHAR(3));

COMMENT ON TYPE xcost IS
'xCosts are like xMoneys but rounded to a different number of decimal places.';

CREATE OR REPLACE FUNCTION xcost(NUMERIC, TEXT) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('COST', $2)) AS amount, $2 AS curr;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION xcost(NUMERIC) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('COST')) AS amount, CAST('' AS TEXT) AS curr;
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (NUMERIC AS xcost);
CREATE CAST (NUMERIC AS xcost) WITH FUNCTION xcost(NUMERIC) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xcost(xmoney) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xmoney AS xcost);
CREATE CAST (xmoney AS xcost) WITH FUNCTION xcost(xmoney) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xmoney(xcost) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xcost AS xmoney);
CREATE CAST (xcost AS xmoney) WITH FUNCTION xmoney(xcost) AS ASSIGNMENT;
