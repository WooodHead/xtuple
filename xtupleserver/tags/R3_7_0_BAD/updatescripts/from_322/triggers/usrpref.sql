CREATE OR REPLACE FUNCTION _usrprefAfterTrigger () RETURNS TRIGGER AS $$
DECLARE
  _empcode      TEXT;
  _empid        INTEGER;
  _empusername  TEXT;
BEGIN
  IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
    IF (NEW.usrpref_name='active') THEN
      SELECT emp_id, emp_username INTO _empid, _empusername
      FROM emp
      WHERE (emp_code=NEW.usrpref_username);
  
      IF (FOUND AND _empusername IS NULL) THEN
        UPDATE emp SET emp_username=NEW.usrpref_username WHERE (emp_id=_empid);
      ELSIF (FOUND AND _empusername != NEW.usrpref_username) THEN
        RAISE EXCEPTION 'User Name % is already in use by an Employee.',
          NEW.usrpref_username;
      ELSIF (NOT FOUND) THEN
        SELECT emp_code, emp_id INTO _empcode, _empid
        FROM emp WHERE emp_username=NEW.usrpref_username;
        IF (FOUND) THEN
          UPDATE emp SET emp_code=NEW.usrpref_username WHERE (emp_id=_empid);
        END IF;
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'usrprefAfterTrigger');
CREATE TRIGGER usrprefAfterTrigger AFTER INSERT OR UPDATE ON usrpref FOR EACH ROW EXECUTE PROCEDURE _usrprefAfterTrigger();
