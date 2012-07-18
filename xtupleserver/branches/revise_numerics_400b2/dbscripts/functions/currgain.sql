CREATE OR REPLACE FUNCTION currGain(pId INTEGER, pValue xmoney, pStart DATE, pEnd DATE)
RETURNS xmoney AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
-- calculate the change in value caused by exchange rate fluctuations.
-- we generally care about currency exchange gain/loss when adjusting the G/L,
-- so this function returns its result in the base currency.
-- however, we only care about fluctuations in the base value of a foreign
-- quantity, so this function expects pValue ($2) in the local currency.
-- negative values = a loss.
DECLARE
  _start        DATE;
  _end          DATE;
  _gain         xmoney;
  _multiplier	INTEGER	:= 1;

BEGIN
  IF (pEnd = pStart OR pValue = 0) THEN
    _gain := 0;

  ELSE
    IF (pStart > pEnd) THEN
      _start := pEnd;
      _end   := pStart;
      _multiplier := -1;
    ELSE
      _start := pStart;
      _end := pEnd;
    END IF;

    _gain := currToBase(pId, pValue, _start) - currToBase(pId, pValue, _end);
    IF (_gain IS NULL) THEN
      RAISE EXCEPTION 'Missing exchange rate for curr_id % on % or %',
                      pId, _start, _end;
    END IF;

    _gain := _gain * _multiplier;
  END IF;

  RETURN _gain;
END;
$$ LANGUAGE plpgsql;
