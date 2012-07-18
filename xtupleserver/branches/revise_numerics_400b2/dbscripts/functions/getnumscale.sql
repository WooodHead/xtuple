CREATE OR REPLACE FUNCTION getnumscale(ptype TEXT,
                                       pcurr TEXT DEFAULT '')
  RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
-- Return the appropriate number of decimal places to use when rounding
-- different kinds of number.
SELECT CASE UPPER($1)
       WHEN 'MONEY'    THEN curr_scale
       WHEN 'COST'     THEN CAST(fetchMetricValue('SCALE_COST')     AS INTEGER)
                          + curr_scale
       WHEN 'PURCHP'   THEN CAST(fetchMetricValue('SCALE_PURCHP')   AS INTEGER)
                          + curr_scale
       WHEN 'SALEP'    THEN CAST(fetchMetricValue('SCALE_SALEP')    AS INTEGER)
                          + curr_scale
       WHEN 'PERCENT'  THEN CAST(fetchMetricValue('SCALE_PERCENT')  AS INTEGER)
       WHEN 'QTY'      THEN CAST(fetchMetricValue('SCALE_QTY')      AS INTEGER)
       WHEN 'QTYPER'   THEN CAST(fetchMetricValue('SCALE_QTYPER')   AS INTEGER)
       WHEN 'UOMRATIO' THEN CAST(fetchMetricValue('SCALE_UOMRATIO') AS INTEGER)
       WHEN 'WEIGHT'   THEN CAST(fetchMetricValue('SCALE_WEIGHT')   AS INTEGER)
       ELSE 2
       END
  FROM curr_symbol
 WHERE (curr_abbr = $2)
    OR (COALESCE($2, '') = '' AND curr_base);
$$ LANGUAGE SQL STABLE;
