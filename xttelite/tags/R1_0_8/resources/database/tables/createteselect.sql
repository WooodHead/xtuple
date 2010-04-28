

CREATE FUNCTION createteselect() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teselect'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
		-- do nothing (this ensures that the table is created as needed.  Revisions should go here
  ELSE  
    _statement = 'CREATE TABLE te.teselect ' ||
			'(  teselect_id serial NOT NULL, ' ||
			'teselect_cons_id integer NOT NULL, ' ||
			'teselect_tehead_id integer NOT NULL, ' ||
			'CONSTRAINT teselect_pkey PRIMARY KEY (teselect_id) ) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.teselect OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teselect TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teselect TO xtrole;';

  END IF;

  EXECUTE _statement;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteselect();
DROP FUNCTION createteselect();


