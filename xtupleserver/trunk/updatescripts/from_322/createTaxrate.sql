CREATE TABLE taxrate
(
  taxrate_id serial PRIMARY KEY,
  taxrate_tax_id integer NOT NULL REFERENCES tax (tax_id),
  taxrate_percent numeric (8,4) NOT NULL,
  taxrate_curr_id integer REFERENCES curr_symbol (curr_id),
  taxrate_amount numeric (16,2) NOT NULL,
  taxrate_effective date,
  taxrate_expires date
);
GRANT ALL ON TABLE taxrate TO xtrole;
COMMENT ON TABLE taxrate IS 'Tax rates.';
COMMENT ON COLUMN taxrate.taxrate_id IS 'Primary key.';
COMMENT ON COLUMN taxrate.taxrate_tax_id IS 'The id of the parent tax code.';
COMMENT ON COLUMN taxrate.taxrate_percent IS 'Tax rate percentage.';
COMMENT ON COLUMN taxrate.taxrate_curr_id IS 'The currency id of the flat rate amount.';
COMMENT ON COLUMN taxrate.taxrate_amount IS 'Flat tax rate amount.';
COMMENT ON COLUMN taxrate.taxrate_effective IS 'The effective date of the tax rate.  NULL value means always.';
COMMENT ON COLUMN taxrate.taxrate_expires IS 'The expire date of the tax rate.  NULL value means never.';