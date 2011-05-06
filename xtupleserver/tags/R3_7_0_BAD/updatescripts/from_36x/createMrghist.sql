CREATE TABLE mrghist (
  mrghist_cntct_id integer REFERENCES cntct (cntct_id) ON DELETE CASCADE,
  mrghist_table text,
  mrghist_pkey_col text,
  mrghist_pkey_id integer,
  mrghist_cntct_col text
);
ALTER TABLE mrghist ADD PRIMARY KEY (mrghist_cntct_id, mrghist_table, mrghist_pkey_col, mrghist_pkey_id, mrghist_cntct_col);

GRANT ALL ON TABLE mrghist TO xtrole;