CREATE TABLE saletype
(
  saletype_id SERIAL PRIMARY KEY,
  saletype_code TEXT NOT NULL,
  saletype_descr TEXT,
  saletype_active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO saletype (saletype_code, saletype_descr) VALUES ('CUST', 'Customer');
INSERT INTO saletype (saletype_code, saletype_descr) VALUES ('INT', 'Internet');
INSERT INTO saletype (saletype_code, saletype_descr) VALUES ('REP', 'Sales Rep');

COMMENT ON COLUMN saletype.saletype_id IS 'Sequence identifier for sale type.';
COMMENT ON COLUMN saletype.saletype_code IS 'User defined identifier for sale type.';
COMMENT ON COLUMN saletype.saletype_descr IS 'Description for sale type.';
COMMENT ON COLUMN saletype.saletype_active IS 'Boolean to deactivate a sale type.';

GRANT ALL ON TABLE saletype TO xtrole;
GRANT ALL ON SEQUENCE saletype_saletype_id_seq TO xtrole;
COMMENT ON TABLE saletype IS 'Type or Origination of Sale.';
