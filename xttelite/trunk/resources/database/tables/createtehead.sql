CREATE FUNCTION createtehead() RETURNS INTEGER AS $$
BEGIN

  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='tehead'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    -- te.tehead table exists
    IF (EXISTS(SELECT attname
                 FROM pg_attribute
                WHERE attrelid=(SELECT oid FROM pg_class WHERE relname='tehead')
                  AND attname='tehead_status')) THEN

      -- tehead_status column exists
      -- tehead_status replaced by tehead_billable_status and tehead_payable_status
      ALTER TABLE te.tehead ADD tehead_billable_status character(1);
      ALTER TABLE te.tehead ADD tehead_payable_status character(1);
      COMMENT ON COLUMN te.tehead.tehead_billable_status IS 'Status for Invoicing.  A is Approved, P is Pending, C is Complete.';
      COMMENT ON COLUMN te.tehead.tehead_payable_status IS 'Status of Payment.  A is Approved, P is Pending, C is Complete.';

      UPDATE te.tehead set tehead_billable_status = tehead_status, tehead_payable_status = tehead_status;

      ALTER TABLE te.tehead DROP tehead_status;
    END IF;

    IF (EXISTS(SELECT relname
                 FROM pg_class, pg_namespace
                WHERE relname='tehead_tehead_id_seq1'
                  AND relnamespace=pg_namespace.oid
                  AND nspname='te')) THEN
      -- te.tehead_tehead_id_seq1 sequence exists
      -- rename to te.tehead_tehead_id_seq
      DROP SEQUENCE te.tehead_tehead_id_seq;
      ALTER SEQUENCE te.tehead_tehead_id_seq1 RENAME TO tehead_tehead_id_seq;
      GRANT ALL ON SEQUENCE te.tehead_tehead_id_seq TO xtrole;
    END IF;

  ELSE  
    CREATE TABLE te.tehead
     ( tehead_id SERIAL PRIMARY KEY,
       tehead_site text,
       tehead_number text,
       tehead_weekending date,
       tehead_lastupdated timestamp without time zone NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
       tehead_username text DEFAULT "current_user"(),
       tehead_billable_status character(1),
       tehead_payable_status character(1),
       tehead_notes text );
    ALTER TABLE te.tehead OWNER TO "admin";
    GRANT ALL ON TABLE te.tehead TO "admin";
    GRANT ALL ON TABLE te.tehead TO xtrole;
    GRANT ALL ON SEQUENCE te.tehead_tehead_id_seq TO xtrole;
    COMMENT ON TABLE te.tehead IS 'time/expense header';
    COMMENT ON COLUMN te.tehead.tehead_billable_status IS 'Status for Invoicing.  A is Approved, P is Pending, C is Complete.'; 
    COMMENT ON COLUMN te.tehead.tehead_payable_status IS 'Status of Payment.  A is Approved, P is Pending, C is Complete.';

  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createtehead();
DROP FUNCTION createtehead();


