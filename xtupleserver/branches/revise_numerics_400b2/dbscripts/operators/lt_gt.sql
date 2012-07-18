CREATE OR REPLACE FUNCTION xmoney_isnotequal(xmoney, xmoney) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2.amount) OR ($1.curr <> $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xmoney_isnotequal(xmoney, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xmoney_isnotequal(NUMERIC, xmoney) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 <> $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS <>(xmoney,xmoney);
CREATE OPERATOR <> (
    LEFTARG    = xmoney,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(xmoney,NUMERIC);
CREATE OPERATOR <> (
    LEFTARG    = xmoney,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xmoney_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(NUMERIC,xmoney);
CREATE OPERATOR <> (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_isnotequal,
    COMMUTATOR = "<>"
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_isnotequal(xcost, xcost) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2.amount) OR ($1.curr <> $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xcost_isnotequal(xcost, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xcost_isnotequal(NUMERIC, xcost) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 <> $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS <>(xcost,xcost);
CREATE OPERATOR <> (
    LEFTARG    = xcost,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(xcost,NUMERIC);
CREATE OPERATOR <> (
    LEFTARG    = xcost,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xcost_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(NUMERIC,xcost);
CREATE OPERATOR <> (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_isnotequal,
    COMMUTATOR = "<>"
);

--------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_isnotequal(xpurchp, xpurchp) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2.amount) OR ($1.curr <> $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xpurchp_isnotequal(xpurchp, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xpurchp_isnotequal(NUMERIC, xpurchp) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 <> $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS <>(xpurchp,xpurchp);
CREATE OPERATOR <> (
    LEFTARG    = xpurchp,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(xpurchp,NUMERIC);
CREATE OPERATOR <> (
    LEFTARG    = xpurchp,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xpurchp_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(NUMERIC,xpurchp);
CREATE OPERATOR <> (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_isnotequal,
    COMMUTATOR = "<>"
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_isnotequal(xsalep, xsalep) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2.amount) OR ($1.curr <> $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xsalep_isnotequal(xsalep, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount <> $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xsalep_isnotequal(NUMERIC, xsalep) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 <> $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS <>(xsalep,xsalep);
CREATE OPERATOR <> (
    LEFTARG    = xsalep,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(xsalep,NUMERIC);
CREATE OPERATOR <> (
    LEFTARG    = xsalep,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xsalep_isnotequal,
    COMMUTATOR = "<>"
);

DROP OPERATOR IF EXISTS <>(NUMERIC,xsalep);
CREATE OPERATOR <> (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_isnotequal,
    COMMUTATOR = "<>"
);
