BEGIN;

CREATE TABLE freightclass (
  freightclass_id SERIAL PRIMARY KEY NOT NULL,
  freightclass_code TEXT UNIQUE NOT NULL,
  freightclass_descrip TEXT
);

REVOKE ALL ON freightclass FROM PUBLIC;
GRANT ALL ON freightclass TO GROUP openmfg;

REVOKE ALL ON freightclass_freightclass_id_seq FROM PUBLIC;
GRANT ALL ON freightclass_freightclass_id_seq TO GROUP openmfg;

COMMENT ON TABLE freightclass IS 'This table is the different freight classes.';

INSERT INTO priv (priv_module, priv_name, priv_descrip) 
VALUES ('Products', 'MaintainFreightClasses', 'Can Add/Edit/Delete Freight Classes');

INSERT INTO priv (priv_module, priv_name, priv_descrip) 
VALUES ('Products', 'ViewFreightClasses', 'Can View Freight Classes');

ALTER TABLE item ADD COLUMN item_freightclass_id INTEGER;

ALTER TABLE item ADD CONSTRAINT item_item_freightclass_id_fkey foreign key (item_freightclass_id) references freightclass (freightclass_id); 

COMMIT;

