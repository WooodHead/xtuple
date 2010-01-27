SELECT dropIfExists('TRIGGER', 'pkgitembeforetrigger');
CREATE OR REPLACE FUNCTION _pkgitembeforetrigger() RETURNS "trigger" AS '
  DECLARE
    _functionargs TEXT;
    _object       TEXT;
    _schema       TEXT;
    _debug        BOOL := true;
  BEGIN
    IF (TG_OP = ''INSERT'' OR TG_OP = ''UPDATE'') THEN
      IF (NEW.pkgitem_type IN (''F'', ''G'', ''T'', ''V'')) THEN
        IF (POSITION(''.'' IN NEW.pkgitem_name) > 0) THEN
          _schema := SPLIT_PART(NEW.pkgitem_name, ''.'', 1);
          _object := SPLIT_PART(NEW.pkgitem_name, ''.'', 2);
        ELSE
          _schema := CURRENT_SCHEMA();
          _object := NEW.pkgitem_name;
        END IF;
        IF (NEW.pkgitem_type = ''F'') THEN
          _object := SPLIT_PART(_object, ''('', 1);
        END IF;
      END IF;
      IF _debug THEN RAISE NOTICE ''_schema % and _object %'', _schema, _object; END IF;

      IF (NEW.pkgitem_type = ''C'') THEN
        IF (NOT EXISTS(SELECT script_id
                       FROM script
                       WHERE ((script_id=NEW.pkgitem_item_id)
                          AND (script_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Script % as a Package Item without a corresponding script record.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''D'') THEN
        IF (NOT EXISTS(SELECT cmd_id
                       FROM cmd
                       WHERE ((cmd_id=NEW.pkgitem_item_id)
                          AND (cmd_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Custom Command % as a Package Item without a corresponding cmd record.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''F'') THEN
        SELECT oidvectortypes(proargtypes) INTO _functionargs
        FROM pg_proc, pg_namespace
        WHERE ((pg_proc.oid=NEW.pkgitem_item_id)
           AND (proname=_object)
           AND (pronamespace=pg_namespace.oid)
           AND (nspname=_schema));
        IF (NOT FOUND) THEN
          RAISE EXCEPTION ''Cannot create Function % (oid %) as a Package Item without a corresponding function in the database.'',
            NEW.pkgitem_name, NEW.pkgitem_item_id;
        END IF;

        NEW.pkgitem_name := _schema || ''.'' || _object || ''('' || _functionargs || '')'';
        IF _debug THEN RAISE NOTICE ''changed pkgitem_name to %'', NEW.pkgitem_name; END IF;

      ELSIF (NEW.pkgitem_type = ''G'') THEN
        IF (NOT EXISTS(SELECT pg_class.oid
                     FROM pg_trigger, pg_class, pg_namespace
                     WHERE ((tgname=_object)
                        AND (tgrelid=pg_class.oid)
                        AND (relnamespace=pg_namespace.oid)
                        AND (nspname=_schema)))) THEN
          RAISE EXCEPTION ''Cannot create Trigger % as a Package Item without a corresponding trigger in the database.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''I'') THEN
        IF (NOT EXISTS(SELECT image_id
                       FROM image
                       WHERE ((image_id=NEW.pkgitem_item_id)
                          AND (image_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Image % as a Package Item without a corresponding image record.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''M'') THEN
        RAISE EXCEPTION ''Menus are not yet supported pkgitems.'';

      ELSIF (NEW.pkgitem_type = ''P'') THEN
        IF (NOT EXISTS(SELECT priv_id
                       FROM priv
                       WHERE ((priv_id=NEW.pkgitem_item_id)
                          AND (priv_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Privilege % as a Package Item without a corresponding priv record.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''R'') THEN
        IF (NOT EXISTS(SELECT report_id
                       FROM report
                       WHERE ((report_id=NEW.pkgitem_item_id)
                          AND (report_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create Report % as a Package Item without a corresponding report record.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''S'') THEN
        IF (NOT EXISTS(SELECT oid
                       FROM pg_namespace
                       WHERE (nspname=NEW.pkgitem_name))) THEN
          RAISE EXCEPTION ''Cannot create Schema % as a Package Item without a corresponding schema in the database.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''T'') THEN
        IF (NOT EXISTS(SELECT pg_class.oid
                     FROM pg_class, pg_namespace
                     WHERE ((relname=_object)
                        AND (relnamespace=pg_namespace.oid)
                        AND (relkind=''r'')
                        AND (nspname=_schema)))) THEN
          RAISE EXCEPTION ''Cannot create Table % as a Package Item without a corresponding table in the database.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''U'') THEN
        IF (NOT EXISTS(SELECT uiform_id
                       FROM uiform
                       WHERE ((uiform_id=NEW.pkgitem_item_id)
                          AND (uiform_name=NEW.pkgitem_name)))) THEN
          RAISE EXCEPTION ''Cannot create User Interface Form % as a Package Item without a corresponding uiform record.'',
            NEW.pkgitem_name;
        END IF;

      ELSIF (NEW.pkgitem_type = ''V'') THEN
        IF (NOT EXISTS(SELECT pg_class.oid
                     FROM pg_class, pg_namespace
                     WHERE ((relname=_object)
                        AND (relnamespace=pg_namespace.oid)
                        AND (relkind=''v'')
                        AND (nspname=_schema)))) THEN
          RAISE EXCEPTION ''Cannot create View % as a Package Item without a corresponding view in the database.'',
            NEW.pkgitem_name;
        END IF;

      ELSE
        RAISE EXCEPTION ''"%" is not a valid type of package item.'',
          NEW.pkgitem_type;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN
      IF _debug THEN RAISE NOTICE ''Deleting % % %'', OLD.pkgitem_item_id, OLD.pkgitem_name, OLD.pkgitem_type; END IF;

      IF (OLD.pkgitem_type IN (''F'', ''G'', ''T'', ''V'')) THEN
        IF (POSITION(''.'' IN OLD.pkgitem_name) > 0) THEN
          _schema = SPLIT_PART(OLD.pkgitem_name, ''.'', 1);
          _object = SPLIT_PART(OLD.pkgitem_name, ''.'', 2);
        ELSE
          _schema = ''public'';
          _object = OLD.pkgitem_name;
        END IF;
      END IF;

      IF (OLD.pkgitem_type = ''C'') THEN
        DELETE FROM script WHERE ((script_id=OLD.pkgitem_item_id)
                              AND (script_name=OLD.pkgitem_name));

      ELSIF (OLD.pkgitem_type = ''D'') THEN
        DELETE FROM cmd
          WHERE ((cmd_id=OLD.pkgitem_item_id)
            AND  (cmd_name=OLD.pkgitem_name));

      ELSIF (OLD.pkgitem_type = ''F'') THEN
        -- SELECT dropIfExists(''FUNCTION'', CAST (oid::regprocedure AS TEXT), _schema)
        PERFORM dropIfExists(''FUNCTION'',
                            proname || ''('' ||
                            oidvectortypes(proargtypes) || '')'',
                            _schema)
        FROM pg_proc
        WHERE (oid=OLD.pkgitem_item_id);

      ELSIF (OLD.pkgitem_type = ''G'') THEN
        PERFORM dropIfExists(''TRIGGER'', _object, _schema);

      ELSIF (OLD.pkgitem_type = ''I'') THEN
        DELETE FROM image WHERE ((image_id=OLD.pkgitem_item_id)
                             AND (image_name=OLD.pkgitem_name));

      ELSIF (OLD.pkgitem_type = ''M'') THEN
        RAISE EXCEPTION ''Menus are not yet supported pkgitems.'';

      ELSIF (OLD.pkgitem_type = ''P'') THEN
        DELETE FROM priv WHERE ((priv_id=OLD.pkgitem_item_id)
                            AND (priv_name=OLD.pkgitem_name));

      ELSIF (OLD.pkgitem_type = ''R'') THEN
        DELETE FROM report
        WHERE ((report_id=OLD.pkgitem_item_id)
           AND (report_name=OLD.pkgitem_name));

      ELSIF (OLD.pkgitem_type = ''S'') THEN
        PERFORM dropIfExists(''SCHEMA'', OLD.pkgitem_name, OLD.pkgitem_name);

      ELSIF (OLD.pkgitem_type = ''T'') THEN
        PERFORM dropIfExists(''TABLE'', _object, _schema);

      ELSIF (OLD.pkgitem_type = ''U'') THEN
        DELETE FROM uiform
        WHERE ((uiform_id=OLD.pkgitem_item_id)
           AND (uiform_name=OLD.pkgitem_name));

      ELSIF (OLD.pkgitem_type = ''V'') THEN
        PERFORM dropIfExists(''VIEW'', _object, _schema);

      ELSE
        RAISE EXCEPTION ''"%" is not a valid type of package item.'',
          OLD.pkgitem_type;
      END IF;
      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

CREATE TRIGGER pkgitembeforetrigger
  BEFORE  INSERT OR
	  UPDATE OR DELETE
  ON pkgitem
  FOR EACH ROW
  EXECUTE PROCEDURE _pkgitembeforetrigger();
