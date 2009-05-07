-- Drop stuff already installed

-- drop table taxzone cascade;
-- drop table taxclass cascade;
-- drop table taxrate cascade;
-- drop table taxass cascade;
-- drop table taxhist cascade;
-- drop table obsolete_tax cascade;
-- alter table taxreg drop column taxreg_taxzone_id;
-- alter table taxreg drop column taxreg_effective;
-- alter table taxreg drop column taxreg_expires;
-- alter table taxreg drop column taxreg_notes;
-- alter table tax drop column tax_taxclass_id;
-- alter table tax drop column tax_taxauth_id;
-- alter table tax drop column tax_basis_tax_id;

-- Create backups

\i updatescripts/from_322/createObsolete_tax.sql
\i updatescripts/from_322/insertObsolete_tax.sql

-- Table updates

\i updatescripts/from_322/createTaxzone.sql
\i updatescripts/from_322/alterTaxzone_taxzone_id_seq.sql
\i updatescripts/from_322/alterTaxreg.sql
\i updatescripts/from_322/createTaxclass.sql
\i updatescripts/from_322/alterTax.sql
\i updatescripts/from_322/createTaxrate.sql
\i updatescripts/from_322/createTaxass.sql
\i updatescripts/from_322/createTaxhist.sql

\i updatescripts/from_322/addTaxzone.sql
\i updatescripts/from_322/addTaxtype.sql

-- Function changes required by conversions

\i dbscripts/functions/getitemtaxtype.sql

-- Data conversions

\i updatescripts/from_322/convertTaxData.sql

-- Drop legacy tables and columns

\i updatescripts/from_322/dropTaxTables.sql
\i updatescripts/from_322/dropTaxColumns.sql

-- Delete old tax codes

\i updatescripts/from_322/deleteOldTaxCodes.sql

