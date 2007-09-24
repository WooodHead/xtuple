
CREATE TABLE uomtype (
  uomtype_id SERIAL PRIMARY KEY,
  uomtype_name TEXT UNIQUE NOT NULL,
  uomtype_descrip TEXT
);

REVOKE ALL ON TABLE uomtype FROM PUBLIC;
GRANT  ALL ON TABLE uomtype TO   mfgadmin;
GRANT  ALL ON TABLE uomtype TO   GROUP openmfg;

REVOKE ALL ON TABLE uomtype_uomtype_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE uomtype_uomtype_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE uomtype_uomtype_id_seq TO   GROUP openmfg;

COMMENT ON TABLE uomtype IS 'UOM Type values.';

