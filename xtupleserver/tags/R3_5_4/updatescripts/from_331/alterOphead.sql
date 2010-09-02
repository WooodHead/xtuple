BEGIN;

ALTER TABLE ophead ADD COLUMN ophead_active BOOLEAN DEFAULT true;
UPDATE ophead SET ophead_active=true;

COMMIT;

