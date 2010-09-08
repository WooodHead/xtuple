CREATE FUNCTION createteitem() RETURNS INTEGER AS $$
BEGIN

  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teitem'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    -- te.teitem table exists
    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='teitem')
                  AND attname='teitem_status')) THEN

      -- teitem_status column exists
      -- teitem_status replaced by teitem_billable_status and teitem_payable_status
      ALTER TABLE te.teitem ADD teitem_billable_status character(1);
      ALTER TABLE te.teitem ADD teitem_invchead_id integer;
      ALTER TABLE te.teitem ADD teitem_payable_status character(1);
      COMMENT ON COLUMN te.teitem.teitem_billable_status IS 'Status for Invoicing.  A is Approved, P is Pending, C is Complete.';
      COMMENT ON COLUMN te.teitem.teitem_payable_status IS 'Status of Payment.  A is Approved, P is Pending, C is Complete.';

      UPDATE te.teitem set teitem_billable_status = teitem_status, teitem_payable_status = teitem_status;

      ALTER TABLE te.teitem DROP teitem_status;
    END IF;

    IF (EXISTS(SELECT relname
                 FROM pg_class, pg_namespace
                WHERE relname='teitem_teitem_id_seq1'
                  AND relnamespace=pg_namespace.oid
                  AND nspname='te')) THEN
      -- te.teitem_teitem_id_seq1 sequence exists
      -- rename to te.teitem_teitem_id_seq
      DROP SEQUENCE te.teitem_teitem_id_seq;
      ALTER SEQUENCE te.teitem_teitem_id_seq1 RENAME TO teitem_teitem_id_seq;
      GRANT ALL ON SEQUENCE te.teitem_teitem_id_seq TO xtrole;
    END IF;

  ELSE  
    CREATE TABLE te.teitem
     ( teitem_id SERIAL PRIMARY KEY,
       teitem_tehead_id integer,
       teitem_linenumber integer NOT NULL,
       teitem_type character(1) NOT NULL,
       teitem_workdate date,
       teitem_emp_id integer NOT NULL,
       teitem_cust_id integer,
       teitem_vend_id integer,
       teitem_po text,
       teitem_item_id integer NOT NULL,
       teitem_qty numeric NOT NULL,
       teitem_rate numeric NOT NULL,
       teitem_total numeric NOT NULL,
       teitem_prj_id numeric,
       teitem_prjtask_id numeric,
       teitem_lastupdated timestamp without time zone NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
       teitem_username text DEFAULT "current_user"(),
       teitem_billable boolean,
       teitem_prepaid boolean,
       teitem_billable_status character(1),
       teitem_invchead_id integer,
       teitem_payable_status character(1),
       teitem_uom_id integer,
       teitem_notes text );
       ALTER TABLE te.teitem OWNER TO "admin";
       GRANT ALL ON TABLE te.teitem TO "admin";
       GRANT ALL ON TABLE te.teitem TO xtrole;
       GRANT ALL ON SEQUENCE te.teitem_teitem_id_seq TO xtrole;
       COMMENT ON TABLE te.teitem IS 'time/expense detail';
       COMMENT ON COLUMN te.teitem.teitem_type IS 'T or E';
       COMMENT ON COLUMN te.teitem.teitem_vend_id IS 'future use - for payment of vendor for expenses';
       COMMENT ON COLUMN te.teitem.teitem_prepaid IS 'Used for expenses only.  CC paid expenses would be prepaid.';
       COMMENT ON COLUMN te.teitem.teitem_billable_status IS 'Status for invoicing. A is approved, P is Pending, C is complete.';
       COMMENT ON COLUMN te.teitem.teitem_payable_status IS 'Status for Vouchering. A is approved, P is Pending, C is complete.';

  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteitem();
DROP FUNCTION createteitem();



