-- NO create trigger statements. the updater will create them.

SELECT dropIfExists('TRIGGER', 'pkgmetasqlbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgmetasqlbeforetrigger() RETURNS "trigger" AS $$
DECLARE
  _metasqlid    INTEGER;
  _debug        BOOL := false;

BEGIN
  IF (TG_OP = 'UPDATE') THEN
    IF (_debug) THEN
      RAISE NOTICE 'update OLD %-%, NEW %-%',
                   OLD.metasql_group, OLD.metasql_name,
                   NEW.metasql_group, NEW.metasql_name;
    END IF;

    IF (NEW.metasql_name != OLD.metasql_name OR NEW.metasql_group != OLD.metasql_group) THEN
      SELECT metasql_id INTO _metasqlid
      FROM metasql
      WHERE metasql_name=NEW.metasql_name AND metasql_group=NEW.metasql_group;
      IF (FOUND) THEN
        RAISE EXCEPTION 'Cannot change the MetaSQL statement named %-% because another MetaSQL statement with that group and name already exists.', NEW.metasql_group, NEW.metasql_name;
      END IF;
    END IF;

  ELSIF (TG_OP = 'INSERT') THEN
    IF (_debug) THEN
      RAISE NOTICE 'insert NEW %-%', NEW.metasql_group, NEW.metasql_name;
    END IF;
    SELECT metasql_id INTO _metasqlid
    FROM metasql
    WHERE metasql_name=NEW.metasql_name AND metasql_group=NEW.metasql_group;
    IF (FOUND) THEN
      RAISE EXCEPTION 'Cannot create new MetaSQL statement % because another MetaSQL statement with that name already exists.', NEW.metasql_name;
    END IF;

  ELSIF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION _pkgmetasqlalterTrigger() RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    RAISE EXCEPTION 'You may not create MetaSQL statements in packages except using the xTuple Updater utility';

  ELSIF (TG_OP = 'UPDATE') THEN
    RAISE EXCEPTION 'You may not alter MetaSQL statements in packages except using the xTuple Updater utility';

  ELSIF (TG_OP = 'DELETE') THEN
    RAISE EXCEPTION 'You may not delete MetaSQL statements from packages. Try deleting or disabling the package.';

  END IF;

  RETURN NEW;
END;

$$ LANGUAGE 'plpgsql';
