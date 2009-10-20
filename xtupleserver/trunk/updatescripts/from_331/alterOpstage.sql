BEGIN;

ALTER TABLE opstage ADD COLUMN opstage_opinactive BOOLEAN DEFAULT false;
UPDATE opstage SET opstage_opinactive=false;

COMMIT;

