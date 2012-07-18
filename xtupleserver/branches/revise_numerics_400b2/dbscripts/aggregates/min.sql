CREATE OR REPLACE FUNCTION xmoney_min(xmoney, xmoney) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) > $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MIN(xmoney);
CREATE AGGREGATE MIN(xmoney) (
    SFUNC = xmoney_min,
    STYPE = xmoney
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_min(xcost, xcost) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) > $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MIN(xcost);
CREATE AGGREGATE MIN(xcost) (
    SFUNC = xcost_min,
    STYPE = xcost
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_min(xpurchp, xpurchp) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) > $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MIN(xpurchp);
CREATE AGGREGATE MIN(xpurchp) (
    SFUNC = xpurchp_min,
    STYPE = xpurchp
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_min(xsalep, xsalep) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) > $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MIN(xsalep);
CREATE AGGREGATE MIN(xsalep) (
    SFUNC = xsalep_min,
    STYPE = xsalep
);
