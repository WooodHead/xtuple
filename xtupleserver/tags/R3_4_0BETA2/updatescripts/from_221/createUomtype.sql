
CREATE TABLE uomtype (
  uomtype_id SERIAL PRIMARY KEY,
  uomtype_name TEXT UNIQUE NOT NULL,
  uomtype_descrip TEXT,
  uomtype_multiple BOOLEAN NOT NULL DEFAULT FALSE
);

REVOKE ALL ON TABLE uomtype FROM PUBLIC;
GRANT  ALL ON TABLE uomtype TO   mfgadmin;
GRANT  ALL ON TABLE uomtype TO   GROUP openmfg;

REVOKE ALL ON TABLE uomtype_uomtype_id_seq FROM PUBLIC;
GRANT  ALL ON TABLE uomtype_uomtype_id_seq TO   mfgadmin;
GRANT  ALL ON TABLE uomtype_uomtype_id_seq TO   GROUP openmfg;

COMMENT ON TABLE uomtype IS 'UOM Type values.';


INSERT INTO uomtype (uomtype_name, uomtype_descrip, uomtype_multiple) VALUES ('Selling', 'Selling a.k.a. Pricing and Shipping UOMs.', TRUE);
INSERT INTO uomtype (uomtype_name, uomtype_descrip, uomtype_multiple) VALUES ('Capacity', 'Capacity UOMs.', FALSE);
INSERT INTO uomtype (uomtype_name, uomtype_descrip, uomtype_multiple) VALUES ('AltCapacity', 'Alternate Capacity UOMs.', FALSE);
INSERT INTO uomtype (uomtype_name, uomtype_descrip, uomtype_multiple) VALUES ('MaterialIssue', 'Material Issuing UOMs.', FALSE);

