-- Table: te.teitem

-- DROP TABLE te.teitem;



CREATE FUNCTION createteitem() RETURNS INTEGER AS $$
DECLARE
  _statement TEXT := '';
  _version   TEXT := '';
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teitem'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN
    -- do nothing (this ensures that the table is created as needed.  Revisions should go here
  ELSE  
    _statement = 'CREATE TABLE te.teitem ' ||
			'( teitem_id serial NOT NULL,  ' ||
			'teitem_tehead_id integer, ' ||
			'teitem_linenumber integer NOT NULL, ' ||
			'teitem_type character(1) NOT NULL, ' ||
			'teitem_workdate date, ' ||
			'teitem_emp_id integer NOT NULL, ' ||
			'teitem_cust_id integer, ' ||
			'teitem_vend_id integer, ' ||
			'teitem_po text, ' ||
			'teitem_item_id integer NOT NULL, ' ||
			'teitem_qty numeric NOT NULL, ' ||
			'teitem_rate numeric NOT NULL, ' ||
			'teitem_total numeric NOT NULL, ' ||
			'teitem_prj_id numeric, ' ||
			'teitem_prjtask_id numeric, ' ||
			'teitem_lastupdated timestamp without time zone NOT NULL DEFAULT (''now''::text)::timestamp(6) with time zone, ' ||
			'teitem_username text DEFAULT "current_user"(), ' ||
			'teitem_billable boolean, ' ||
			'teitem_prepaid boolean, ' ||
			'teitem_status character(1), ' ||
			'teitem_uom_id integer, ' ||
			'teitem_notes text, ' ||
			'CONSTRAINT teitem_pkey PRIMARY KEY (teitem_id) ) ' ||
			'WITH (OIDS=FALSE); ' ||
			'ALTER TABLE te.teitem OWNER TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teitem TO "admin"; ' ||
			'GRANT ALL ON TABLE te.teitem TO xtrole; ' ||
			'COMMENT ON TABLE te.teitem IS ''time/expense detail''; ' ||
			'COMMENT ON COLUMN te.teitem.teitem_type IS ''T or E''; ' ||
			'COMMENT ON COLUMN te.teitem.teitem_vend_id IS ''future use - for payment of vendor for expenses''; ' ||
			'COMMENT ON COLUMN te.teitem.teitem_prepaid IS ''Used for expenses only - CC paid expenses would be prepaid'';' ;

  END IF;

  EXECUTE _statement;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteitem();
DROP FUNCTION createteitem();



