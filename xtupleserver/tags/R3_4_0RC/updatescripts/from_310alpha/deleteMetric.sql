BEGIN;

DELETE FROM metric 
WHERE ((metric_name='EnableBatchManager')
AND (fetchmetrictext('Application')='PostBooks'));

COMMIT;