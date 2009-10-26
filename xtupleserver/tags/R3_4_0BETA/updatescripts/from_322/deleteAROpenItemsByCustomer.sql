BEGIN;

DELETE FROM metasql WHERE metasql_group = 'arOpenItemsByCustomer' AND metasql_name = 'detail';
DELETE FROM report WHERE report_name = 'AROpenItemsByCustomer' AND report_grade = 0;

COMMIT;