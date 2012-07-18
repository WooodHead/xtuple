CREATE TYPE xmoney AS (amount NUMERIC, curr CHAR(3));

COMMENT ON TYPE xmoney IS
'xMoney represents a monetary value rounded to an configurable number of decimal places.';

CREATE OR REPLACE FUNCTION xmoney(NUMERIC) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('MONEY')) AS amount, CAST('' AS TEXT) AS curr;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION xmoney(NUMERIC, TEXT) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ROUND($1, getnumscale('MONEY', $2)) AS amount, $2 AS curr;
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (NUMERIC AS xmoney);
CREATE CAST (NUMERIC AS xmoney) WITH FUNCTION xmoney(NUMERIC) AS ASSIGNMENT;
