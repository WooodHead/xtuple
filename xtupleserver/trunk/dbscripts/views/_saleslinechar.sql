BEGIN;

-- Sales Order Line Characteristics

DROP VIEW _saleslinechar;
CREATE VIEW _saleslinechar
AS 
SELECT DISTINCT cohead_number AS order_number, 
  coitem_linenumber AS line_number,
  char_name AS characteristic,
  COALESCE((
    SELECT b.charass_value 
    FROM charass b 
    WHERE ((b.charass_target_type='SI') 
    AND (b.charass_target_id=coitem_id) 
    AND (b.charass_char_id=char_id))), (
    SELECT c.charass_value 
    FROM charass c 
    WHERE ((c.charass_target_type='I') 
    AND (c.charass_target_id=item_id) 
    AND (c.charass_default) 
    AND (c.charass_char_id=char_id)) LIMIT 1)) AS value
FROM cohead, coitem, itemsite, item, charass a, char
WHERE ( (cohead_id=coitem_cohead_id)
AND (coitem_itemsite_id=itemsite_id)
AND (itemsite_item_id=item_id)
AND (a.charass_char_id=char_id)
AND (a.charass_target_type='I')
AND (a.charass_target_id=item_id) ) 
ORDER BY cohead_number,coitem_linenumber, char_name;

GRANT ALL ON TABLE _saleslinechar TO openmfg;
COMMENT ON VIEW _saleslinechar IS '
This view can be used as an interface to import Sales Order Characteristic data directly  
into the system.  Required fields will be checked and default values will be 
populated';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO _saleslinechar DO INSTEAD

SELECT DISTINCT updateCharAssignment('SI', coitem_id, charass_char_id, NEW.value)
FROM cohead, coitem, itemsite, item, charass, char
WHERE ((cohead_number=NEW.order_number)
AND (cohead_id=coitem_cohead_id)
AND (coitem_linenumber=NEW.line_number)
AND (coitem_itemsite_id=itemsite_id)
AND (item_id=itemsite_item_id)
AND (charass_target_type='I')
AND (charass_target_id=item_id)
AND (char_id=charass_char_id)
AND (char_name=NEW.characteristic));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO _saleslinechar DO INSTEAD

SELECT DISTINCT updateCharAssignment('SI', coitem_id, charass_char_id, NEW.value)
FROM cohead, coitem, itemsite, item, charass, char
WHERE ((cohead_number=OLD.order_number)
AND (cohead_id=coitem_cohead_id)
AND (coitem_linenumber=OLD.line_number)
AND (coitem_itemsite_id=itemsite_id)
AND (item_id=itemsite_item_id)
AND (charass_target_type='I')
AND (charass_target_id=item_id)
AND (char_id=charass_char_id)
AND (char_name=OLD.characteristic));

CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO _saleslinechar DO INSTEAD NOTHING;

COMMIT;
