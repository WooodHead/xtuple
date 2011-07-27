BEGIN;

CREATE TABLE cmnttypesource
(
  cmnttypesource_id serial PRIMARY KEY,
  cmnttypesource_cmnttype_id integer,
  cmnttypesource_source_id integer
);

GRANT ALL ON TABLE cmnttypesource TO xtrole;
COMMENT ON TABLE cmnttypesource IS 'Comment Type/Source association';

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE ( (strpos(cmnttype_usedin, 'I')>0)
  AND (source_name='I') );

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE ( (strpos(cmnttype_usedin, 'C')>0)
  AND (source_name='C') );

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE ( (strpos(cmnttype_usedin, 'V')>0)
  AND (source_name='V') );

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE ( (strpos(cmnttype_usedin, 'J')>0)
  AND (source_name='J') );

INSERT INTO cmnttypesource
( cmnttypesource_cmnttype_id, cmnttypesource_source_id )
SELECT cmnttype_id, source_id
FROM cmnttype, source
WHERE ( (strpos(cmnttype_usedin, 'L')>0)
  AND (source_name='LS') );

COMMIT;