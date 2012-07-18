CREATE OR REPLACE FUNCTION xmoney_add(xmoney, xmoney) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _result xmoney;
BEGIN
  _result.amount := $1.amount + $2.amount;
  IF ($1.curr = $2.curr) THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr != '' AND $2.curr  = '') THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr  = '' AND $2.curr != '') THEN
    _result.curr := $2.curr;
  ELSE
    RAISE EXCEPTION 'Cannot add two xmoneys with different currencies [xtuple: xmoney_add, -1, %, %]',
                    $1.curr, $2.curr;
  END IF;

  RETURN _result;
END;
$$ LANGUAGE PLPGSQL STABLE;

DROP OPERATOR IF EXISTS +(xmoney,xmoney);
CREATE OPERATOR + (
    LEFTARG    = xmoney,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xmoney_add(xmoney, NUMERIC) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1.amount + $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(xmoney,NUMERIC);
CREATE OPERATOR + (
    LEFTARG    = xmoney,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xmoney_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xmoney_add(NUMERIC, xmoney) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1 + $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(NUMERIC,xmoney);
CREATE OPERATOR + (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_add,
    COMMUTATOR = +
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_add(xcost, xcost) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _result xcost;
BEGIN
  _result.amount := $1.amount + $2.amount;
  IF ($1.curr = $2.curr) THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr != '' AND $2.curr  = '') THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr  = '' AND $2.curr != '') THEN
    _result.curr := $2.curr;
  ELSE
    RAISE EXCEPTION 'Cannot add two xcosts with different currencies [xtuple: xcost_add, -1, %, %]',
                    $1.curr, $2.curr;
  END IF;

  RETURN _result;
END;
$$ LANGUAGE PLPGSQL STABLE;

DROP OPERATOR IF EXISTS +(xcost,xcost);
CREATE OPERATOR + (
    LEFTARG    = xcost,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xcost_add(xcost, NUMERIC) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1.amount + $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(xcost,NUMERIC);
CREATE OPERATOR + (
    LEFTARG    = xcost,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xcost_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xcost_add(NUMERIC, xcost) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1 + $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(NUMERIC,xcost);
CREATE OPERATOR + (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_add,
    COMMUTATOR = +
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_add(xpurchp, xpurchp) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _result xpurchp;
BEGIN
  _result.amount := $1.amount + $2.amount;
  IF ($1.curr = $2.curr) THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr != '' AND $2.curr  = '') THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr  = '' AND $2.curr != '') THEN
    _result.curr := $2.curr;
  ELSE
    RAISE EXCEPTION 'Cannot add two xpurchps with different currencies [xtuple: xpurchp_add, -1, %, %]',
                    $1.curr, $2.curr;
  END IF;

  RETURN _result;
END;
$$ LANGUAGE PLPGSQL STABLE;

DROP OPERATOR IF EXISTS +(xpurchp,xpurchp);
CREATE OPERATOR + (
    LEFTARG    = xpurchp,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xpurchp_add(xpurchp, NUMERIC) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1.amount + $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(xpurchp,NUMERIC);
CREATE OPERATOR + (
    LEFTARG    = xpurchp,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xpurchp_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xpurchp_add(NUMERIC, xpurchp) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1 + $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(NUMERIC,xpurchp);
CREATE OPERATOR + (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_add,
    COMMUTATOR = +
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_add(xsalep, xsalep) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _result xsalep;
BEGIN
  _result.amount := $1.amount + $2.amount;
  IF ($1.curr = $2.curr) THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr != '' AND $2.curr  = '') THEN
    _result.curr := $1.curr;
  ELSIF ($1.curr  = '' AND $2.curr != '') THEN
    _result.curr := $2.curr;
  ELSE
    RAISE EXCEPTION 'Cannot add two xsaleps with different currencies [xtuple: xsalep_add, -1, %, %]',
                    $1.curr, $2.curr;
  END IF;

  RETURN _result;
END;
$$ LANGUAGE PLPGSQL STABLE;

DROP OPERATOR IF EXISTS +(xsalep,xsalep);
CREATE OPERATOR + (
    LEFTARG    = xsalep,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xsalep_add(xsalep, NUMERIC) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep($1.amount + $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(xsalep,NUMERIC);
CREATE OPERATOR + (
    LEFTARG    = xsalep,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xsalep_add,
    COMMUTATOR = +
);

CREATE OR REPLACE FUNCTION xsalep_add(NUMERIC, xsalep) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep($1 + $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS +(NUMERIC,xsalep);
CREATE OPERATOR + (
    LEFTARG    = NUMERIC,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_add,
    COMMUTATOR = +
);
