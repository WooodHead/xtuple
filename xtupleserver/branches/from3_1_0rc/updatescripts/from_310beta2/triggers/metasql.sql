CREATE OR REPLACE FUNCTION _metasqlTrigger() RETURNS TRIGGER AS '
BEGIN

-- Update status info
  NEW.metasql_lastuser 		:= current_user;
  NEW.metasql_lastupdate 	:= current_date;
  RETURN NEW;

END;

' LANGUAGE 'plpgsql';

SELECT dropifexists( 'TRIGGER', 'metasqlTrigger','PUBLIC');
CREATE TRIGGER metasqlTrigger BEFORE INSERT OR UPDATE ON metasql FOR EACH ROW EXECUTE PROCEDURE _metasqlTrigger();

CREATE OR REPLACE FUNCTION _metasqlalterTrigger() RETURNS TRIGGER AS '
BEGIN

-- Disallow tampering
   IF (TG_OP = ''UPDATE'' OR TG_OP = ''DELETE'') THEN
     RAISE EXCEPTION ''You may not alter metasql queries except using the xTuple Updater utility'';
   END IF;
   RETURN NEW;
END;

' LANGUAGE 'plpgsql';

SELECT dropifexists( 'TRIGGER', 'metasqlAlterTrigger','PUBLIC');
CREATE TRIGGER metasqlAlterTrigger BEFORE INSERT OR UPDATE ON metasql FOR EACH ROW EXECUTE PROCEDURE _metasqlAlterTrigger();
