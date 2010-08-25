



CREATE FUNCTION createtehead() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='tehead'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here
  ELSE  
    _statement = 'CREATE TABLE te.tehead ' ||
			'(  tehead_id serial NOT NULL, ' ||
			'tehead_site text, ' ||
			'tehead_number text, ' ||
			'tehead_weekending date, ' ||
			'tehead_lastupdated timestamp without time zone NOT NULL DEFAULT (''now''::text)::timestamp(6) with time zone, ' ||
			'tehead_username text DEFAULT "current_user"(), ' ||
			'tehead_status character(1), ' ||
			'tehead_notes text, ' ||
			'  CONSTRAINT tehead_pkey PRIMARY KEY (tehead_id) ) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.tehead OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.tehead TO "admin"; ' ||
			'GRANT ALL ON TABLE te.tehead TO xtrole; ' ||
			'COMMENT ON TABLE te.tehead IS ''time/expense header''; ';

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createtehead();
DROP FUNCTION createtehead();


