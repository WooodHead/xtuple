BEGIN;

DROP TABLE itemfile;

CREATE VIEW itemfile AS
SELECT   url_id AS itemfile_id,
  url_source_id AS itemfile_item_id,
  url_title AS itemfile_title,
  url_url AS itemfile_url
FROM url
WHERE (url_source='I');

COMMENT ON VIEW itemfile IS 'Itemfile view for legacy support. Use of itemfile is deprecated. Use url table for future development';

COMMIT;
