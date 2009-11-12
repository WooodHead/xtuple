BEGIN;

DROP TABLE itemimage;

CREATE VIEW itemimage AS
SELECT 
  imageass_id AS itemimage_id,
  imageass_source_id AS itemimage_item_id,
  imageass_image_id AS itemimage_image_id,
  imageass_purpose AS itemimage_purpose
FROM imageass
WHERE (imageass_source='I');
GRANT ALL ON itemimage TO openmfg;
COMMENT ON VIEW itemimage IS 'Itemimage view for legacy support. Use of itemimage is deprecated. Use imageass table for future development';

COMMIT;
