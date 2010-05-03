CREATE FUNCTION createteprj_seq() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teprj_teprj_id_seq'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    --_statement = 'ALTER TABLE te.tehead ADD "Table Used to Store T/E Customer Rate Information" TEXT;';
  ELSE  
    _statement = 'CREATE SEQUENCE te.teprj_teprj_id_seq ' ||
			'INCREMENT 1 ' ||
			'MINVALUE 1 ' ||
			'MAXVALUE 9223372036854775807 ' ||
			'START 11 ' ||
			'CACHE 1; ' ||
			'ALTER TABLE te.teprj_teprj_id_seq OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teprj_teprj_id_seq TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teprj_teprj_id_seq TO xtrole; ';
			
  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteprj_seq();
DROP FUNCTION createteprj_seq();

