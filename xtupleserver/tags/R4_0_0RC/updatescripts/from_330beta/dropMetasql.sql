BEGIN;

DELETE FROM metasql WHERE metasql_group='bankrecHistory' AND metasql_name='detail';

COMMIT;