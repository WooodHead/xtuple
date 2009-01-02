BEGIN;

  --Account View

  DROP VIEW api.account;
  CREATE OR REPLACE VIEW api.account AS
 
  SELECT 
    c.crmacct_number::varchar(100) AS account_number,
    p.crmacct_number AS parent_account,
    c.crmacct_name AS account_name,
    c.crmacct_active AS active,
    CASE WHEN (c.crmacct_type='O') THEN
      'Organization'
    ELSE 'Individual'
    END AS type,
    c.crmacct_cntct_id_1 AS primary_contact_number,
    pc.cntct_honorific AS primary_contact_honorific,
    pc.cntct_first_name AS primary_contact_first,
    pc.cntct_last_name AS primary_contact_last,
    pc.cntct_title AS primary_contact_job_title,
    pc.cntct_phone AS primary_contact_voice,
    pc.cntct_fax AS primary_contact_fax,
    pc.cntct_email AS primary_contact_email,
    (''::TEXT) AS primary_contact_address_change,
    m.addr_line1 AS primary_contact_address1,
    m.addr_line2 AS primary_contact_address2,
    m.addr_line3 AS primary_contact_address3,
    m.addr_city AS primary_contact_city,
    m.addr_state AS primary_contact_state,
    m.addr_postalcode AS primary_contact_postalcode,
    m.addr_country AS primary_contact_country,
    c.crmacct_cntct_id_2 AS secondary_contact_number,
    sc.cntct_honorific AS secondary_contact_honorific,
    sc.cntct_first_name AS secondary_contact_first,
    sc.cntct_last_name AS secondary_contact_last,
    sc.cntct_title AS secondary_contact_job_title,
    sc.cntct_phone AS secondary_contact_voice,
    sc.cntct_fax AS secondary_contact_fax,
    sc.cntct_email AS secondary_contact_email,
    sc.cntct_webaddr AS secondary_contact_web,
    (''::TEXT) AS secondary_contact_address_change,
    s.addr_line1 AS secondary_contact_address1,
    s.addr_line2 AS secondary_contact_address2,
    s.addr_line3 AS secondary_contact_address3,
    s.addr_city AS secondary_contact_city,
    s.addr_state AS secondary_contact_state,
    s.addr_postalcode AS secondary_contact_postalcode,
    s.addr_country AS secondary_contact_country,
    c.crmacct_notes AS notes
  FROM
    crmacct c
      LEFT OUTER JOIN crmacct p ON (c.crmacct_id=p.crmacct_parent_id)
      LEFT OUTER JOIN cntct pc ON (c.crmacct_cntct_id_1=pc.cntct_id)
      LEFT OUTER JOIN addr m ON (pc.cntct_addr_id=m.addr_id)
      LEFT OUTER JOIN cntct sc ON (c.crmacct_cntct_id_2=sc.cntct_id)
      LEFT OUTER JOIN addr s ON (sc.cntct_addr_id=s.addr_id);

GRANT ALL ON TABLE api.account TO openmfg;
COMMENT ON VIEW api.account IS 'Account';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.account DO INSTEAD

INSERT INTO crmacct
	(crmacct_number,
         crmacct_parent_id,
         crmacct_name,
         crmacct_active,
         crmacct_type,
         crmacct_cntct_id_1,
         crmacct_cntct_id_2,
         crmacct_notes )
        VALUES
        (NEW.account_number,
         getCrmAcctId(NEW.parent_account),
         NEW.account_name,
         COALESCE(NEW.active,TRUE),
         CASE WHEN (NEW.type = 'Individual') THEN
           'I'
         ELSE 'O' END,
         saveCntct(
          NEW.primary_contact_number,
          saveAddr(
            NULL,
            NEW.primary_contact_address1,
            NEW.primary_contact_address2,
            NEW.primary_contact_address3,
            NEW.primary_contact_city,
            NEW.primary_contact_state,
            NEW.primary_contact_postalcode,
            NEW.primary_contact_country,
            NEW.primary_contact_address_change),
          NEW.primary_contact_first,
          NEW.primary_contact_last,
          NEW.primary_contact_honorific,
          NEW.primary_contact_voice,
          NULL,
          NEW.primary_contact_fax,
          NEW.primary_contact_email,
          NULL,
          NEW.primary_contact_job_title
          ),
          saveCntct(
          NEW.secondary_contact_number,
            saveAddr(
            NULL,
            NEW.secondary_contact_address1,
            NEW.secondary_contact_address2,
            NEW.secondary_contact_address3,
            NEW.secondary_contact_city,
            NEW.secondary_contact_state,
            NEW.secondary_contact_postalcode,
            NEW.secondary_contact_country,
            NEW.secondary_contact_address_change),
          NEW.secondary_contact_first,
          NEW.secondary_contact_last,
          NEW.secondary_contact_honorific,
          NEW.secondary_contact_voice,
          NULL,
          NEW.secondary_contact_fax,
          NEW.secondary_contact_email,
          NULL,
          NEW.secondary_contact_job_title),
          NEW.notes);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.account DO INSTEAD

UPDATE crmacct SET
    crmacct_number=NEW.account_number,
    crmacct_parent_id=getCrmAcctId(NEW.parent_account),
    crmacct_name=NEW.account_name,
    crmacct_active=NEW.active,
    crmacct_type=(
    CASE WHEN (NEW.type = 'Individual') THEN
           'I'
    ELSE 'O' END),
    crmacct_cntct_id_1=         
    saveCntct(
          NEW.primary_contact_number,
          saveAddr(
            NULL,
            NEW.primary_contact_address1,
            NEW.primary_contact_address2,
            NEW.primary_contact_address3,
            NEW.primary_contact_city,
            NEW.primary_contact_state,
            NEW.primary_contact_postalcode,
            NEW.primary_contact_country,
            NEW.primary_contact_address_change),
          NEW.primary_contact_first,
          NEW.primary_contact_last,
          NEW.primary_contact_honorific,
          NEW.primary_contact_voice,
          NULL,
          NEW.primary_contact_fax,
          NEW.primary_contact_email,
          NULL,
          NEW.primary_contact_job_title
          ),
    crmacct_cntct_id_2=
          saveCntct(
          NEW.secondary_contact_number,
          saveAddr(
            NULL,
            NEW.secondary_contact_address1,
            NEW.secondary_contact_address2,
            NEW.secondary_contact_address3,
            NEW.secondary_contact_city,
            NEW.secondary_contact_state,
            NEW.secondary_contact_postalcode,
            NEW.secondary_contact_country,
            NEW.secondary_contact_address_change),
          NEW.secondary_contact_first,
          NEW.secondary_contact_last,
          NEW.secondary_contact_honorific,
          NEW.secondary_contact_voice,
          NULL,
          NEW.secondary_contact_fax,
          NEW.secondary_contact_email,
          NULL,
          NEW.secondary_contact_job_title),
    crmacct_notes=NEW.notes
  WHERE (crmacct_number=OLD.account_number);

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.account DO INSTEAD

SELECT deleteCrmAccount(getCrmAcctId(OLD.account_number));

COMMIT;
