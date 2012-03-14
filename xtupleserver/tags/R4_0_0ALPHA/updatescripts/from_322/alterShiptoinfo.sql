BEGIN;

ALTER TABLE shiptoinfo ADD COLUMN shipto_labelform_id INTEGER REFERENCES labelform(labelform_id);

COMMIT;

