
CREATE OR REPLACE FUNCTION createteprjtask() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teprjtask'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='tehead')
                  AND attname='tehead_status')) THEN
      -- do nothing (this ensures that the table is created as needed.  Revisions should go here
    END IF;
  ELSE  
    _statement = 'CREATE TABLE te.teprjtask ' ||
		 '( teprjtask_prj_id integer NOT NULL, ' ||
		 ' teprjtask_prjtask_number text NOT NULL, ' ||
  		 ' teprjtask_cust_id integer, ' ||
		 ' teprjtask_rate numeric, ' ||
		 ' teprjtask_item_id integer, ' ||
		 ' CONSTRAINT teprjtask_pkey PRIMARY KEY  ' ||				 		
		 ' (teprjtask_prj_id,teprjtask_prjtask_number)); ' ||
		 'ALTER TABLE te.teprjtask OWNER TO "admin"; ' ||
		 'GRANT ALL ON TABLE te.teprjtask TO "admin"; ' ||
		 'GRANT ALL ON TABLE te.teprjtask TO xtrole; ' ||
		 'COMMENT ON TABLE te.teprjtask IS ''t/e information for tasks'';  ';

		EXECUTE _statement;

  END IF;
  
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteprjtask();
DROP FUNCTION createteprjtask();