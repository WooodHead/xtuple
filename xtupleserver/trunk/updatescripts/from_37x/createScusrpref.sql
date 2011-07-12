CREATE TABLE scusrpref
(
  scusrpref_id serial PRIMARY KEY,
  scusrpref_name text,
  scusrpref_value text,
  scusrpref_username text
);

GRANT ALL ON scusrpref TO xtrole;
GRANT ALL ON scusrpref_scusrpref_id_seq TO xtrole;

COMMENT ON TABLE xtpos.rtlsite IS 'User preferences for SproutCore based application'
