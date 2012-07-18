CREATE OR REPLACE FUNCTION xmoney_max(xmoney, xmoney) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) < $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MAX(xmoney);
CREATE AGGREGATE MAX(xmoney) (
    SFUNC = xmoney_max,
    STYPE = xmoney
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_max(xcost, xcost) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) <= $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MAX(xcost);
CREATE AGGREGATE MAX(xcost) (
    SFUNC = xcost_max,
    STYPE = xcost
);

--------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_max(xpurchp, xpurchp) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) < $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MAX(xpurchp);
CREATE AGGREGATE MAX(xpurchp) (
    SFUNC = xpurchp_max,
    STYPE = xpurchp
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_max(xsalep, xsalep) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN COALESCE($1, $2) <= $2 THEN $2
              ELSE $1
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS MAX(xsalep);
CREATE AGGREGATE MAX(xsalep) (
    SFUNC = xsalep_max,
    STYPE = xsalep
);
