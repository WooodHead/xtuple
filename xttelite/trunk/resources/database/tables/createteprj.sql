CREATE FUNCTION createteprj() RETURNS INTEGER AS $$
BEGIN
  IF (EXISTS(SELECT relname
               FROM pg_class, pg_namespace
              WHERE relname='teprj'
                AND relnamespace=pg_namespace.oid
                AND nspname='te')) THEN

    -- te.teprj table exists
    IF (EXISTS(SELECT relname
                 FROM pg_class, pg_namespace
                WHERE relname='teprj_teprj_id_seq1'
                  AND relnamespace=pg_namespace.oid
                  AND nspname='te')) THEN
      -- te.teprj_teprj_id_seq1 sequence exists
      -- rename to te.teprj_teprj_id_seq
      DROP SEQUENCE te.teprj_teprj_id_seq;
      ALTER SEQUENCE te.teprj_teprj_id_seq1 RENAME TO teprj_teprj_id_seq;
      GRANT ALL ON SEQUENCE te.teprj_teprj_id_seq TO xtrole;
    END IF;

  ELSE  
    CREATE TABLE te.teprj
     ( teprj_id SERIAL PRIMARY KEY,
       teprj_prj_id integer,
       teprj_cust_id integer,
       teprj_rate numeric );
       ALTER TABLE te.teprj OWNER TO "admin";
       GRANT ALL ON TABLE te.teprj TO "admin";
       GRANT ALL ON TABLE te.teprj TO xtrole;
       GRANT ALL ON SEQUENCE te.teprj_teprj_id_seq TO xtrole;
       COMMENT ON TABLE te.teprj IS 't/e information for projects';

  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT createteprj();
DROP FUNCTION createteprj();


