

CREATE FUNCTION createtemetric() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='temetric'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='tehead')
                  AND attname='tehead_status')) THEN
      -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    END IF;
  ELSE  
    _statement = 'CREATE TABLE te.temetric ' ||
			'(  metric_id serial NOT NULL, ' ||
			'metric_name text, ' ||
			'metric_value text, ' ||
			'metric_module text, ' ||
			'CONSTRAINT metric_pkey PRIMARY KEY (metric_id)  ) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.temetric OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.temetric TO "admin"; ' ||
			'GRANT ALL ON TABLE te.temetric TO xtrole; ' ||
			'COMMENT ON TABLE te.temetric IS ''Time/Expense settings information'';';
    
  END IF;

  EXECUTE _statement;

  _statement := '';
  
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
		WHERE relname='metric_name_key'
		AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='tehead')
                  AND attname='tehead_status')) THEN
      -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    END IF;
  ELSE  
    _statement = 'CREATE INDEX metric_name_key ' ||
			'ON te.temetric ' ||
			'USING btree ' ||
			'(metric_name);';

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createtemetric();
DROP FUNCTION createtemetric();


