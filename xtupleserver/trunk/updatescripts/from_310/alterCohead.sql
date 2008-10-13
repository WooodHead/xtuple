BEGIN;

ALTER TABLE cohead ADD COLUMN cohead_calcfreight BOOLEAN;
UPDATE cohead SET cohead_calcfreight=FALSE;
ALTER TABLE cohead ALTER cohead_calcfreight SET NOT NULL;
ALTER TABLE cohead ALTER cohead_calcfreight SET DEFAULT FALSE;

COMMIT;