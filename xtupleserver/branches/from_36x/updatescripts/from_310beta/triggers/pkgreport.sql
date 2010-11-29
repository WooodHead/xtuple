SELECT dropIfExists('TRIGGER', 'pkgreportbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgreportbeforetrigger() RETURNS "trigger" AS '
DECLARE
  _reportid       INTEGER;
  _debug        BOOL := true;

BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      IF (_debug) THEN
        RAISE NOTICE ''update OLD % %, NEW % %'',
                     OLD.report_name, OLD.report_grade, NEW.report_name, NEW.report_grade;
      END IF;

      IF (NEW.report_name != OLD.report_name) THEN
        SELECT report_id INTO _reportid FROM report WHERE report_name=NEW.report_name;
        IF (FOUND) THEN
          RAISE EXCEPTION ''Cannot change report % % because another report with that name and grade already exists.'', NEW.report_name, NEW.report_grade;
        END IF;
      END IF;

    ELSIF (TG_OP = ''INSERT'') THEN
      IF (_debug) THEN
        RAISE NOTICE ''insert NEW % %'', NEW.report_name, NEW.report_grade;
      END IF;
      SELECT report_id INTO _reportid FROM report WHERE report_name=NEW.report_name;
      IF (FOUND) THEN
        RAISE EXCEPTION ''Cannot create new report % % because another report with that name and grade already exists.'', NEW.report_name, NEW.report_grade;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN

      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

-- NO create trigger statement
-- triggers will be created that use the trigger function by the updater
