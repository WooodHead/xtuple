CREATE OR REPLACE FUNCTION ABS(xmoney) RETURNS xmoney AS $$
  SELECT ABS($1.amount) AS amount, $1.curr AS curr;
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION ABS(xcost) RETURNS xcost AS $$
  SELECT ABS($1.amount) AS amount, $1.curr AS curr;
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION ABS(xpurchp) RETURNS xpurchp AS $$
  SELECT ABS($1.amount) AS amount, $1.curr AS curr;
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION ABS(xsalep) RETURNS xsalep AS $$
  SELECT ABS($1.amount) AS amount, $1.curr AS curr;
$$ LANGUAGE SQL IMMUTABLE;

