

CREATE FUNCTION createteexp() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teexp'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here
  ELSE  
    _statement = 'CREATE TABLE te.teexp ' ||
			'(  teexp_id integer NOT NULL, ' ||
			'teexp_expcat_id integer, ' ||
			'teexp_accnt_id integer, ' ||
			'CONSTRAINT teexp_pkey PRIMARY KEY (teexp_id)  ) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.teexp OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teexp TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teexp TO xtrole; ' ||
			'COMMENT ON TABLE te.teexp IS ''Expense/Item'';  ';

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteexp();
DROP FUNCTION createteexp();

