CREATE DOMAIN xpercent AS NUMERIC;

COMMENT ON TYPE xpercent IS
'xPercents represent numeric percentages. Values are stored as their
decimal equivalents.  For example, 100% is stored as 1.00 and 12.5%
is stored as 0.125. The end-user applications try to limit xPercent
values to SCALE_PERCENT decimal places (e.g. if SCALE_PERCENT = 2
then the user might not be allowed to enter 6.275% and must round
this to 6.28% manually, which is then stored in the database as
0.0628). Developers can use the xpercent() database functions to
round appropriately. However, the database itself does not enforce
any particular scale.';

CREATE OR REPLACE FUNCTION xpercent(NUMERIC) RETURNS xpercent AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license
  -- Manually enforce rounding rules
  SELECT CAST(ROUND($1, getnumscale('PERCENT')) AS xpercent);
$$ LANGUAGE SQL STABLE;

DROP CAST IF EXISTS (NUMERIC AS xpercent);
CREATE CAST (NUMERIC AS xpercent) WITH FUNCTION xpercent(NUMERIC) AS ASSIGNMENT;
