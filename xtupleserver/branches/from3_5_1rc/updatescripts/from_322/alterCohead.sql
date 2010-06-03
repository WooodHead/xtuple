BEGIN;

ALTER TABLE cohead ADD COLUMN cohead_labelform_id INTEGER REFERENCES labelform(labelform_id);

COMMIT;

