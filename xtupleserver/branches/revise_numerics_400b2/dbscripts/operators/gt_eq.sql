CREATE OR REPLACE FUNCTION xmoney_isge(xmoney, xmoney) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2.amount) AND ($1.curr = $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xmoney_isge(xmoney, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xmoney_isge(NUMERIC, xmoney) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 >= $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS >=(xmoney,xmoney);
CREATE OPERATOR >= (
    LEFTARG    = xmoney,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(xmoney,NUMERIC);
CREATE OPERATOR >= (
    LEFTARG    = xmoney,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xmoney_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(NUMERIC,xmoney);
CREATE OPERATOR >= (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_isge,
    COMMUTATOR = "<="
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_isge(xcost, xcost) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2.amount) AND ($1.curr = $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xcost_isge(xcost, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xcost_isge(NUMERIC, xcost) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 >= $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS >=(xcost,xcost);
CREATE OPERATOR >= (
    LEFTARG    = xcost,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(xcost,NUMERIC);
CREATE OPERATOR >= (
    LEFTARG    = xcost,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xcost_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(NUMERIC,xcost);
CREATE OPERATOR >= (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_isge,
    COMMUTATOR = "<="
);

--------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_isge(xpurchp, xpurchp) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2.amount) AND ($1.curr = $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xpurchp_isge(xpurchp, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xpurchp_isge(NUMERIC, xpurchp) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 >= $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS >=(xpurchp,xpurchp);
CREATE OPERATOR >= (
    LEFTARG    = xpurchp,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(xpurchp,NUMERIC);
CREATE OPERATOR >= (
    LEFTARG    = xpurchp,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xpurchp_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(NUMERIC,xpurchp);
CREATE OPERATOR >= (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_isge,
    COMMUTATOR = "<="
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_isge(xsalep, xsalep) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2.amount) AND ($1.curr = $2.curr);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xsalep_isge(xsalep, NUMERIC) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1.amount >= $2);
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION xsalep_isge(NUMERIC, xsalep) RETURNS BOOLEAN AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT ($1 >= $2.amount);
$$ LANGUAGE SQL IMMUTABLE;

DROP OPERATOR IF EXISTS >=(xsalep,xsalep);
CREATE OPERATOR >= (
    LEFTARG    = xsalep,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(xsalep,NUMERIC);
CREATE OPERATOR >= (
    LEFTARG    = xsalep,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xsalep_isge,
    COMMUTATOR = "<="
);

DROP OPERATOR IF EXISTS >=(NUMERIC,xsalep);
CREATE OPERATOR >= (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_isge,
    COMMUTATOR = "<="
);
