CREATE TABLE url
(
  url_id serial NOT NULL PRIMARY KEY,
  url_source_id integer NOT NULL,
  url_source text NOT NULL,
  url_title text NOT NULL,
  url_url text NOT NULL
);

GRANT ALL ON TABLE url TO openmfg;
GRANT ALL ON SEQUENCE url_url_id_seq TO openmfg;
COMMENT ON TABLE url IS 'URL references to documents.';

INSERT INTO url (url_source_id, url_source, url_title, url_url)
SELECT itemfile_item_id, 'I',itemfile_title,itemfile_url
FROM itemfile;