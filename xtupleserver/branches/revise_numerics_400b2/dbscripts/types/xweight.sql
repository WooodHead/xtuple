CREATE DOMAIN xweight AS NUMERIC;

COMMENT ON TYPE xweight IS
'xWeights represent weight values. The end-user applications try
to limit xWeights to SCALE_WEIGHT decimal places (e.g. if SCALE_WEIGHT
= 4 then the user might not be allowed to enter 12.34567 Kg and
might have to round this to 12.3457 manually. Developers can use
the xweight() database function to round appropriately. However,
the database itself does not enforce any particular scale when storing
data or through calls to CAST(x.yz AS xweight).';

CREATE OR REPLACE FUNCTION xweight(NUMERIC) RETURNS xweight AS $$
  SELECT CAST(ROUND($1, getnumscale('WEIGHT')) AS xweight);
$$ LANGUAGE SQL STABLE;
