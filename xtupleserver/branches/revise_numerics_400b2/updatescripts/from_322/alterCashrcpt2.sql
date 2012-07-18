BEGIN;

ALTER TABLE cashrcpt ADD COLUMN cashrcpt_void BOOLEAN;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_number TEXT;

UPDATE cashrcpt SET cashrcpt_void=FALSE;

ALTER TABLE cashrcpt ALTER COLUMN cashrcpt_void SET NOT NULL;
ALTER TABLE cashrcpt ALTER COLUMN cashrcpt_void SET DEFAULT FALSE;

ALTER TABLE cashrcpt ADD UNIQUE (cashrcpt_number);

COMMIT;

