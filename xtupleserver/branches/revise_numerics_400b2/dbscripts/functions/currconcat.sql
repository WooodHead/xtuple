DROP FUNCTION IF EXISTS currConcat(TEXT, TEXT);
DROP FUNCTION IF EXISTS currConcat(INTEGER);

CREATE OR REPLACE FUNCTION currConcat(pAbbr TEXT, pSymbol TEXT) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT CASE WHEN LENGTH(TRIM($1)) > 0 AND LENGTH(TRIM($2)) > 0 
                                        THEN TRIM($1) || ' - ' || TRIM($2)
              WHEN LENGTH(TRIM($1)) > 0 THEN $1
              WHEN LENGTH(TRIM($2)) > 0 THEN $2
          END;
$$ LANGUAGE SQL IMMUTABLE;

CREATE OR REPLACE FUNCTION currConcat(pCurrid INTEGER) RETURNS TEXT AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple.
-- See www.xtuple.com/CPAL for the full text of the software license.
  SELECT currConcat(curr_abbr, curr_symbol)
    FROM curr_symbol WHERE curr_id = $1;
$$ LANGUAGE SQL STABLE;
