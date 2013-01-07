SELECT dropIfExists('TRIGGER', 'pkgprivbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgprivbeforetrigger() RETURNS "trigger" AS '
DECLARE
  _privid       INTEGER;
  _debug        BOOL := true;

BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      -- IF (_debug) THEN
        RAISE NOTICE ''OLD.priv_name %, NEW.priv_name %'',
                     OLD.priv_name, NEW.priv_name;
      -- END IF;

      IF (NEW.priv_name != OLD.priv_name) THEN
        SELECT priv_id INTO _privid FROM priv WHERE priv_name=NEW.priv_name;
        IF (FOUND) THEN
          RAISE EXCEPTION ''Cannot change privilege name % because another privilege with that name already exists.'', NEW.priv_name;
        END IF;
      END IF;

    ELSIF (TG_OP = ''INSERT'') THEN
      -- IF (_debug) THEN
        RAISE NOTICE ''inserting NEW.priv_name %'', NEW.priv_name;
      -- END IF;
      SELECT priv_id INTO _privid FROM priv WHERE priv_name=NEW.priv_name;
      IF (FOUND) THEN
        RAISE EXCEPTION ''Cannot create new privilege % because another privilege with that name already exists.'', NEW.priv_name;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN
      DELETE FROM usrpriv WHERE usrpriv_priv_id=OLD.priv_id;
      DELETE FROM grppriv WHERE grppriv_priv_id=OLD.priv_id;

      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

-- NO create trigger statement
-- triggers will be created that use the trigger function by the updater
