-- NO create trigger statements. the updater will create them.

SELECT dropIfExists('TRIGGER', 'pkgmetasqlbeforetrigger');
CREATE OR REPLACE FUNCTION _pkgmetasqlbeforetrigger() RETURNS "trigger" AS $$
DECLARE
  _metasqlid    INTEGER;
  _debug        BOOL := false;

BEGIN
  IF (NOT checkPrivilege('MaintainMetaSQL')) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain MetaSQL statements.';
  END IF;

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
      RAISE NOTICE 'insert NEW %-%', NEW.metasql_group, NEW.metasql_name, NEW.metasql_grade;
    END IF;
    SELECT metasql_id INTO _metasqlid
    FROM metasql
    WHERE metasql_name=NEW.metasql_name AND metasql_group=NEW.metasql_group AND metasql_grade=NEW.metasql_grade;
    IF (FOUND) THEN
      RAISE EXCEPTION 'The new MetaSQL statement %-% % conflicts with an existing statement.',
                      NEW.metasql_group, NEW.metasql_name, NEW.metasql_grade;
    END IF;

  ELSIF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION _pkgmetasqlalterTrigger() RETURNS TRIGGER AS $$
BEGIN
  IF (pkgMayBeModified(TG_TABLE_SCHEMA)) THEN
    IF (TG_OP = 'DELETE') THEN
      RETURN OLD;
    ELSE
      RETURN NEW;
    END IF;
  END IF;

  -- cannot combine IF's because plpgsql does not always evaluate left-to-right
  IF (TG_OP = 'INSERT') THEN
    IF (NEW.metasql_grade <= 0) THEN
      RAISE EXCEPTION 'You may not create grade 0 MetaSQL statements in packages except using the xTuple Updater utility';
    END IF;

  ELSIF (TG_OP = 'UPDATE') THEN
    IF (NEW.metasql_grade <= 0) THEN
      RAISE EXCEPTION 'You may not alter grade 0 MetaSQL statements in packages except using the xTuple Updater utility';
    END IF;

  ELSIF (TG_OP = 'DELETE') THEN
    IF (OLD.metasql_grade <= 0) THEN
      RAISE EXCEPTION 'You may not delete grade 0 MetaSQL statements from packages. Try deleting or disabling the package.';
    ELSE
      RETURN OLD;
    END IF;

  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION _pkgmetasqlaftertrigger() RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';
