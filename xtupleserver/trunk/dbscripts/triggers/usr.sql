CREATE OR REPLACE FUNCTION _usrAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _empcode      TEXT;
  _empid        INTEGER;
  _empusrid     INTEGER;
BEGIN
  IF (TG_OP = ''INSERT'' OR TG_OP = ''UPDATE'') THEN
    IF (NEW.usr_username != OLD.usr_username) THEN
      RAISE EXCEPTION ''You cannot change the User Name.'';
    END IF;

    SELECT emp_id, emp_usr_id INTO _empid, _empusrid
    FROM emp
    WHERE (emp_code=NEW.usr_username);

    IF (FOUND AND _empusrid IS NULL) THEN
      UPDATE emp SET emp_usr_id=NEW.usr_id WHERE (emp_id=_empid);
    ELSIF (FOUND AND _empusrid != NEW.usr_id) THEN
      RAISE EXCEPTION ''User Name % is already in use by an Employee.'',
        NEW.usr_username;
    ELSIF (NOT FOUND) THEN
      SELECT emp_code, emp_id INTO _empcode, _empid
      FROM emp WHERE emp_usr_id=NEW.usr_id;
      IF (FOUND) THEN
        UPDATE emp SET emp_code=NEW.usr_username WHERE (emp_id=_empid);
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'usrAfterTrigger');
CREATE TRIGGER usrAfterTrigger AFTER INSERT OR UPDATE ON usr FOR EACH ROW EXECUTE PROCEDURE _usrAfterTrigger();
