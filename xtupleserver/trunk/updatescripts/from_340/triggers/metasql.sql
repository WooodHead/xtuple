CREATE OR REPLACE FUNCTION _metasqlTrigger() RETURNS TRIGGER AS $$
BEGIN

-- Update status info
  NEW.metasql_lastuser 		:= current_user;
  NEW.metasql_lastupdate 	:= current_date;
  RETURN NEW;

END;

$$ LANGUAGE 'plpgsql';

SELECT dropifexists( 'TRIGGER', 'metasqlTrigger','PUBLIC');
CREATE TRIGGER metasqlTrigger BEFORE INSERT OR UPDATE ON metasql FOR EACH ROW EXECUTE PROCEDURE _metasqlTrigger();

CREATE OR REPLACE FUNCTION _metasqlalterTrigger() RETURNS TRIGGER AS $$
BEGIN

  IF (NOT checkPrivilege('MaintainMetaSQL')) THEN
    RAISE EXCEPTION 'You do not have privileges to maintain MetaSQL statements.';
  END IF;

-- Disallow tampering
   IF ((TG_OP = 'UPDATE' OR TG_OP = 'DELETE') AND NEW.metasql_grade <= 0) THEN
     RAISE EXCEPTION 'You may not alter grade 0 metasql queries except using the xTuple Updater utility';
   END IF;
   RETURN NEW;
END;

$$ LANGUAGE 'plpgsql';

SELECT dropifexists( 'TRIGGER', 'metasqlAlterTrigger','PUBLIC');
CREATE TRIGGER metasqlAlterTrigger BEFORE INSERT OR UPDATE ON metasql FOR EACH ROW EXECUTE PROCEDURE _metasqlAlterTrigger();
