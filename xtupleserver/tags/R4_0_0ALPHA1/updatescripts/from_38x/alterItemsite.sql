SELECT createColumn('public',  'itemsite', 'itemsite_recvlocation_id',
                    'INTEGER', '-1',       FALSE);
SELECT createColumn('public',  'itemsite', 'itemsite_issuelocation_id',
                    'INTEGER', '-1',       FALSE);
SELECT createColumn('public',  'itemsite', 'itemsite_location_dist',
                    'BOOLEAN', 'FALSE',    FALSE);
SELECT createColumn('public',  'itemsite', 'itemsite_recvlocation_dist',
                    'BOOLEAN', 'FALSE',    FALSE);
SELECT createColumn('public',  'itemsite', 'itemsite_issuelocation_dist',
                    'BOOLEAN', 'FALSE',    FALSE);
