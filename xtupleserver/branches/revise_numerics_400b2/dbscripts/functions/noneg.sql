CREATE OR REPLACE FUNCTION noNeg(NUMERIC) RETURNS NUMERIC AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN $1 < 0 THEN 0 ELSE $1 END;
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION noNeg(xmoney) RETURNS xmoney AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN $1 < 0 THEN xmoney(0) ELSE $1 END;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION noNeg(xcost) RETURNS xcost AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN $1 < 0 THEN xcost(0) ELSE $1 END;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION noNeg(xpurchp) RETURNS xpurchp AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN $1 < 0 THEN xpurchp(0) ELSE $1 END;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION noNeg(xsalep) RETURNS xsalep AS $$
  -- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
  -- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN $1 < 0 THEN xsalep(0) ELSE $1 END;
$$ LANGUAGE SQL STABLE;

