BEGIN;

DELETE FROM metasql WHERE metasql_group = 'preauthCreditCard' AND metasql_name = 'detail';

COMMIT;