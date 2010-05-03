CREATE FUNCTION createtimesheet_seq() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='timesheet_seq'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    --_statement = 'ALTER TABLE te.tehead ADD "Table Used to Store T/E Customer Rate Information" TEXT;';
  ELSE  
    _statement = 'CREATE SEQUENCE te.timesheet_seq ' ||
			'INCREMENT 1 ' ||
			'MINVALUE 1 ' ||
			'MAXVALUE 9223372036854775807 ' ||
			'START 1000 ' ||
			'CACHE 1; ' ||
			'ALTER TABLE te.timesheet_seq OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.timesheet_seq TO xtrole; ' ||
			'GRANT ALL ON TABLE te.timesheet_seq TO "admin"; ';

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createtimesheet_seq();
DROP FUNCTION createtimesheet_seq();

