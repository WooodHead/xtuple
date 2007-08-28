BEGIN;

-- Customer Tax Registration

DROP VIEW _custtax;
CREATE VIEW _custtax
AS 
   SELECT 
     cust_number AS customer_number,
     taxauth_code AS tax_authority,
     taxreg_number AS registration_number
   FROM custinfo, taxauth, taxreg
   WHERE ((taxreg_rel_type='C')
   AND (taxreg_rel_id=cust_id)
   AND (taxreg_taxauth_id=taxauth_id));

GRANT ALL ON TABLE _custtax TO openmfg;
COMMENT ON VIEW _custtax IS '
This view can be used as an interface to import Customer tax registration data directly  
into the system.  Required fields will be checked';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _custtax DO INSTEAD

  INSERT INTO taxreg (
    taxreg_rel_type,
    taxreg_rel_id,
    taxreg_taxauth_id,
    taxreg_number)
  VALUES (
    'C',
    getCustId(NEW.customer_number),
    getTaxAuthId(NEW.tax_authority),
    NEW.registration_number);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO _custtax DO INSTEAD

  UPDATE taxreg SET
    taxreg_number=NEW.registration_number
  WHERE  ((taxreg_rel_type='C')
  AND (taxreg_rel_id=getCustId(OLD.customer_number))
  AND (taxreg_taxauth_id=getTaxAuthID(OLD.tax_authority)));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO _custtax DO INSTEAD

  DELETE FROM taxreg
  WHERE  ((taxreg_rel_type='C')
  AND (taxreg_rel_id=getCustId(OLD.customer_number))
  AND (taxreg_taxauth_id=getTaxAuthID(OLD.tax_authority)));

COMMIT;
