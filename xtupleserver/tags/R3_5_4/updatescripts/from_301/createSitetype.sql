BEGIN;

CREATE TABLE sitetype (
  sitetype_id SERIAL PRIMARY KEY NOT NULL,
  sitetype_name TEXT UNIQUE NOT NULL,
  sitetype_descrip TEXT
);

REVOKE ALL ON sitetype FROM PUBLIC;
GRANT ALL ON sitetype TO GROUP openmfg;

REVOKE ALL ON sitetype_sitetype_id_seq FROM PUBLIC;
GRANT ALL ON sitetype_sitetype_id_seq TO GROUP openmfg;

COMMENT ON TABLE sitetype IS 'This table is the different types of sites.';

INSERT INTO priv
      (priv_module, priv_name, priv_descrip)
VALUES('Inventory', 'MaintainSiteTypes', 'Can Change or Create Settings For Site Types');

INSERT INTO priv
      (priv_module, priv_name, priv_descrip)
VALUES('Inventory', 'ViewSiteTypes', 'Can View Settings For Site Types');

INSERT INTO sitetype
      (sitetype_name, sitetype_descrip)
VALUES('WHSE', 'Warehouse');

ALTER TABLE whsinfo ADD COLUMN warehous_sitetype_id INTEGER;

UPDATE whsinfo SET warehous_sitetype_id=(SELECT sitetype_id FROM sitetype WHERE sitetype_name='WHSE');

ALTER TABLE whsinfo ADD CONSTRAINT whsinfo_warehous_sitetype_id_fkey foreign key (warehous_sitetype_id) references sitetype (sitetype_id); 

COMMIT;

