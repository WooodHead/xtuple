CREATE OR REPLACE VIEW api.physinvcount
AS 
  SELECT
    warehous_code AS site,
    item_number AS item_number,
    invcnt_tagnumber AS tag_number,
    cntslip_qty AS quantity,
    formatLocationName(cntslip_location_id) AS location,
    cntslip_lotserial AS lotserial,
    cntslip_comments AS comment
  FROM invcnt JOIN itemsite ON (itemsite_id=invcnt_itemsite_id)
              JOIN whsinfo ON (warehous_id=itemsite_warehous_id)
              JOIN item ON (item_id=itemsite_item_id)
              LEFT OUTER JOIN cntslip ON (cntslip_cnttag_id=invcnt_id);

GRANT ALL ON TABLE api.physinvcount TO xtrole;
COMMENT ON VIEW api.physinvcount IS 'Physical Inventory Count Tag and Slip';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.physinvcount DO INSTEAD  SELECT api.insertphysinvcount(new.*) AS insertphysinvcount;

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.physinvcount DO INSTEAD

  NOTHING;
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.physinvcount DO INSTEAD

  NOTHING;
