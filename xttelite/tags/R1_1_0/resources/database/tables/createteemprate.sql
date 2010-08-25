

CREATE FUNCTION createteemprate() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teemprate'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='tehead')
                  AND attname='tehead_status')) THEN
      -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    END IF;
  ELSE  
    _statement = 'CREATE TABLE te.teemprate ' ||
			'( teemprate_emp_id integer NOT NULL, ' ||
			'teemprate_rate numeric(16,4) NOT NULL, ' ||
			'CONSTRAINT teemprate_pkey PRIMARY KEY (teemprate_emp_id), ' ||
			'CONSTRAINT teemprate_cust_id_cust_id_fkey FOREIGN KEY (teemprate_emp_id) ' ||
			'REFERENCES emp (emp_id) MATCH SIMPLE ' ||
			'ON UPDATE NO ACTION ON DELETE NO ACTION) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.teemprate OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teemprate TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teemprate TO xtrole; ' ||
			'COMMENT ON TABLE te.teemprate IS ''Default Employee Billing rate for Time/Expense'';   ';

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteemprate();
DROP FUNCTION createteemprate();

