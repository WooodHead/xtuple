CREATE TABLE taxhist
(
  taxhist_id serial PRIMARY KEY,
  taxhist_parent_id integer NOT NULL,
  taxhist_taxtype_id integer NOT NULL REFERENCES taxtype (taxtype_id),
  taxhist_tax_id integer NOT NULL REFERENCES tax (tax_id),
  taxhist_basis numeric (16,2) NOT NULL,
  taxhist_basis_tax_id integer,
  taxhist_sequence integer,
  taxhist_percent numeric (8,4) NOT NULL,
  taxhist_amount numeric (16,2) NOT NULL,
  taxhist_tax numeric (16,2) NOT NULL,
  taxhist_docdate date NOT NULL,
  taxhist_distdate date
);
GRANT ALL ON TABLE taxhist TO xtrole;
COMMENT ON TABLE taxhist IS 'A table type to record tax transaction history. Inherited by other tables that actually record history. As the parent, queries can be run against it that will join all child tables. ';
COMMENT ON COLUMN taxhist.taxhist_id IS 'Primary key';
COMMENT ON COLUMN taxhist.taxhist_parent_id IS 'Source parent id.';
COMMENT ON COLUMN taxhist.taxhist_taxtype_id IS 'Tax type id';
COMMENT ON COLUMN taxhist.taxhist_tax_id IS 'Tax code id.';
COMMENT ON COLUMN taxhist.taxhist_basis IS 'Base price amount on which the tax calculation is based.';
COMMENT ON COLUMN taxhist.taxhist_basis_tax_id IS 'Tax rate calculation basis.  If null, then the amount of the parent document, otherwise calculated on the result amount of the tax code id referenced.';
COMMENT ON COLUMN taxhist.taxhist_amount IS 'Flat tax amount.';
COMMENT ON COLUMN taxhist.taxhist_tax IS 'Calculated tax amount.';
COMMENT ON COLUMN taxhist.taxhist_docdate IS 'The date of the parent document.';
COMMENT ON COLUMN taxhist.taxhist_distdate IS 'The G/L distribution date of the parent document.';

GRANT ALL ON SEQUENCE taxhist_taxhist_id_seq TO xtrole;

CREATE TABLE asohisttax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES asohist (asohist_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE asohisttax TO xtrole;

CREATE TABLE cmheadtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES cmhead (cmhead_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE cmheadtax TO xtrole;

CREATE TABLE cmitemtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES cmitem (cmitem_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE cmitemtax TO xtrole;

CREATE TABLE cobilltax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES cobill (cobill_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE cobilltax TO xtrole;

CREATE TABLE cobmisctax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES cobmisc (cobmisc_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE cobmisctax TO xtrole;

CREATE TABLE cohisttax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES cohist (cohist_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE cohisttax TO xtrole;

CREATE TABLE invcheadtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES invchead (invchead_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE invcheadtax TO xtrole;

CREATE TABLE invcitemtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES invcitem (invcitem_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE invcitemtax TO xtrole;

CREATE TABLE toheadtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES tohead (tohead_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE toheadtax TO xtrole;

CREATE TABLE toitemtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES toitem (toitem_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE toitemtax TO xtrole;

CREATE TABLE voheadtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES vohead (vohead_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE voheadtax TO xtrole;

CREATE TABLE voitemtax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES voitem (voitem_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE voitemtax TO xtrole;

