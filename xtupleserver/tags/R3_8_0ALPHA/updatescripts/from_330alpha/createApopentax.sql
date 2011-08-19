CREATE TABLE apopentax
(
    PRIMARY KEY (taxhist_id),
    FOREIGN KEY (taxhist_parent_id) REFERENCES apopen (apopen_id) ON DELETE CASCADE,
    FOREIGN KEY (taxhist_taxtype_id) REFERENCES taxtype (taxtype_id),
    FOREIGN KEY (taxhist_tax_id) REFERENCES tax (tax_id),
    FOREIGN KEY (taxhist_basis_tax_id) REFERENCES tax (tax_id)
)
INHERITS (taxhist);
GRANT ALL ON TABLE apopentax TO xtrole;
