BEGIN;

INSERT INTO metric (metric_name, metric_value) values ('AllowAvgCostMethod', 'f');
INSERT INTO metric (metric_name, metric_value) values ('AllowStdCostMethod', 't');
INSERT INTO metric (metric_name, metric_value) values ('AllowJobCostMethod', 't');

COMMIT;

