CREATE TABLE contrct
(
  contrct_id SERIAL PRIMARY KEY,
  contrct_number TEXT NOT NULL,
  contrct_vend_id INTEGER NOT NULL REFERENCES vendinfo (vend_id),
  contrct_descrip TEXT,
  contrct_effective DATE NOT NULL,
  contrct_expires DATE NOT NULL,
  contrct_note TEXT
);

GRANT ALL ON TABLE contrct TO xtrole;
GRANT ALL ON SEQUENCE contrct_contrct_id_seq TO xtrole;
COMMENT ON TABLE contrct IS 'Grouping of Item Sources for a Vendor with common effective and expiration dates.';

CREATE UNIQUE INDEX contrct_master_idx
  ON contrct
  USING btree
  (contrct_number, contrct_vend_id);


