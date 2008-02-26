BEGIN;

ALTER TABLE bomitem ADD COLUMN bomitem_charass_id INTEGER REFERENCES charass (charass_id);

COMMIT;