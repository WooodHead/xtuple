CREATE OR REPLACE FUNCTION fixACL() RETURNS INTEGER AS '
DECLARE
  _r     RECORD;
  _count INTEGER := 0;
BEGIN
  FOR _r IN SELECT relname, nspname
            FROM pg_catalog.pg_class c, pg_namespace n
            WHERE ((n.oid=c.relnamespace)
              AND  (nspname in (''public'', ''api''))
              AND  (relkind in (''S'', ''r'', ''v''))) LOOP

    RAISE NOTICE ''%.%'', _r.nspname, _r.relname;
    EXECUTE ''REVOKE ALL ON '' || _r.nspname || ''.'' || _r.relname || '' FROM PUBLIC;'';
    EXECUTE ''GRANT ALL ON ''  || _r.nspname || ''.'' || _r.relname || '' TO GROUP openmfg;'';
    _count := _count + 1;

  END LOOP;

  RETURN _count;
END;
'
LANGUAGE 'plpgsql';
