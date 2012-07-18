CREATE TYPE xpurchp AS (amount NUMERIC, curr CHAR(3));

COMMENT ON TYPE xpurchp IS
'xPurchPs are like xMoneys but rounded to a different number of decimal places.';

CREATE OR REPLACE FUNCTION xpurchp(NUMERIC, TEXT) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('PURCHP', $2)) AS amount, $2 AS curr;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION xpurchp(NUMERIC) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('PURCHP')) AS amount, CAST('' AS TEXT) AS curr;
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (NUMERIC AS xpurchp);
CREATE CAST (NUMERIC AS xpurchp) WITH FUNCTION xpurchp(NUMERIC) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xmoney(xpurchp) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xpurchp AS xmoney);
CREATE CAST (xpurchp AS xmoney) WITH FUNCTION xmoney(xpurchp) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xpurchp(xmoney) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xmoney AS xpurchp);
CREATE CAST (xmoney AS xpurchp) WITH FUNCTION xpurchp(xmoney) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xcost(xpurchp) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xpurchp AS xcost);
CREATE CAST (xpurchp AS xcost) WITH FUNCTION xcost(xpurchp) AS ASSIGNMENT;

CREATE OR REPLACE FUNCTION xpurchp(xcost) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1.amount, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (xcost AS xpurchp);
CREATE CAST (xcost AS xpurchp) WITH FUNCTION xpurchp(xcost) AS ASSIGNMENT;
