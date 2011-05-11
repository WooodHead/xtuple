select dropifexists('VIEW','custsearch');

CREATE OR REPLACE VIEW custsearch AS (
SELECT cust_id AS id, 
       cust_number AS number, 
       cust_name AS name,
       addr_line1 AS address1,
       cust_active AS active, 
       cust_creditstatus AS creditstatus, 
       crmacct_id, true AS iscustomer, 
       cntct_id
FROM custinfo 
  LEFT OUTER JOIN cntct  ON (cust_cntct_id=cntct_id) 
  LEFT OUTER JOIN addr   ON (cntct_addr_id=addr_id) 
  LEFT OUTER JOIN crmacct ON (crmacct_cust_id=cust_id) 
UNION ALL 
SELECT prospect_id AS id, 
       prospect_number AS number,
       prospect_name AS name,
       addr_line1 AS address1,
       prospect_active AS active, 
       'G' AS creditstatus, 
       crmacct_id, false AS iscustomer, 
       cntct_id
FROM prospect 
  LEFT OUTER JOIN cntct  ON (prospect_cntct_id=cntct_id) 
  LEFT OUTER JOIN addr   ON (cntct_addr_id=addr_id) 
  LEFT OUTER JOIN crmacct ON (crmacct_prospect_id=prospect_id) 
);

GRANT ALL ON custsearch TO xtrole