BEGIN;

DELETE FROM metric
 WHERE metric_name = 'EnableBatchManager'
   AND metric_id != (SELECT COALESCE((SELECT min(metric_id)
                                        FROM METRIC
                                       WHERE metric_name = 'EnableBatchManager'
                                         AND metric_value='t'),
                                     (SELECT min(metric_id)
                                        FROM METRIC
                                       WHERE metric_name = 'EnableBatchManager')));

COMMIT;

