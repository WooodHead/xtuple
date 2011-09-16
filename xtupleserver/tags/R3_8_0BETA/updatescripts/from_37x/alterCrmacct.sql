UPDATE crmacct SET crmacct_owner_username = NULL WHERE TRIM(crmacct_owner_username) = '';
UPDATE crmacct SET crmacct_vend_id        = NULL WHERE crmacct_vend_id <= 0;

ALTER TABLE crmacct ADD COLUMN crmacct_emp_id       INTEGER REFERENCES emp      (emp_id);
ALTER TABLE crmacct ADD COLUMN crmacct_salesrep_id  INTEGER REFERENCES salesrep (salesrep_id);
ALTER TABLE crmacct ADD COLUMN crmacct_usr_username TEXT    CHECK(TRIM(crmacct_usr_username) != '');
ALTER TABLE crmacct ADD CONSTRAINT crmacct_crmacct_number_key   UNIQUE (crmacct_number);
ALTER TABLE crmacct ADD CONSTRAINT crmacct_owner_username_check CHECK (TRIM(crmacct_owner_username) != '');
ALTER TABLE crmacct ADD CONSTRAINT crmacct_crmacct_type_check   CHECK (crmacct_type IN ('I', 'O'));
ALTER TABLE crmacct ADD CONSTRAINT crmacct_crmacct_vend_id_fkey FOREIGN KEY (crmacct_vend_id)
                                                                REFERENCES vendinfo (vend_id);

COMMENT ON TABLE crmacct IS 'CRM Accounts are umbrella records that tie together people and organizations with whom we have business relationships.';

COMMENT ON COLUMN crmacct.crmacct_active         IS 'This CRM Account is available for new activity.';
COMMENT ON COLUMN crmacct.crmacct_cntct_id_1     IS 'The primary contact for the CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_cntct_id_2     IS 'The secondary contact for the CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_competitor_id  IS 'For now, > 0 indicates this CRM Account is a competitor. Eventually this may become a foreign key to a table of competitors.';
COMMENT ON COLUMN crmacct.crmacct_cust_id        IS 'If this is not null, this CRM Account is a Customer.';
COMMENT ON COLUMN crmacct.crmacct_emp_id         IS 'If this is not null, this CRM Account is an Employee.';
COMMENT ON COLUMN crmacct.crmacct_id             IS 'Internal ID of this CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_name           IS 'Long name of this CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_notes          IS 'Free-form comments pertaining to the CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_number         IS 'Abbreviated human-readable identifier for this CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_owner_username IS 'The application User responsible for this CRM Account.';
COMMENT ON COLUMN crmacct.crmacct_parent_id      IS 'The internal ID of an (optional) parent CRM Account. For example, if the current CRM Account is a subsidiary of another company, the crmacct_parent_id points to the CRM Account representing that parent company.';
COMMENT ON COLUMN crmacct.crmacct_partner_id     IS 'For now, > 0 indicates this CRM Account is a partner. Eventually this may become a foreign key to a table of partners.';
COMMENT ON COLUMN crmacct.crmacct_prospect_id    IS 'If this is not null, this CRM Account is a Prospect.';
COMMENT ON COLUMN crmacct.crmacct_salesrep_id    IS 'If this is not null, this CRM Account is a Sales Rep.';
COMMENT ON COLUMN crmacct.crmacct_taxauth_id     IS 'If this is not null, this CRM Account is a Tax Authority.';
COMMENT ON COLUMN crmacct.crmacct_type           IS 'This indicates whether the CRM Account represents an organization or an individual person.';
COMMENT ON COLUMN crmacct.crmacct_usr_username   IS 'If this is not null, this CRM Account is an application User.';
COMMENT ON COLUMN crmacct.crmacct_vend_id        IS 'If this is not null, this CRM Account is a Vendor.';
