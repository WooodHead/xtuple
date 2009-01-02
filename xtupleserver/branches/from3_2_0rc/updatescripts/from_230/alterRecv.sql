BEGIN;

ALTER TABLE recv ADD COLUMN recv_splitfrom_id INTEGER REFERENCES recv (recv_id);

COMMIT;