BEGIN;

DELETE FROM metasql WHERE metasql_group='summarizedTaxableSales' AND metasql_name='detail';

COMMIT;