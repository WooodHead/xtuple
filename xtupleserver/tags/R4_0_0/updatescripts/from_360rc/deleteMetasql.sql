DELETE FROM metasql WHERE metasql_group = 'postSubLedger'AND metasql_grade=0;
DELETE FROM metasql WHERE metasql_group = 'subledger'AND metasql_grade=0;
DELETE FROM metasql WHERE metasql_group = 'glseries' AND metasql_name='postsubledger' AND metasql_grade=0;