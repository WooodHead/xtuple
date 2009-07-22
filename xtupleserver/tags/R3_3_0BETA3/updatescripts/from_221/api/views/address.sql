BEGIN;

  --Address View

  DROP VIEW api.address;
  CREATE OR REPLACE VIEW api.address AS
 
  SELECT 
    addr_id AS address_number,
    addr_line1 AS address1,
    addr_line2 AS address2,
    addr_line3 AS address3,
    addr_city AS city,
    addr_state AS state,
    addr_postalcode AS postal_code,
    addr_country AS country,
    addr_active AS active,
    addr_notes AS notes,
    ''::TEXT AS change       
  FROM
    addr;

GRANT ALL ON TABLE api.address TO openmfg;
COMMENT ON VIEW api.address IS '
This view can be used as an interface to import Address data directly  
into the system.  Required fields will be checked and defaults will 
be populated if not specified.  The address_number field is really
a reference the addr_id field.  In future releases this will likely be 
turned into a separate and dedicated data field. If an address number
is inserted with address data that has already been used, the view not
insert the new address but will pass back the number of the pre-existing
address';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.address DO INSTEAD

SELECT    saveAddr(
            NEW.address_number,
            NEW.address1,
            NEW.address2,
            NEW.address3,
            NEW.city,
            NEW.state,
            NEW.postal_code,
            NEW.country,
            COALESCE(NEW.active,TRUE),
            NEW.notes,
            NULL);

CREATE OR REPLACE RULE "_UPDATE" AS
    ON UPDATE TO api.address DO INSTEAD

SELECT saveAddr(
            NEW.address_number,
            NEW.address1,
            NEW.address2,
            NEW.address3,
            NEW.city,
            NEW.state,
            NEW.postal_code,
            NEW.country,
            NEW.active,
            NEW.notes,
            NEW.change);

CREATE OR REPLACE RULE "_DELETE" AS
    ON DELETE TO api.address DO INSTEAD

SELECT deleteAddress(OLD.address_number);

COMMIT;
