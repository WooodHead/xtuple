CREATE OR REPLACE FUNCTION xmoney_sum(xmoney, xmoney) RETURNS xmoney AS $$
  SELECT CASE WHEN $1 IS NULL OR $1.amount IS NULL THEN $2
              WHEN $2 IS NULL OR $2.amount IS NULL THEN $1
              ELSE $1 + $2
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS SUM(xmoney);
CREATE AGGREGATE SUM(xmoney) (
    SFUNC = xmoney_sum,
    STYPE = xmoney
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xcost_sum(xcost, xcost) RETURNS xcost AS $$
  SELECT CASE WHEN $1 IS NULL OR $1.amount IS NULL THEN $2
              WHEN $2 IS NULL OR $2.amount IS NULL THEN $1
              ELSE $1 + $2
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS SUM(xcost);
CREATE AGGREGATE SUM(xcost) (
    SFUNC = xcost_sum,
    STYPE = xcost
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xpurchp_sum(xpurchp, xpurchp) RETURNS xpurchp AS $$
  SELECT CASE WHEN $1 IS NULL OR $1.amount IS NULL THEN $2
              WHEN $2 IS NULL OR $2.amount IS NULL THEN $1
              ELSE $1 + $2
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS SUM(xpurchp);
CREATE AGGREGATE SUM(xpurchp) (
    SFUNC = xpurchp_sum,
    STYPE = xpurchp
);

---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION xsalep_sum(xsalep, xsalep) RETURNS xsalep AS $$
  SELECT CASE WHEN $1 IS NULL OR $1.amount IS NULL THEN $2
              WHEN $2 IS NULL OR $2.amount IS NULL THEN $1
              ELSE $1 + $2
         END;
$$ LANGUAGE SQL;

DROP AGGREGATE IF EXISTS SUM(xsalep);
CREATE AGGREGATE SUM(xsalep) (
    SFUNC = xsalep_sum,
    STYPE = xsalep
);
