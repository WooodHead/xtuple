
CREATE FUNCTION createteprj() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teprj'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='tehead')
                  AND attname='tehead_status')) THEN
      -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    END IF;
  ELSE  
    _statement = 'CREATE TABLE te.teprj ' ||
			'(  teprj_id serial NOT NULL, ' ||
			'teprj_prj_id integer, ' ||
			'teprj_cust_id integer, ' ||
			'teprj_rate numeric, ' ||
			'CONSTRAINT teprj_pkey PRIMARY KEY (teprj_id) ) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.teprj OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teprj TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teprj TO xtrole; ' ||
			'COMMENT ON TABLE te.teprj IS ''t/e information for projects'';';

  END IF;

  EXECUTE _statement;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteprj();
DROP FUNCTION createteprj();


