ALTER TABLE tax ADD COLUMN tax_taxclass_id integer REFERENCES taxclass (taxclass_id);
ALTER TABLE tax ADD COLUMN tax_taxauth_id integer REFERENCES taxauth (taxauth_id);
ALTER TABLE tax ADD COLUMN tax_basis_tax_id integer REFERENCES tax (tax_id) ON DELETE CASCADE;
ALTER TABLE tax ADD FOREIGN KEY (tax_sales_accnt_id) REFERENCES accnt (accnt_id)

-- When the upgrade process is complete, the following fields should be dropped from tax:
--ALTER TABLE tax DROP COLUMN tax_ratea;
--ALTER TABLE tax DROP COLUMN tax_freight;
--ALTER TABLE tax DROP COLUMN tax_cumulative;
--ALTER TABLE tax DROP COLUMN tax_rateb;
--ALTER TABLE tax DROP COLUMN tax_salesb_accnt_id;
--ALTER TABLE tax DROP COLUMN tax_ratec;
--ALTER TABLE tax DROP COLUMN tax_salesc_accnt_id;