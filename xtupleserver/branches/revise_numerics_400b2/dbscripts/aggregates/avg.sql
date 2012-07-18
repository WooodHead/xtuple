-- the avg calculation functions below are subject to numeric and disk overflows
-- try the following?
-- CREATE AGGREGATE:    INITCOND = {0,0} -- running count, running total
-- CREATE _accum:       SELECT $1[1] + 1, $1[2] + $2
-- CREATE _final:       SELECT $1[2] / $1[1]

CREATE OR REPLACE FUNCTION xmoney_avg_accum(xmoney[], xmoney)
  RETURNS xmoney[] AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT $1 || $2;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION xmoney_avg_final(xmoney[]) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT (SELECT SUM(unnest) FROM unnest($1)) / array_length($1, 1);
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS AVG(xmoney);
CREATE AGGREGATE AVG(xmoney) (
    SFUNC = xmoney_avg_accum,
    STYPE = xmoney[],
    FINALFUNC = xmoney_avg_final,
    INITCOND = '{}'
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_avg_accum(xcost[], xcost) RETURNS xcost[] AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT $1 || $2;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION xcost_avg_final(xcost[]) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT (SELECT SUM(unnest) FROM unnest($1)) / array_length($1, 1);
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS AVG(xcost);
CREATE AGGREGATE AVG(xcost) (
    SFUNC = xcost_avg_accum,
    STYPE = xcost[],
    FINALFUNC = xcost_avg_final,
    INITCOND = '{}'
);

--------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_avg_accum(xpurchp[], xpurchp)
  RETURNS xpurchp[] AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT $1 || $2;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION xpurchp_avg_final(xpurchp[]) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT (SELECT SUM(unnest) FROM unnest($1)) / array_length($1, 1);
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS AVG(xpurchp);
CREATE AGGREGATE AVG(xpurchp) (
    SFUNC = xpurchp_avg_accum,
    STYPE = xpurchp[],
    FINALFUNC = xpurchp_avg_final,
    INITCOND = '{}'
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_avg_accum(xsalep[], xsalep) RETURNS xsalep[] AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT $1 || $2;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION xsalep_avg_final(xsalep[]) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT (SELECT SUM(unnest) FROM unnest($1)) / array_length($1, 1);
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS AVG(xsalep);
CREATE AGGREGATE AVG(xsalep) (
    SFUNC = xsalep_avg_accum,
    STYPE = xsalep[],
    FINALFUNC = xsalep_avg_final,
    INITCOND = '{}'
);
