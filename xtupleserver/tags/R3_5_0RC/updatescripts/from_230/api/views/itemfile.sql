BEGIN;

-- Item File

DROP VIEW api.itemfile;
CREATE VIEW api.itemfile
AS 
   SELECT 
     item_number::varchar(100) AS item_number,
     itemfile_title AS title,
     itemfile_url AS url
   FROM item, itemfile
   WHERE (item_id=itemfile_item_id);

GRANT ALL ON TABLE api.itemfile TO openmfg;
COMMENT ON VIEW api.itemfile IS 'Item File';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.itemfile DO INSTEAD

  INSERT INTO itemfile (
    itemfile_item_id,
    itemfile_title,
    itemfile_url)
  VALUES (
    getItemId(NEW.item_number),
    NEW.title,
    NEW.url);

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.itemfile DO INSTEAD

  UPDATE itemfile SET
    itemfile_title=NEW.title,
    itemfile_url=NEW.url
  WHERE  ((itemfile_item_id=getItemId(OLD.item_number))
  AND (itemfile_title=OLD.title)
  AND (itemfile_url=OLD.url));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.itemfile DO INSTEAD

  DELETE FROM itemfile
  WHERE  ((itemfile_item_id=getItemId(OLD.item_number))
  AND (itemfile_title=OLD.title)
  AND (itemfile_url=OLD.url));

COMMIT;
