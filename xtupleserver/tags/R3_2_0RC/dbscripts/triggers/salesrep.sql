CREATE OR REPLACE FUNCTION _salesrepBeforeTrigger () RETURNS TRIGGER AS '
DECLARE
  _code         TEXT;
  _empcode      TEXT;
  _empid        INTEGER;
  _empusrid     INTEGER;
BEGIN
  IF (TG_OP = ''INSERT'') THEN
    SELECT salesrep_number INTO _code
    FROM salesrep
    WHERE ( (UPPER(salesrep_number)=UPPER(NEW.salesrep_number))
      AND (salesrep_id<>NEW.salesrep_id) );
    IF (FOUND) THEN
      RAISE EXCEPTION ''The Salesrep Number entered cannot be used as it is in use.'';
    END IF;
  END IF;

  SELECT emp_id INTO _empid
  FROM emp
  WHERE (emp_code=NEW.salesrep_number);

  IF (TG_OP = ''INSERT'') THEN
    -- check old.salesrep_emp_id=_empid so we can detach the sales rep before deleting the emp
    IF (FOUND AND NEW.salesrep_emp_id IS NULL) THEN
      NEW.salesrep_emp_id=_empid;
    ELSIF (FOUND AND _empid != NEW.salesrep_emp_id) THEN
      RAISE EXCEPTION ''Sales Rep Number % is already in use by an Employee.'',
        NEW.salesrep_number;
    ELSIF (NOT FOUND) THEN
      SELECT emp_code, emp_id INTO _empcode, _empid
      FROM emp WHERE emp_id=NEW.salesrep_emp_id;
      IF (FOUND) THEN
        UPDATE emp SET emp_code=NEW.salesrep_number WHERE (emp_id=_empid);
      END IF;
    END IF;

  ELSIF (TG_OP = ''UPDATE'') THEN
    -- check old.salesrep_emp_id=_empid so we can detach the sales rep before deleting the emp
    IF (FOUND AND NEW.salesrep_emp_id IS NULL AND OLD.salesrep_emp_id != _empid) THEN
      NEW.salesrep_emp_id=_empid;
    ELSIF (FOUND AND _empid != NEW.salesrep_emp_id) THEN
      RAISE EXCEPTION ''Sales Rep Number % is already in use by an Employee.'',
        NEW.salesrep_number;
    ELSIF (NOT FOUND) THEN
      SELECT emp_code, emp_id INTO _empcode, _empid
      FROM emp WHERE emp_id=NEW.salesrep_emp_id;
      IF (FOUND) THEN
        UPDATE emp SET emp_code=NEW.salesrep_number WHERE (emp_id=_empid);
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'salesrepBeforeTrigger');
CREATE TRIGGER salesrepBeforeTrigger BEFORE INSERT OR UPDATE ON salesrep FOR EACH ROW EXECUTE PROCEDURE _salesrepBeforeTrigger();
