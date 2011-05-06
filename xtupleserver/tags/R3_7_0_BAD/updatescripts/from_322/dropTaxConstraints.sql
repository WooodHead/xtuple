BEGIN;

ALTER TABLE cmhead DROP CONSTRAINT cmhead_cmhead_adjtax_id_fkey;
ALTER TABLE cmhead DROP CONSTRAINT cmhead_cmhead_freighttax_id_fkey;
ALTER TABLE cobmisc DROP CONSTRAINT cobmisc_cobmisc_adjtax_id_fkey;
ALTER TABLE cobmisc DROP CONSTRAINT cobmisc_cobmisc_freighttax_id_fkey;
ALTER TABLE coitem DROP CONSTRAINT coitem_coitem_tax_id_fkey;
ALTER TABLE invchead DROP CONSTRAINT invchead_invchead_adjtax_id_fkey;
ALTER TABLE invchead DROP CONSTRAINT invchead_invchead_freighttax_id_fkey;
ALTER TABLE quitem DROP CONSTRAINT quitem_quitem_tax_id_fkey;
ALTER TABLE taxsel DROP CONSTRAINT taxsel_taxsel_tax_id_fkey;
ALTER TABLE vohead DROP CONSTRAINT vohead_vohead_adjtax_id_fkey;
ALTER TABLE vohead DROP CONSTRAINT vohead_vohead_freighttax_id_fkey;

COMMIT;