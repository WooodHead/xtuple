BEGIN;

SELECT dropIfExists('TABLE', 'brddist')
WHERE fetchMetricText('Application') != 'Manufacturing';

COMMIT;
