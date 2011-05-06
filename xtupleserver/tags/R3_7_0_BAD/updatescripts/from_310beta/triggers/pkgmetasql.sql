SELECT dropIfExists('TRIGGER', 'pkgmetasqlbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgmetasqlbeforetrigger() RETURNS "trigger" AS '
DECLARE
  _metasqlid       INTEGER;
  _debug        BOOL := true;

BEGIN
    IF (TG_OP = ''UPDATE'') THEN
      IF (_debug) THEN
        RAISE NOTICE ''update OLD %-%, NEW %-%'',
                     OLD.metasql_group, OLD.metasql_name,
                     NEW.metasql_group, NEW.metasql_name;
      END IF;

      IF (NEW.metasql_name != OLD.metasql_name OR NEW.metasql_group != OLD.metasql_group) THEN
        SELECT metasql_id INTO _metasqlid
        FROM metasql
        WHERE metasql_name=NEW.metasql_name AND metasql_group=NEW.metasql_group;
        IF (FOUND) THEN
          RAISE EXCEPTION ''Cannot change the MetaSQL statement named %-% because another MetaSQL statement with that group and name already exists.'', NEW.metasql_group, NEW.metasql_name;
        END IF;
      END IF;

    ELSIF (TG_OP = ''INSERT'') THEN
      IF (_debug) THEN
        RAISE NOTICE ''insert NEW %-%'', NEW.metasql_group, NEW.metasql_name;
      END IF;
      SELECT metasql_id INTO _metasqlid
      FROM metasql
      WHERE metasql_name=NEW.metasql_name AND metasql_group=NEW.metasql_group;
      IF (FOUND) THEN
        RAISE EXCEPTION ''Cannot create new MetaSQL statement % because another MetaSQL statement with that name already exists.'', NEW.metasql_name;
      END IF;

    ELSIF (TG_OP = ''DELETE'') THEN
      RETURN OLD;
    END IF;

    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';

-- NO create trigger statement
-- triggers will be created that use the trigger function by the updater
