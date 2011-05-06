CREATE TABLE cntctsel
(
  cntctsel_cntct_id INTEGER PRIMARY KEY REFERENCES cntct (cntct_id) ON DELETE CASCADE,
  cntctsel_target BOOLEAN,
  cntctsel_mrg_crmacct_id BOOLEAN DEFAULT false,
  cntctsel_mrg_addr_id BOOLEAN DEFAULT false,
  cntctsel_mrg_first_name BOOLEAN DEFAULT false,
  cntctsel_mrg_last_name BOOLEAN DEFAULT false,
  cntctsel_mrg_honorific BOOLEAN DEFAULT false,
  cntctsel_mrg_initials BOOLEAN DEFAULT false,
  cntctsel_mrg_phone BOOLEAN DEFAULT false,
  cntctsel_mrg_phone2 BOOLEAN DEFAULT false,
  cntctsel_mrg_fax BOOLEAN DEFAULT false,
  cntctsel_mrg_email BOOLEAN DEFAULT false,
  cntctsel_mrg_webaddr BOOLEAN DEFAULT false,
  cntctsel_mrg_notes BOOLEAN DEFAULT false,
  cntctsel_mrg_title BOOLEAN DEFAULT false,
  cntctsel_mrg_middle BOOLEAN DEFAULT false,
  cntctsel_mrg_suffix BOOLEAN DEFAULT false,
  cntctsel_mrg_owner_username BOOLEAN DEFAULT false
);

GRANT ALL ON TABLE cntctsel TO xtrole;

