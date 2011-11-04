CREATE OR REPLACE FUNCTION currRate(INTEGER, DATE) RETURNS NUMERIC STABLE AS $$
-- Copyright (c) 1999-2011 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pCurrId ALIAS FOR $1;
  pDate   ALIAS FOR $2;
  _returnVal NUMERIC;
BEGIN
  SELECT curr_rate INTO _returnVal
  FROM curr_rate
  WHERE ( (curr_id=pCurrId)
  AND (pDate BETWEEN curr_effective AND curr_expires) );

  IF (FOUND) THEN
    RETURN _returnVal;
  ELSE
    RAISE EXCEPTION 'Currency exchange rate not found on %',formatDate(pDate);
  END IF;

END;
$$ LANGUAGE plpgsql;
