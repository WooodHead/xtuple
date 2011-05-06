BEGIN;

ALTER TABLE whsinfo ADD COLUMN warehous_sequence INTEGER;
ALTER TABLE whsinfo ALTER COLUMN warehous_sequence SET DEFAULT 0;
UPDATE whsinfo SET warehous_sequence=0;
ALTER TABLE whsinfo ALTER COLUMN warehous_sequence SET NOT NULL;

COMMIT;

