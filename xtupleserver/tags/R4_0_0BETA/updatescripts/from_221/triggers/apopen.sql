CREATE OR REPLACE FUNCTION _apopenTrigger() RETURNS TRIGGER AS '
DECLARE
  _openAmount NUMERIC;
  _p RECORD;

BEGIN

-- Mark this apopen close date
  IF (TG_OP = ''UPDATE'') THEN
    IF ((OLD.apopen_open=TRUE) and (NEW.apopen_open=FALSE)) THEN
      NEW.apopen_closedate=current_date;
    END IF;
  END IF;

  RETURN NEW;

END;

' LANGUAGE 'plpgsql';

DROP TRIGGER apopenTrigger ON apopen;
CREATE TRIGGER apopenTrigger BEFORE INSERT OR UPDATE ON apopen FOR EACH ROW EXECUTE PROCEDURE _apopenTrigger();
