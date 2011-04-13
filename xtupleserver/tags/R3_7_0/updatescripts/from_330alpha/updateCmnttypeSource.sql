BEGIN;

-- Associate all sources to all comment types

DELETE FROM cmnttypesource;

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source;

COMMIT;