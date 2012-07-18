CREATE OR REPLACE FUNCTION xmoney_multiply(xmoney, xmoney) RETURNS xmoney AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xmoney values [xtuple: xmoney_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xmoney,xmoney);
CREATE OPERATOR *(
    LEFTARG    = xmoney,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xmoney_multiply(xmoney, NUMERIC) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1.amount * $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(xmoney,NUMERIC);
CREATE OPERATOR *(
    LEFTARG    = xmoney,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xmoney_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xmoney_multiply(NUMERIC, xmoney) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xmoney($1 * $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(NUMERIC,xmoney);
CREATE OPERATOR *(
    LEFTARG    = NUMERIC,
    RIGHTARG   = xmoney,
    PROCEDURE  = xmoney_multiply,
    COMMUTATOR = *
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_multiply(xmoney, xcost) RETURNS xcost AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xcost and xmoney values [xtuple: xcost_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xmoney,xcost);
CREATE OPERATOR *(
    LEFTARG    = xmoney,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xcost_multiply(xcost, xmoney) RETURNS xcost AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xcost and xmoney values [xtuple: xcost_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xcost,xmoney);
CREATE OPERATOR *(
    LEFTARG    = xcost,
    RIGHTARG   = xmoney,
    PROCEDURE  = xcost_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xcost_multiply(xcost, xcost) RETURNS xcost AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xcost values [xtuple: xcost_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xcost,xcost);
CREATE OPERATOR *(
    LEFTARG    = xcost,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xcost_multiply(xcost, NUMERIC) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1.amount * $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(xcost,NUMERIC);
CREATE OPERATOR *(
    LEFTARG    = xcost,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xcost_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xcost_multiply(NUMERIC, xcost) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xcost($1 * $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(NUMERIC,xcost);
CREATE OPERATOR *(
    LEFTARG    = NUMERIC,
    RIGHTARG   = xcost,
    PROCEDURE  = xcost_multiply,
    COMMUTATOR = *
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_multiply(xmoney, xpurchp) RETURNS xpurchp AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xpurchp and xmoney values [xtuple: xpurchp_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xmoney,xpurchp);
CREATE OPERATOR *(
    LEFTARG    = xmoney,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xpurchp_multiply(xpurchp, xmoney) RETURNS xpurchp AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xpurchp and xmoney values [xtuple: xpurchp_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xpurchp,xmoney);
CREATE OPERATOR *(
    LEFTARG    = xpurchp,
    RIGHTARG   = xmoney,
    PROCEDURE  = xpurchp_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xpurchp_multiply(xpurchp, xpurchp) RETURNS xpurchp AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xpurchp values [xtuple: xpurchp_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xpurchp,xpurchp);
CREATE OPERATOR *(
    LEFTARG    = xpurchp,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xpurchp_multiply(xpurchp, NUMERIC) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1.amount * $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(xpurchp,NUMERIC);
CREATE OPERATOR *(
    LEFTARG    = xpurchp,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xpurchp_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xpurchp_multiply(NUMERIC, xpurchp) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xpurchp($1 * $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(NUMERIC,xpurchp);
CREATE OPERATOR *(
    LEFTARG    = NUMERIC,
    RIGHTARG   = xpurchp,
    PROCEDURE  = xpurchp_multiply,
    COMMUTATOR = *
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_multiply(xmoney, xsalep) RETURNS xsalep AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xsalep and xmoney values [xtuple: xsalep_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xmoney,xsalep);
CREATE OPERATOR *(
    LEFTARG    = xmoney,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xsalep_multiply(xsalep, xmoney) RETURNS xsalep AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xsalep and xmoney values [xtuple: xsalep_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xsalep,xmoney);
CREATE OPERATOR *(
    LEFTARG    = xsalep,
    RIGHTARG   = xmoney,
    PROCEDURE  = xsalep_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xsalep_multiply(xsalep, xsalep) RETURNS xsalep AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
BEGIN
  RAISE EXCEPTION 'Cannot multiply xsalep values [xtuple: xsalep_multiply, -3]';
  RETURN NULL;
END;
$$ LANGUAGE PLPGSQL IMMUTABLE;

DROP OPERATOR IF EXISTS *(xsalep,xsalep);
CREATE OPERATOR *(
    LEFTARG    = xsalep,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xsalep_multiply(xsalep, NUMERIC) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep($1.amount * $2, $1.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(xsalep,NUMERIC);
CREATE OPERATOR *(
    LEFTARG    = xsalep,
    RIGHTARG   = NUMERIC,
    PROCEDURE  = xsalep_multiply,
    COMMUTATOR = *
);

CREATE OR REPLACE FUNCTION xsalep_multiply(NUMERIC, xsalep) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT xsalep($1 * $2.amount, $2.curr);
$$ LANGUAGE SQL STABLE;

DROP OPERATOR IF EXISTS *(NUMERIC,xsalep);
CREATE OPERATOR *(
    LEFTARG    = NUMERIC,
    RIGHTARG   = xsalep,
    PROCEDURE  = xsalep_multiply,
    COMMUTATOR = *
);
