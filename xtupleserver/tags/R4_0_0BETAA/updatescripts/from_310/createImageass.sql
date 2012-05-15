CREATE TABLE imageass
(
  imageass_id serial PRIMARY KEY,
  imageass_source_id integer NOT NULL,
  imageass_source text NOT NULL,
  imageass_image_id integer NOT NULL REFERENCES image (image_id),
  imageass_purpose character(1) NOT NULL,
  CONSTRAINT imageass_imageass_purpose_check CHECK (imageass_purpose = 'I'::bpchar OR imageass_purpose = 'E'::bpchar OR imageass_purpose = 'M'::bpchar OR imageass_purpose = 'P'::bpchar)
);
GRANT ALL ON TABLE imageass TO openmfg;
GRANT ALL ON SEQUENCE imageass_imageass_id_seq TO openmfg;
COMMENT ON TABLE imageass IS 'Image Assignement References';

INSERT INTO imageass (imageass_source, imageass_source_id, imageass_image_id, imageass_purpose)
SELECT 'I',itemimage_item_id,itemimage_image_id,itemimage_purpose
FROM itemimage;

