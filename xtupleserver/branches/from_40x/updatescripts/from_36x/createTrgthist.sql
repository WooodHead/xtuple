CREATE TABLE trgthist
(
  trgthist_src_cntct_id integer NOT NULL REFERENCES cntctmrgd (cntctmrgd_cntct_id) ON DELETE CASCADE,
  trgthist_trgt_cntct_id integer NOT NULL REFERENCES cntct (cntct_id) ON DELETE CASCADE,
  trgthist_col text NOT NULL,
  trgthist_value text NOT NULL
);
ALTER TABLE trgthist OWNER TO "admin";
GRANT ALL ON TABLE trgthist TO "admin";
GRANT ALL ON TABLE trgthist TO xtrole;