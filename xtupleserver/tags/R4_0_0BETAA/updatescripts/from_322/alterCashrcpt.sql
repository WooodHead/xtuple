BEGIN;

ALTER TABLE cashrcpt ADD COLUMN cashrcpt_docdate DATE;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_posted BOOLEAN;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_posteddate DATE;
ALTER TABLE cashrcpt ADD COLUMN cashrcpt_postedby TEXT;

UPDATE cashrcpt SET cashrcpt_posted=FALSE;

ALTER TABLE cashrcpt ALTER COLUMN cashrcpt_posted SET NOT NULL;
ALTER TABLE cashrcpt ALTER COLUMN cashrcpt_posted SET DEFAULT FALSE;

-- Create Metric
INSERT INTO metric (metric_name, metric_value)
       VALUES      ('LegacyCashReceipts', 'f');
UPDATE metric SET metric_value=CASE WHEN (SELECT (COUNT(*) > 0)
                                          FROM arapply
                                          WHERE arapply_source_doctype='K') THEN 't'
                                    ELSE 'f' END
WHERE metric_name='LegacyCashReceipts';

COMMIT;

