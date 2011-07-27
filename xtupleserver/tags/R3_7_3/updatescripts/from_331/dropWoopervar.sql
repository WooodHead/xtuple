BEGIN;

SELECT dropIfExists('TABLE', 'woopervar')
WHERE fetchMetricText('Application') != 'Manufacturing';

COMMIT;
