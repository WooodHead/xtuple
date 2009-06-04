BEGIN;

-- Associate all sources to comment types ChangeLog and General

DELETE FROM cmnttypesource
WHERE cmnttypesource_cmnttype_id=(SELECT cmnttype_id FROM cmnttype WHERE cmnttype_name='ChangeLog');

DELETE FROM cmnttypesource
WHERE cmnttypesource_cmnttype_id=(SELECT cmnttype_id FROM cmnttype WHERE cmnttype_name='General');

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE (cmnttype_name='ChangeLog');

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE (cmnttype_name='General');

COMMIT;