SELECT dropIfExists('TRIGGER', 'pkguiformbeforetrigger');
CREATE OR REPLACE FUNCTION _pkguiformbeforetrigger() RETURNS "trigger" AS '
DECLARE
  _uiformid       INTEGER;
  _debug        BOOL := true;

BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      RETURN NEW;

    ELSIF (TG_OP = ''INSERT'') THEN
      RETURN NEW;

    ELSIF (TG_OP = ''DELETE'') THEN
      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

-- NO create trigger statement
-- triggers will be created that use the trigger function by the updater
