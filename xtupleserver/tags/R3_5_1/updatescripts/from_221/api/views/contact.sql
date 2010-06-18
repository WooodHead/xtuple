BEGIN;

  --Contact View

  DROP VIEW api.contact;
  CREATE OR REPLACE VIEW api.contact AS
 
  SELECT 
    cntct_id AS contact_number,
    cntct_honorific AS honorific,
    cntct_first_name AS first,
    cntct_last_name AS last,
    cntct_initials AS initials,
    crmacct_number AS crm_account,
    cntct_active AS active,
    cntct_title AS job_title,
    cntct_phone AS voice,
    cntct_phone2 AS alternate,
    cntct_fax AS fax,
    cntct_email AS email,
    cntct_webaddr AS web,
    addr_line1 AS address1,
    addr_line2 AS address2,
    addr_line3 AS address3,
    addr_city AS city,
    addr_state AS state,
    addr_postalcode AS postal_code,
    addr_country AS country,
    ''::TEXT AS address_change,
    cntct_notes AS notes       
  FROM
    cntct 
      LEFT OUTER JOIN addr ON (cntct_addr_id=addr_id)
      LEFT OUTER JOIN crmacct ON (cntct_crmacct_id=crmacct_id);

GRANT ALL ON TABLE api.contact TO openmfg;
COMMENT ON VIEW api.contact IS '
This view can be used as an interface to import Contact data directly  
into the system.  Required fields will be checked and defaults will 
be populated if not specified.  The contact_number field is really
a reference the contact id field.  In future releases this will likely be 
turned into a separate and dedicated data field';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.contact DO INSTEAD

SELECT saveCntct(
          NEW.contact_number,
          getCrmAcctid(NEW.crm_account),
          saveAddr(
            NULL,
            NEW.address1,
            NEW.address2,
            NEW.address3,
            NEW.city,
            NEW.state,
            NEW.postal_code,
            NEW.country,
            NEW.address_change),
          NEW.first,
          NEW.last,
          NEW.honorific,
          NEW.initials,
          COALESCE(NEW.active,TRUE),
          NEW.voice,
          NEW.alternate,
          NEW.fax,
          NEW.email,
          NEW.web,
          NEW.notes,
          NEW.job_title
          );

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.contact DO INSTEAD

SELECT saveCntct(
          NEW.contact_number,
          getCrmAcctid(NEW.crm_account),
          saveAddr(
            NULL,
            NEW.address1,
            NEW.address2,
            NEW.address3,
            NEW.city,
            NEW.state,
            NEW.postal_code,
            NEW.country,
            NEW.address_change),
          NEW.first,
          NEW.last,
          NEW.honorific,
          NEW.initials,
          NEW.active,
          NEW.voice,
          NEW.alternate,
          NEW.fax,
          NEW.email,
          NEW.web,
          NEW.notes,
          NEW.job_title
          );

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.contact DO INSTEAD

SELECT deleteContact(OLD.contact_number);

COMMIT;
