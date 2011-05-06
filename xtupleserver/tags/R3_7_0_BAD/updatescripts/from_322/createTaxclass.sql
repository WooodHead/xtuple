CREATE TABLE taxclass
(
  taxclass_id serial PRIMARY KEY,
  taxclass_code text,
  taxclass_descrip text,
  taxclass_sequence integer
);
GRANT ALL ON TABLE taxclass TO xtrole;
GRANT ALL ON SEQUENCE taxclass_taxclass_id_seq TO xtrole;
COMMENT ON TABLE taxclass IS 'Tax class information';
COMMENT ON COLUMN taxclass.taxclass_id IS 'Primary key';
COMMENT ON COLUMN taxclass.taxclass_code IS 'Code';
COMMENT ON COLUMN taxclass.taxclass_descrip IS 'Description';
COMMENT ON COLUMN taxclass.taxclass_sequence IS 'Group sequence';