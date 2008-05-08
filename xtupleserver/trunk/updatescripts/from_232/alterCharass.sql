BEGIN;

ALTER TABLE charass ADD COLUMN charass_price numeric(16,4) NOT NULL DEFAULT 0;

CREATE INDEX charass_target_idx ON charass (charass_target_type, charass_target_id);

COMMIT;
