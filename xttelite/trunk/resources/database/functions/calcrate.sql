CREATE OR REPLACE FUNCTION te.calcrate(numeric, char(2)) RETURNS numeric AS $$
DECLARE
pAmount ALIAS FOR $1;
pType ALIAS FOR $2;
_state integer;
_count integer;

BEGIN
  -- Convert amount to hourly rate
  IF (pType = 'H') THEN  -- hourly
    RETURN round(pAmount,2);
  ELSIF (pType = 'D') THEN -- daily
    RETURN round(pAmount / 8, 2);
  ELSIF (pType = 'W') THEN  -- weekly
    RETURN round(pAmount / 40, 2);
  ELSIF (pType = 'BW') THEN  -- bi-weekly
    RETURN round(pAmount / 80, 2);
  ELSIF (pType = 'M') THEN -- monthly
    RETURN round(pAmount / 160, 2);
  ELSIF (pType = 'Y') THEN -- annually 
    RETURN round(pAmount / 2080, 2);
  ELSE
    RAISE EXCEPTION 'Unknown period type passed: %', pType;
  END IF;

END;
$$ LANGUAGE 'plpgsql';
