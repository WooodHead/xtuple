BEGIN;

  --Prospect View

  --DROP VIEW api.prospect;
  CREATE OR REPLACE VIEW api.prospect AS
 
  SELECT 
    prospect_number::varchar(100) AS prospect_number,
    prospect_name AS prospect_name,
    prospect_active AS active,
    salesrep_number AS sales_rep,
    taxauth_code AS default_tax_authority,
    prospect_comments AS notes,

    cntct_number AS contact_number,
    cntct_honorific AS contact_honorific,
    cntct_first_name AS contact_first,
    cntct_last_name AS contact_last,
    cntct_title AS contact_job_title,
    cntct_phone AS contact_voice,
    cntct_phone2 AS contact_alternate,
    cntct_fax AS contact_fax,
    cntct_email AS contact_email,
    cntct_webaddr AS contact_web,
    (''::TEXT) AS contact_change,
    addr_number AS contact_address_number,
    addr_line1 AS contact_address1,
    addr_line2 AS contact_address2,
    addr_line3 AS contact_address3,
    addr_city AS contact_city,
    addr_state AS contact_state,
    addr_postalcode AS contact_postalcode,
    addr_country AS contact_country,
    (''::TEXT) AS contact_address_change
  FROM
    prospect
      LEFT OUTER JOIN cntct ON (prospect_cntct_id=cntct_id)
      LEFT OUTER JOIN addr ON (cntct_addr_id=addr_id)
      LEFT OUTER JOIN taxauth ON (prospect_taxauth_id=taxauth_id)
      LEFT OUTER JOIN salesrep ON (prospect_salesrep_id=salesrep_id);

GRANT ALL ON TABLE api.prospect TO openmfg;
COMMENT ON VIEW api.prospect IS 'Prospect';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.prospect DO INSTEAD

INSERT INTO prospect
	(
        prospect_number,
        prospect_name,
        prospect_active,
        prospect_cntct_id,
        prospect_taxauth_id,
        prospect_salesrep_id,
  	prospect_comments)
        VALUES (
        UPPER(checkUniqueProspectNumber(NEW.prospect_number,NULL)),
        COALESCE(NEW.prospect_name,''),
	COALESCE(NEW.active,true),
        saveCntct(
          getCntctId(NEW.contact_number),
          NEW.contact_number,
          saveAddr(
            getAddrId(NEW.contact_address_number),
            NEW.contact_address_number,
            NEW.contact_address1,
            NEW.contact_address2,
            NEW.contact_address3,
            NEW.contact_city,
            NEW.contact_state,
            NEW.contact_postalcode,
            NEW.contact_country,
            NEW.contact_address_change),
          NEW.contact_first,
          NEW.contact_last,
          NEW.contact_honorific,
          NEW.contact_voice,
          NEW.contact_alternate,
          NEW.contact_fax,
          NEW.contact_email,
          NEW.contact_web,
          NEW.contact_job_title,
          NEW.contact_change
          ),
        getTaxAuthId(NEW.default_tax_authority),
        getSalesRepId(NEW.sales_rep),
        COALESCE(NEW.notes,''));

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.prospect DO INSTEAD

UPDATE prospect SET
        prospect_number=checkUniqueProspectNumber(NEW.prospect_number, OLD.prospect_number),
        prospect_name=NEW.prospect_name,
	prospect_active=NEW.active,
        prospect_cntct_id=saveCntct(
          getCntctId(NEW.contact_number),
          NEW.contact_number,
          saveAddr(
            getAddrId(NEW.contact_address_number),
            NEW.contact_address_number,
            NEW.contact_address1,
            NEW.contact_address2,
            NEW.contact_address3,
            NEW.contact_city,
            NEW.contact_state,
            NEW.contact_postalcode,
            NEW.contact_country,
            NEW.contact_address_change),
          NEW.contact_first,
          NEW.contact_last,
          NEW.contact_honorific,
          NEW.contact_voice,
          NEW.contact_alternate,
          NEW.contact_fax,
          NEW.contact_email,
          NEW.contact_web,
          NEW.contact_job_title,
          NEW.contact_change
          ),
        prospect_taxauth_id=getTaxAuthId(NEW.default_tax_authority),
        prospect_salesrep_id=getSalesRepId(NEW.sales_rep),
  	prospect_comments=NEW.notes

        WHERE prospect_id=getProspectId(OLD.prospect_number);

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.prospect DO INSTEAD

SELECT deleteProspect(getProspectId(OLD.Prospect_number));

COMMIT;
