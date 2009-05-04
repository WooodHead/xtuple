BEGIN;

-- Drop columns in tax table

ALTER TABLE tax DROP COLUMN tax_ratea;
ALTER TABLE tax DROP COLUMN tax_freight;
ALTER TABLE tax DROP COLUMN tax_cumulative;
ALTER TABLE tax DROP COLUMN tax_rateb;
ALTER TABLE tax DROP COLUMN tax_salesb_accnt_id;
ALTER TABLE tax DROP COLUMN tax_ratec;
ALTER TABLE tax DROP COLUMN tax_salesc_accnt_id;

-- Drop taxauth column in document tables

ALTER TABLE cmhead       DROP COLUMN cmhead_taxauth_id CASCADE;
ALTER TABLE cobmisc      DROP COLUMN cobmisc_taxauth_id CASCADE;
ALTER TABLE cohead       DROP COLUMN cohead_taxauth_id CASCADE;
ALTER TABLE custinfo     DROP COLUMN cust_taxauth_id CASCADE;
ALTER TABLE invchead     DROP COLUMN invchead_taxauth_id CASCADE;
ALTER TABLE itemtax      DROP COLUMN itemtax_taxauth_id CASCADE;
ALTER TABLE prospect     DROP COLUMN prospect_taxauth_id CASCADE;
ALTER TABLE quhead       DROP COLUMN quhead_taxauth_id CASCADE;
ALTER TABLE rahead       DROP COLUMN rahead_taxauth_id CASCADE;
ALTER TABLE shiptoinfo   DROP COLUMN shipto_taxauth_id CASCADE;
ALTER TABLE tohead       DROP COLUMN tohead_taxauth_id CASCADE;
ALTER TABLE vendaddrinfo DROP COLUMN vendaddr_taxauth_id CASCADE;
ALTER TABLE vendinfo     DROP COLUMN vend_taxauth_id CASCADE;
ALTER TABLE vohead       DROP COLUMN vohead_taxauth_id CASCADE;
ALTER TABLE whsinfo      DROP COLUMN warehous_taxauth_id CASCADE;

COMMIT;