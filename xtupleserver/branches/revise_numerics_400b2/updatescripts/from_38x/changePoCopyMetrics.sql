-- replace POVendor metric with watermarks; makes po's like other multicopy docs

SELECT setMetric('POCopies',
                 CAST((fetchMetricValue('POInternal') +
                       CASE WHEN fetchMetricBool('POVendor') THEN 0 ELSE 1 END)
                      AS TEXT));

SELECT setMetric('POWatermark0', 'Vendor Copy')
 WHERE fetchMetricBool('POVendor');

SELECT setmetric('POWatermark'     || CAST((sequence_value - poffset) AS TEXT),
                 'Internal Copy #' || CAST((sequence_value - poffset) AS TEXT))
  FROM sequence,
       (SELECT CASE WHEN fetchMetricBool('POVendor') THEN 0 ELSE 1 END AS poffset) AS dummy
 WHERE sequence_value <= fetchMetricValue('POInternal');

DELETE FROM metric WHERE metric_name IN ('POVendor', 'POInternal');
