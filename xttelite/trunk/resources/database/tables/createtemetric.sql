CREATE FUNCTION createtemetric() RETURNS INTEGER AS $$
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='temetric'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    -- te.temetric table exists
    IF (EXISTS(SELECT relname
                 FROM pg_class, pg_namespace
                WHERE relname='temetric_metric_id_seq1'
                  AND relnamespace=pg_namespace.oid
                  AND nspname='te')) THEN
      -- te.temetric_metric_id_seq1 sequence exists
      -- rename to te.temetric_metric_id_seq
      DROP SEQUENCE te.temetric_metric_id_seq;
      ALTER SEQUENCE te.temetric_metric_id_seq1 RENAME TO temetric_metric_id_seq;
      GRANT ALL ON SEQUENCE te.temetric_metric_id_seq TO xtrole;
    END IF;

  ELSE  
    CREATE TABLE te.temetric
     ( metric_id SERIAL PRIMARY KEY,
       metric_name text,
       metric_value text,
       metric_module text );
       ALTER TABLE te.temetric OWNER TO "admin";
       GRANT ALL ON TABLE te.temetric TO "admin";
       GRANT ALL ON TABLE te.temetric TO xtrole;
       GRANT ALL ON SEQUENCE te.temetric_metric_id_seq TO xtrole;
       COMMENT ON TABLE te.temetric IS 'Time/Expense settings information';
    
  END IF;
  
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
		WHERE relname='metric_name_key'
		AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    -- te.metric_name index exists
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here

  ELSE  
    CREATE INDEX metric_name_key ON te.temetric USING btree (metric_name);

  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createtemetric();
DROP FUNCTION createtemetric();


