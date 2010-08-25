CREATE FUNCTION createtemetric_seq() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='temetric_metric_id_seq'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    --_statement = 'ALTER TABLE te.tehead ADD "Table Used to Store T/E Customer Rate Information" TEXT;';
  ELSE  
    _statement = 'CREATE SEQUENCE te.temetric_metric_id_seq ' ||
			'INCREMENT 1 ' ||
			'MINVALUE 1 ' ||
			'MAXVALUE 2147483647 ' ||
			'START 250 ' ||
			'CACHE 1; ' ||
			'ALTER TABLE te.temetric_metric_id_seq OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.temetric_metric_id_seq TO "admin"; ' ||
			'GRANT ALL ON TABLE te.temetric_metric_id_seq TO xtrole;';

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createtemetric_seq();
DROP FUNCTION createtemetric_seq();

