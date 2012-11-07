CREATE OR REPLACE FUNCTION _accntTrigger () RETURNS TRIGGER AS $$
DECLARE
  ffSub BOOLEAN;
  ffProfit BOOLEAN;
  result INTEGER;
BEGIN
  SELECT (metric_value='t')
    INTO ffSub
    FROM metric
   WHERE(metric_name='GLFFSubaccounts')
   LIMIT 1;
  ffSub := COALESCE(ffSub, false);

  SELECT (metric_value='t')
    INTO ffProfit
    FROM metric
   WHERE(metric_name='GLFFProfitCenters')
   LIMIT 1;
  ffProfit := COALESCE(ffSub, false);

  IF (NEW.accnt_sub IS NOT NULL AND ffSub = false) THEN
    SELECT subaccnt_id
      INTO result
      FROM subaccnt
     WHERE(subaccnt_number=NEW.accnt_sub)
     LIMIT 1;
    IF (NOT FOUND) THEN
      RAISE EXCEPTION 'You must supply a valid Sub Account Number.';
    END IF;
  END IF;

  IF (NEW.accnt_profit IS NOT NULL AND ffProfit = false) THEN
    SELECT prftcntr_id
      INTO result
      FROM prftcntr
     WHERE(prftcntr_number=NEW.accnt_profit)
     LIMIT 1;
    IF (NOT FOUND) THEN
      RAISE EXCEPTION 'You must supply a valid Profit Center Number.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'accntTrigger');
CREATE TRIGGER accntTrigger BEFORE INSERT OR UPDATE ON accnt FOR EACH ROW EXECUTE PROCEDURE _accntTrigger();
