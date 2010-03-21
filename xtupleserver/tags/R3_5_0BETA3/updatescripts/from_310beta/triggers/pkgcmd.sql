SELECT dropIfExists('TRIGGER', 'pkgcmdbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgcmdbeforetrigger() RETURNS "trigger" AS '
DECLARE
  _cmdid       INTEGER;
  _debug        BOOL := true;

BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      IF (_debug) THEN
        RAISE NOTICE ''OLD.cmd_name %, NEW.cmd_name %'',
                     OLD.cmd_name, NEW.cmd_name;
      END IF;

      IF (NEW.cmd_name != OLD.cmd_name) THEN
        SELECT cmd_id INTO _cmdid FROM cmd WHERE cmd_name=NEW.cmd_name;
        IF (FOUND) THEN
          RAISE EXCEPTION ''Cannot change command name % because another command with that name already exists.'', NEW.cmd_name;
        END IF;
      END IF;

    ELSIF (TG_OP = ''INSERT'') THEN
      IF (_debug) THEN
        RAISE NOTICE ''inserting NEW.cmd_name %'', NEW.cmd_name;
      END IF;
      SELECT cmd_id INTO _cmdid FROM cmd WHERE cmd_name=NEW.cmd_name;
      IF (FOUND) THEN
        RAISE EXCEPTION ''Cannot create new command % because another command with that name already exists.'', NEW.cmd_name;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN
      DELETE FROM pkgcmdarg WHERE cmdarg_cmd_id=OLD.cmd_id;

      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

-- NO create trigger statement
-- triggers will be created that use the trigger function by the updater
