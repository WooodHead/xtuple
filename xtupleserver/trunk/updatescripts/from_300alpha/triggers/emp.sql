CREATE OR REPLACE FUNCTION _empBeforeTrigger () RETURNS TRIGGER AS '
DECLARE
  _cmnttypeid   INTEGER;

BEGIN

  --  Checks
  IF NOT (checkPrivilege(''MaintainEmployees'')) THEN
    RAISE EXCEPTION ''You do not have privileges to maintain Employees.'';
  END IF;

  IF (TG_OP IN (''INSERT'',''UPDATE'')) THEN
    IF (NEW.emp_code IS NULL) THEN
      RAISE EXCEPTION ''You must supply a valid Employee Code.'';
    END IF;

    IF (NEW.emp_number IS NULL) THEN
      RAISE EXCEPTION ''You must supply a valid Employee Number.'';
    END IF;

    IF (NEW.emp_id = NEW.emp_mgr_emp_id) THEN
      RAISE EXCEPTION ''An Employee may not be his or her own Manager.'';
    END IF;

  END IF;

  IF ( SELECT (metric_value=''t'')
       FROM metric
       WHERE (metric_name=''EmployeeChangeLog'') ) THEN

    SELECT cmnttype_id INTO _cmnttypeid
    FROM cmnttype
    WHERE (cmnttype_name=''ChangeLog'');

    IF (FOUND) THEN
      IF (TG_OP = ''INSERT'') THEN
        PERFORM postComment(_cmnttypeid, ''EMP'', NEW.emp_id, ''Created'');

      ELSIF (TG_OP = ''DELETE'') THEN
	PERFORM postComment(_cmnttypeid, ''EMP'', OLD.emp_id,
			    (''Deleted "'' || OLD.emp_code || ''"''));

      ELSIF (TG_OP = ''UPDATE'') THEN

        IF (OLD.emp_number <> NEW.emp_number) THEN
          PERFORM postComment( _cmnttypeid, ''EMP'', NEW.emp_id,
                               (''Number Changed from "'' || OLD.emp_number || ''" to "'' || NEW.emp_number || ''"'') );
        END IF;

        IF (OLD.emp_code <> NEW.emp_code) THEN
          PERFORM postComment( _cmnttypeid, ''EMP'', NEW.emp_id,
                               (''Code Changed from "'' || OLD.emp_code || ''" to "'' || NEW.emp_code || ''"'') );
        END IF;

        IF (OLD.emp_active <> NEW.emp_active) THEN
          IF (NEW.emp_active) THEN
            PERFORM postComment(_cmnttypeid, ''EMP'', NEW.emp_id, ''Activated'');
          ELSE
            PERFORM postComment(_cmnttypeid, ''EMP'', NEW.emp_id, ''Deactivated'');
          END IF;
        END IF;

        IF (COALESCE(OLD.emp_dept_id, -1) <> COALESCE(NEW.emp_dept_id, -1)) THEN
          PERFORM postComment(_cmnttypeid, ''EMP'', NEW.emp_id,
                              (''Department Changed from "'' ||
                               COALESCE((SELECT dept_number FROM dept WHERE dept_id=OLD.emp_dept_id), '''')
                              || ''" to "'' ||
                               COALESCE((SELECT dept_number FROM dept WHERE dept_id=NEW.emp_dept_id), '''')
                               || ''"''));
        END IF;

        IF (COALESCE(OLD.emp_shift_id, -1) <> COALESCE(NEW.emp_shift_id, -1)) THEN
          PERFORM postComment(_cmnttypeid, ''EMP'', NEW.emp_id,
                              (''Shift Changed from "'' ||
                               COALESCE((SELECT shift_number FROM shift WHERE shift_id=OLD.emp_shift_id), '''')
                              || ''" to "'' ||
                               COALESCE((SELECT shift_number FROM shift WHERE shift_id=NEW.emp_shift_id), '''')
                               || ''"''));
        END IF;

      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''DELETE'') THEN
    UPDATE salesrep SET salesrep_emp_id = NULL WHERE salesrep_emp_id = OLD.emp_id;
    RETURN OLD;
  ELSIF (TG_OP = ''INSERT'' ) THEN
    IF (NEW.emp_usr_id IS NULL) THEN
      SELECT usr_id INTO NEW.emp_usr_id
      FROM usr WHERE (usr_username=NEW.emp_code);
    END IF;
  ELSIF (TG_OP = ''UPDATE'') THEN
    IF (OLD.emp_code != NEW.emp_code AND NEW.emp_usr_id IS NULL) THEN
      SELECT usr_id INTO NEW.emp_usr_id
      FROM usr WHERE (usr_username=NEW.emp_code);
    END IF;
  END IF;
  
  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'empBeforeTrigger');
CREATE TRIGGER empBeforeTrigger BEFORE INSERT OR UPDATE OR DELETE ON emp FOR EACH ROW EXECUTE PROCEDURE _empBeforeTrigger();

CREATE OR REPLACE FUNCTION _empAfterTrigger () RETURNS TRIGGER AS '
DECLARE
  _salesrepempid  INTEGER;
  _salesrepid     INTEGER;
  _salesrepnumber TEXT;
  _usrid          INTEGER;
  _username       TEXT;
BEGIN
  IF (TG_OP = ''INSERT'') THEN
    SELECT usr_id INTO _usrid FROM usr WHERE (usr_username=NEW.emp_code);

    IF ((NOT FOUND AND COALESCE(NEW.emp_usr_id, -1) > 0) OR
        (FOUND     AND COALESCE(NEW.emp_usr_id, _usrid) !=_usrid)) THEN
      RAISE EXCEPTION ''This Employee Code is associated with a User Name and may not be changed.'';
    ELSIF (FOUND AND COALESCE(NEW.emp_usr_id, _usrid) != _usrid) THEN
      RAISE EXCEPTION ''This Employee Code is already in use as a User Name. Please choose a different Employee Code.'';
    END IF;

  ELSIF (TG_OP = ''UPDATE'') THEN
    IF (OLD.emp_code != NEW.emp_code) THEN
      SELECT usr_id INTO _usrid FROM usr WHERE (usr_username=NEW.emp_code);

      IF ((NOT FOUND AND COALESCE(NEW.emp_usr_id, -1) > 0) OR
          (FOUND     AND COALESCE(NEW.emp_usr_id, _usrid) !=_usrid)) THEN
        RAISE EXCEPTION ''This Employee Code is associated with a User Name and may not be changed.'';
      ELSIF (FOUND AND COALESCE(NEW.emp_usr_id, _usrid) != _usrid) THEN
        RAISE EXCEPTION ''This Employee Code is already in use as a User Name. Please choose a different Employee Code.'';
      END IF;
    END IF;
  END IF;

  IF (TG_OP = ''UPDATE'' OR TG_OP = ''INSERT'') THEN
    SELECT salesrep_id, salesrep_emp_id INTO _salesrepid, _salesrepempid
    FROM salesrep
    WHERE (salesrep_number=NEW.emp_code);

    IF (NOT FOUND) THEN
      SELECT salesrep_number, salesrep_id INTO _salesrepnumber, _salesrepid
      FROM salesrep WHERE salesrep_emp_id=NEW.emp_id;
      IF (_salesrepnumber != NEW.emp_code) THEN
        UPDATE salesrep SET salesrep_number=NEW.emp_code WHERE (salesrep_id=_salesrepid);
      END IF;
    ELSIF (FOUND AND _salesrepempid IS NULL) THEN
      UPDATE salesrep SET salesrep_emp_id=NEW.emp_id
      WHERE salesrep_id=_salesrepid;
    ELSIF (FOUND AND COALESCE(_salesrepempid, NEW.emp_id) != NEW.emp_id) THEN
      RAISE EXCEPTION ''This Employee Code is already in use by a Sales Rep. Please choose a different Employee Code.'';
    END IF;
  END IF;

  RETURN NEW;
END;
' LANGUAGE 'plpgsql';

SELECT dropIfExists('TRIGGER', 'empAfterTrigger');
CREATE TRIGGER empAfterTrigger AFTER INSERT OR UPDATE ON emp FOR EACH ROW EXECUTE PROCEDURE _empAfterTrigger();
