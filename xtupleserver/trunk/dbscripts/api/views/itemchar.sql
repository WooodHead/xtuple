BEGIN;

-- Item Characteristic

DROP VIEW api.itemchar;
CREATE VIEW api.itemchar
AS 
   SELECT 
     item_number,
     char_name::varchar(100) AS characteristic,
     charass_value AS value,
     charass_default AS default
   FROM item, char, charass
   WHERE (('I'=charass_target_type)
   AND (item_id=charass_target_id)
   AND (charass_char_id=char_id));

GRANT ALL ON TABLE api.itemchar TO openmfg;
COMMENT ON VIEW api.itemchar IS '
This view can be used as an interface to import Item Characteristic data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.itemchar DO INSTEAD

  INSERT INTO charass (
    charass_target_type,
    charass_target_id,
    charass_char_id,
    charass_value,
    charass_default
    )
  VALUES (
    'I',
    getItemId(NEW.item_number),
    getCharId(NEW.characteristic,'I'),
    NEW.value,
    NEW.default);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.itemchar DO INSTEAD

  UPDATE charass SET
    charass_value=NEW.value,
    charass_default=NEW.default
  WHERE ((charass_target_type='I')
  AND (charass_target_id=getItemId(OLD.item_number))
  AND (charass_char_id=getCharId(OLD.characteristic,'I')));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.itemchar DO INSTEAD

  DELETE FROM charass
  WHERE ((charass_target_type='I')
  AND (charass_target_id=getItemId(OLD.item_number))
  AND (charass_char_id=getCharId(OLD.characteristic,'I')));

COMMIT;
