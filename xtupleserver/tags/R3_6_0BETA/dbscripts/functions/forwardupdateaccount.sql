
CREATE OR REPLACE FUNCTION forwardUpdateAccount(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pAccntid ALIAS FOR $1;
  _r RECORD;
  _trialbalid INTEGER;

BEGIN
  SELECT trialbal_id INTO _r
    FROM trialbal, period
   WHERE ((trialbal_period_id=period_id)
     AND  (trialbal_accnt_id=pAccntid))
   ORDER BY period_start
   LIMIT 1;
  IF (FOUND) THEN
    RETURN forwardUpdateTrialBalance(_r.trialbal_id);
  ELSE
      _trialbalid := nextval('trialbal_trialbal_id_seq');
      
      INSERT INTO trialbal
      ( trialbal_id,
        trialbal_period_id, trialbal_accnt_id,
        trialbal_beginning, trialbal_ending,
        trialbal_debits, trialbal_credits, trialbal_dirty )
      SELECT
        _trialbalid,
        period_id, pAccntid,
        0, 0,
        0, 0, FALSE
      FROM period
      ORDER BY period_start LIMIT 1;

      RETURN forwardUpdateTrialBalance(_trialbalid);
  END IF;

  RETURN -1;
END;
$$ LANGUAGE 'plpgsql';

