SELECT dropIfExists('TRIGGER', 'pkgimagebeforetrigger');
CREATE OR REPLACE FUNCTION _pkgimagebeforetrigger() RETURNS "trigger" AS '
DECLARE
  _imageid       INTEGER;
  _debug        BOOL := true;

BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      -- IF (_debug) THEN
        RAISE NOTICE ''OLD.image_name %, NEW.image_name %'',
                     OLD.image_name, NEW.image_name;
      -- END IF;

      IF (NEW.image_name != OLD.image_name) THEN
        SELECT image_id INTO _imageid FROM image WHERE image_name=NEW.image_name;
        IF (FOUND) THEN
          RAISE EXCEPTION ''Cannot change image named % because another image with that name already exists.'', NEW.image_name;
        END IF;
      END IF;

    ELSIF (TG_OP = ''INSERT'') THEN
      -- IF (_debug) THEN
        RAISE NOTICE ''inserting NEW.image_name %'', NEW.image_name;
      -- END IF;
      SELECT image_id INTO _imageid FROM image WHERE image_name=NEW.image_name;
      IF (FOUND) THEN
        RAISE EXCEPTION ''Cannot create new image % because another image with that name already exists.'', NEW.image_name;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN

      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

-- NO create trigger statement
-- triggers will be created that use the trigger function by the updater
