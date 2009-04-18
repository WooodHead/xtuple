BEGIN;

ALTER TABLE cashrcpt ADD COLUMN cashrcpt_docdate DATE;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_posted BOOLEAN;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_posteddate DATE;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_postedby TEXT;

UPDATE cashrcpt SET cashrcpt_posted=FALSE;

ALTER TABLE cashrcpt ALTER COLUMN cashrcpt_posted SET NOT NULL;
ALTER TABLE cashrcpt ALTER COLUMN cashrcpt_posted SET DEFAULT FALSE;

COMMIT;

