BEGIN;

-- Customer Credit Card

--DROP VIEW api.custcreditcard;
CREATE VIEW api.custcreditcard
AS 
   SELECT 
     cust_number::varchar(100) AS customer_number,
     CASE
       WHEN ccard_type = 'V' THEN
         'Visa'
       WHEN ccard_type = 'M' THEN
         'Master Card'
       WHEN ccard_type = 'A' THEN
         'American Express'
       WHEN ccard_type = 'D' THEN
         'Discover'
       ELSE
         'Not Supported'
     END AS credit_card_type,
     ccard_active AS active,
     ccard_number AS credit_card_number,
     ccard_name AS name, 
     ccard_address1 AS street_address1,
     ccard_address2 AS street_address2,
     ccard_city AS city, 
     ccard_state AS state, 
     ccard_zip AS postal_code,
     ccard_country AS country, 
     ccard_month_expired AS expiration_month, 
     ccard_year_expired AS expiration_year,
     (''::text) AS key
   FROM ccard, custinfo
   WHERE (ccard_cust_id=cust_id);

GRANT ALL ON TABLE api.custcreditcard TO openmfg;
COMMENT ON VIEW api.custcreditcard IS '
This view can be used as an interface to import Customer Credit Card data directly  
into the system.  Required fields will be checked and default values will be 
populated.  The correct encryption key must to be passed on insertions for data to be
readable in OpenMFG; the key should NOT be STORED on the same server as the database
in any way.  Only insertions are allowed. Select statements will be encrypted.  
Use the GUI interface to view and process credit cards.';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.custcreditcard DO INSTEAD

SELECT insertccard(
   NEW.customer_number,
   NEW.active,
   NEW.credit_card_type,
   NEW.credit_card_number,
   NEW.name,
   NEW.street_address1,
   NEW.street_address2,
   NEW.city,
   NEW.state,
   NEW.postal_code,
   NEW.country,
   NEW.expiration_month,
   NEW.expiration_year,
   NEW.key);
 

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.custcreditcard DO INSTEAD NOTHING;

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.custcreditcard DO INSTEAD NOTHING;

COMMIT;
