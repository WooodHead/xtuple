
CREATE OR REPLACE FUNCTION forwardUpdateAccount(INTEGER) RETURNS INTEGER AS '
DECLARE
  pAccntid ALIAS FOR $1;
  _r RECORD;

BEGIN
  SELECT trialbal_id INTO _r
    FROM trialbal, period
   WHERE ((trialbal_period_id=period_id)
     AND  (trialbal_accnt_id=pAccntid))
   ORDER BY period_start
   LIMIT 1;
  IF (FOUND) THEN
    RETURN forwardUpdateTrialBalance(_r.trialbal_id);
  END IF;

  RETURN -1;
END;
' LANGUAGE 'plpgsql';

