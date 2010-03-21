BEGIN;

ALTER TABLE vendinfo ADD FOREIGN KEY (vend_vendtype_id) REFERENCES vendtype (vendtype_id); 

COMMIT;
