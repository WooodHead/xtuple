CREATE TABLE taxzone
(
  taxzone_id serial,
  taxzone_code text,
  taxzone_descrip text,
  CONSTRAINT taxzone_pkey PRIMARY KEY (taxzone_id)
);
GRANT ALL ON TABLE taxzone TO xtrole;
GRANT ALL ON SEQUENCE taxzone_taxzone_id_seq TO xtrole;
COMMENT ON TABLE taxzone IS 'Tax zone information';
COMMENT ON COLUMN taxzone.taxzone_id IS 'Primary key';
COMMENT ON COLUMN taxzone.taxzone_code IS 'Code';
COMMENT ON COLUMN taxzone.taxzone_descrip IS 'Description';

-- Insert the existing records of taxauth into taxzone

INSERT INTO taxzone(taxzone_id, taxzone_code, taxzone_descrip)
SELECT taxauth_id, taxauth_code, taxauth_name 
FROM taxauth;

