CREATE OR REPLACE FUNCTION upgradeResetDocAssIdSeq() RETURNS INTEGER AS $$
BEGIN
  BEGIN
    SELECT SETVAL('docass_docass_id_seq',
                  GREATEST(NEXTVAL('docass_docass_id_seq'),
                           NEXTVAL('imageass_imageass_id_seq')));
  EXCEPTION WHEN undefined_table THEN
    RETURN 0;
  END;

  RETURN 1;
END;
$$ LANGUAGE 'plpgsql';
