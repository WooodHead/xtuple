ALTER TABLE taxreg ADD COLUMN taxreg_taxzone_id integer REFERENCES taxzone (taxzone_id);
ALTER TABLE taxreg ADD COLUMN taxreg_effective date DEFAULT startoftime();
ALTER TABLE taxreg ADD COLUMN taxreg_expires date DEFAULT endoftime();
ALTER TABLE taxreg ADD COLUMN taxreg_notes text DEFAULT '';
