BEGIN;

ALTER TABLE quhead ADD COLUMN quhead_calcfreight BOOLEAN;
UPDATE quhead SET quhead_calcfreight=FALSE;
ALTER TABLE quhead ALTER quhead_calcfreight SET NOT NULL;
ALTER TABLE quhead ALTER quhead_calcfreight SET DEFAULT FALSE;

COMMIT;