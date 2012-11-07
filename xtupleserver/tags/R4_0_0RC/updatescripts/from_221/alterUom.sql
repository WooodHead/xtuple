
UPDATE uom SET uom_name = UPPER(uom_name);
ALTER TABLE uom ADD CONSTRAINT uom_uom_name_key UNIQUE (uom_name);

