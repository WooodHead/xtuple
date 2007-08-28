BEGIN;

-- Customer Characteristic

DROP VIEW _custchar;
CREATE VIEW _custchar
AS 
   SELECT 
     cust_number AS customer_number,
     char_name AS characteristic,
     charass_value AS value
   FROM custinfo, char, charass
   WHERE (('C'=charass_target_type)
   AND (cust_id=charass_target_id)
   AND (charass_char_id=char_id));

GRANT ALL ON TABLE _custchar TO openmfg;
COMMENT ON VIEW _custchar IS '
This view can be used as an interface to import Customer Characteristic data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _custchar DO INSTEAD

  INSERT INTO charass (
    charass_target_type,
    charass_target_id,
    charass_char_id,
    charass_value,
    charass_default
    )
  VALUES (
    'C',
    getCustId(NEW.customer_number),
    getCharId(NEW.characteristic,'C'),
    NEW.value,
    false);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO _custchar DO INSTEAD

  UPDATE charass SET
    charass_value=NEW.value
  WHERE ((charass_target_type='C')
  AND (charass_target_id=getCustId(OLD.customer_number))
  AND (charass_char_id=getCharId(OLD.characteristic,'C')));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO _custchar DO INSTEAD

  DELETE FROM charass
  WHERE ((charass_target_type='C')
  AND (charass_target_id=getCustId(OLD.customer_number))
  AND (charass_char_id=getCharId(OLD.characteristic,'C')));

COMMIT;
