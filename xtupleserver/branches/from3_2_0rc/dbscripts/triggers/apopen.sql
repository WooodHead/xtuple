CREATE OR REPLACE FUNCTION _apopenTrigger() RETURNS TRIGGER AS $$
DECLARE
  _currrate NUMERIC;

BEGIN

-- get the base exchange rate for the doc date
  IF (TG_OP = 'INSERT' AND NEW.apopen_curr_rate IS NULL) THEN
    SELECT curr_rate INTO _currrate
    FROM curr_rate
    WHERE ( (NEW.apopen_curr_id=curr_id)
      AND ( NEW.apopen_docdate BETWEEN curr_effective 
                                   AND curr_expires) );
    IF (FOUND) THEN
      NEW.apopen_curr_rate := _currrate;
    ELSE
      RAISE EXCEPTION 'Currency exchange rate not found';
    END IF;
  END IF;

  NEW.apopen_open := NEW.apopen_amount > NEW.apopen_paid;

  RETURN NEW;

END;

$$ LANGUAGE 'plpgsql';

SELECT dropifexists('TRIGGER', 'apopenTrigger');
CREATE TRIGGER apopenTrigger BEFORE INSERT OR UPDATE ON apopen FOR EACH ROW EXECUTE PROCEDURE _apopenTrigger();
