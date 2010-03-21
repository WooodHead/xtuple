BEGIN;

ALTER TABLE cohead ADD COLUMN cohead_ophead_id INTEGER REFERENCES ophead(ophead_id);
ALTER TABLE quhead ADD COLUMN quhead_ophead_id INTEGER REFERENCES ophead(ophead_id);

COMMIT;

