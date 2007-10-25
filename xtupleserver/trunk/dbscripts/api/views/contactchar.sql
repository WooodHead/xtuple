BEGIN;

-- Contact Characteristic

DROP VIEW api.contactchar;
CREATE VIEW api.contactchar
AS 
   SELECT 
     cntct_id AS contact_number,
     char_name::varchar(100) AS characteristic,
     charass_value AS value
   FROM cntct, char, charass
   WHERE (('CNTCT'=charass_target_type)
   AND (cntct_id=charass_target_id)
   AND (charass_char_id=char_id));

GRANT ALL ON TABLE api.contactchar TO openmfg;
COMMENT ON VIEW api.contactchar IS '
This view can be used as an interface to import Contact Characteristic data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.contactchar DO INSTEAD

  INSERT INTO charass (
    charass_target_type,
    charass_target_id,
    charass_char_id,
    charass_value,
    charass_default
    )
  VALUES (
    'CNTCT',
    NEW.contact_number,
    getCharId(NEW.characteristic,'CNTCT'),
    NEW.value,
    false);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.contactchar DO INSTEAD

  UPDATE charass SET
    charass_value=NEW.value
  WHERE ((charass_target_type='CNTCT')
  AND (charass_target_id=OLD.contact_number)
  AND (charass_char_id=getCharId(OLD.characteristic,'CNTCT')));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.contactchar DO INSTEAD

  DELETE FROM charass
  WHERE ((charass_target_type='CNTCT')
  AND (charass_target_id=OLD.contact_number)
  AND (charass_char_id=getCharId(OLD.characteristic,'CNTCT')));

COMMIT;
