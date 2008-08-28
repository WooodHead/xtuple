BEGIN;

CREATE TABLE itemlocpost
(
  itemlocpost_id serial PRIMARY KEY,
  itemlocpost_itemlocseries integer,
  itemlocpost_glseq integer
);
ALTER TABLE itemlocpost OWNER TO mfgadmin;
GRANT ALL ON TABLE itemlocpost TO mfgadmin;
GRANT ALL ON TABLE itemlocpost TO openmfg;
GRANT ALL ON TABLE itemlocpost_itemlocpost_id_seq TO openmfg;
COMMENT ON TABLE itemlocpost IS 'Temporary table for storing information about Inventory distribution G/L postings involving Lot/Serial and Multiple Location Control (MLC) Items';

COMMIT;



