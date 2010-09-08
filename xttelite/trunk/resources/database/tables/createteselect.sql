CREATE FUNCTION createteselect() RETURNS INTEGER AS $$
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teselect'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    -- te.teselect table exists
    IF (EXISTS(SELECT relname
                 FROM pg_class, pg_namespace
                WHERE relname='teselect_teselect_id_seq1'
                  AND relnamespace=pg_namespace.oid
                  AND nspname='te')) THEN
      -- te.teselect_teselect_id_seq1 sequence exists
      -- rename to te.teselect_teselect_id_seq
      DROP SEQUENCE te.teselect_teselect_id_seq;
      ALTER SEQUENCE te.teselect_teselect_id_seq1 RENAME TO teselect_teselect_id_seq;
      GRANT ALL ON SEQUENCE te.teselect_teselect_id_seq TO xtrole;
    END IF;

  ELSE  
    CREATE TABLE te.teselect
     ( teselect_id SERIAL PRIMARY KEY,
       teselect_cons_id integer NOT NULL,
       teselect_tehead_id integer NOT NULL );
       ALTER TABLE te.teselect OWNER TO "admin";
       GRANT ALL ON TABLE te.teselect TO "admin";
       GRANT ALL ON TABLE te.teselect TO xtrole;
       GRANT ALL ON SEQUENCE te.teselect_teselect_id_seq TO xtrole;

  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteselect();
DROP FUNCTION createteselect();


