CREATE TABLE taxass
(
  taxass_id serial PRIMARY KEY,
  taxass_taxzone_id integer REFERENCES taxzone (taxzone_id),
  taxass_taxtype_id integer REFERENCES taxtype (taxtype_id),
  taxass_tax_id integer NOT NULL REFERENCES tax (tax_id)
);
ALTER TABLE taxass ADD UNIQUE (taxass_taxzone_id, taxass_taxtype_id, taxass_tax_id);
GRANT ALL ON TABLE taxass TO xtrole;
GRANT ALL ON SEQUENCE taxass_taxass_id_seq TO xtrole;
COMMENT ON TABLE taxass IS 'The tax assignment table associates different tax zones and tax types to a given set of tax codes.';
COMMENT ON COLUMN taxass.taxass_taxzone_id IS 'The id of the tax zone. If NULL any tax zone will apply.';
COMMENT ON COLUMN taxass.taxass_taxtype_id IS 'The id of the tax type. If NULL any tax type will apply.';
COMMENT ON COLUMN taxass.taxass_tax_id IS 'The id of the tax code.';