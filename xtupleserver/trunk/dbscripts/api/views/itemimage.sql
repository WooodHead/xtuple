BEGIN;

-- Item Image

DROP VIEW api.itemimage;
CREATE VIEW api.itemimage
AS 
   SELECT 
     item_number::varchar(100) AS item_number,
     CASE
       WHEN itemimage_purpose = 'P' THEN
        'Product Description'
       WHEN itemimage_purpose = 'I' THEN
        'Inventory Description'
       WHEN itemimage_purpose = 'E' THEN
        'Engineering Reference'
       WHEN itemimage_purpose = 'M' THEN
        'Miscellaneos'
     END AS purpose,
     image_name AS image_name
   FROM item, itemimage, image
   WHERE ((item_id=itemimage_item_id)
   AND (itemimage_image_id=image_id));

GRANT ALL ON TABLE api.itemimage TO openmfg;
COMMENT ON VIEW api.itemimage IS 'Item Image';

--Rules

CREATE OR REPLACE RULE "_INSERT" AS
    ON INSERT TO api.itemimage DO INSTEAD

  SELECT saveItemImage(
    getItemId(NEW.item_number),
    CASE
      WHEN NEW.purpose = 'Product Description' THEN
        'P'
      WHEN NEW.purpose = 'Inventory Description' THEN
        'I'
      WHEN NEW.purpose = 'Engineering Reference' THEN
        'E'
      WHEN NEW.purpose = 'Miscellaneous' THEN
        'M'
     END,
    getImageId(NEW.image_name));

CREATE OR REPLACE RULE "_UPDATE" AS 
    ON UPDATE TO api.itemimage DO INSTEAD

  SELECT saveItemImage(
    getItemId(NEW.item_number),
    CASE
      WHEN NEW.purpose = 'Product Description' THEN
        'P'
      WHEN NEW.purpose = 'Inventory Description' THEN
        'I'
      WHEN NEW.purpose = 'Engineering Reference' THEN
        'E'
      WHEN NEW.purpose = 'Miscellaneous' THEN
        'M'
     END,
    getImageId(NEW.image_name));
           
CREATE OR REPLACE RULE "_DELETE" AS 
    ON DELETE TO api.itemimage DO INSTEAD

  DELETE FROM itemimage
  WHERE ((itemimage_item_id=getItemId(OLD.item_number))
  AND (itemimage_image_id=getImageId(OLD.image_name)));

COMMIT;
