SELECT setMetric('NumberIssueResetIntervalDays', '1')
  WHERE NOT EXISTS(SELECT 1
                     FROM metric
                    WHERE metric_name = 'NumberIssueResetIntervalDays');
