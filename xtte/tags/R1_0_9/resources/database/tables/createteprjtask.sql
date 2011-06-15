
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

    _statement = 'drop table te.teprjtask;';
    EXECUTE _statement;

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