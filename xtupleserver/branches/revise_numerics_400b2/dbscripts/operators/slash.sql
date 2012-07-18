CREATE OR REPLACE FUNCTION xmoney_divide(xmoney, NUMERIC) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1.amount / $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS /(xmoney, NUMERIC);
CREATE OPERATOR / (
    LEFTARG   = xmoney,
    RIGHTARG  = NUMERIC,
    PROCEDURE = xmoney_divide
);

CREATE OR REPLACE FUNCTION xmoney_divide(xmoney, xmoney) RETURNS xmoney AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot divide an xmoney by another xmoney. [xtuple: xmoney_divide, -5]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS /(xmoney, xmoney);
CREATE OPERATOR / (
    LEFTARG   = xmoney,
    RIGHTARG  = xmoney,
    PROCEDURE = xmoney_divide
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_divide(xcost, NUMERIC) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1.amount / $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS /(xcost, NUMERIC);
CREATE OPERATOR / (
    LEFTARG   = xcost,
    RIGHTARG  = NUMERIC,
    PROCEDURE = xcost_divide
);

CREATE OR REPLACE FUNCTION xcost_divide(xcost, xcost) RETURNS xcost AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot divide an xcost by another xcost. [xtuple: xcost_divide, -5]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS /(xcost, xcost);
CREATE OPERATOR / (
    LEFTARG   = xcost,
    RIGHTARG  = xcost,
    PROCEDURE = xcost_divide
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_divide(xpurchp, NUMERIC) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1.amount / $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS /(xpurchp, NUMERIC);
CREATE OPERATOR / (
    LEFTARG   = xpurchp,
    RIGHTARG  = NUMERIC,
    PROCEDURE = xpurchp_divide
);

CREATE OR REPLACE FUNCTION xpurchp_divide(xpurchp, xpurchp) RETURNS xpurchp AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot divide an xpurchp by another xpurchp. [xtuple: xpurchp_divide, -5]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS /(xpurchp, xpurchp);
CREATE OPERATOR / (
    LEFTARG   = xpurchp,
    RIGHTARG  = xpurchp,
    PROCEDURE = xpurchp_divide
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_divide(xsalep, NUMERIC) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep($1.amount / $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS /(xsalep, NUMERIC);
CREATE OPERATOR / (
    LEFTARG   = xsalep,
    RIGHTARG  = NUMERIC,
    PROCEDURE = xsalep_divide
);

CREATE OR REPLACE FUNCTION xsalep_divide(xsalep, xsalep) RETURNS xsalep AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot divide an xsalep by another xsalep. [xtuple: xsalep_divide, -5]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS /(xsalep, xsalep);
CREATE OPERATOR / (
    LEFTARG   = xsalep,
    RIGHTARG  = xsalep,
    PROCEDURE = xsalep_divide
);
