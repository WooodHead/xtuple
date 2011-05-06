CREATE TABLE cntctmrgd
(
  cntctmrgd_cntct_id INTEGER PRIMARY KEY REFERENCES cntct (cntct_id) ON DELETE CASCADE,
  cntctmrgd_error BOOLEAN DEFAULT false
);

GRANT ALL ON TABLE cntctmrgd TO xtrole;

