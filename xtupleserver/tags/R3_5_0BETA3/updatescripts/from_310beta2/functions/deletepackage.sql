CREATE OR REPLACE FUNCTION deletePackage(INTEGER) RETURNS INTEGER AS $$
DECLARE
  ppkgheadid    ALIAS FOR $1;
  _i            INTEGER := 0;
  _pkgname      TEXT;
  _r            RECORD;
  _tabs         TEXT[] := ARRAY['cmd',  'cmdarg', 'image',  'metasql',
                                'priv', 'report', 'script', 'uiform'];
  _debug        BOOL := false;

BEGIN
  IF (EXISTS(SELECT *
             FROM pkgdep
             WHERE (pkgdep_parent_pkghead_id=ppkgheadid))) THEN
    RETURN -1;
  END IF;

  SELECT pkghead_name INTO _pkgname
  FROM pkghead
  WHERE (pkghead_id=ppkgheadid);
  IF (NOT FOUND) THEN
    RETURN -2;
  END IF;

  IF (LOWER(_pkgname) = 'public' OR LOWER(_pkgname) = 'api') THEN
    RETURN -3;
  END IF;

  IF (NOT EXISTS(SELECT *
                 FROM pkgitem
                 WHERE ((pkgitem_pkghead_id=ppkgheadid)
                    AND (pkgitem_type='S')
                    AND (pkgitem_name=_pkgname)))) THEN
    RETURN -4;
  END IF;

  FOR _i IN ARRAY_LOWER(_tabs,1)..ARRAY_UPPER(_tabs,1) LOOP
    EXECUTE 'ALTER TABLE ' || _pkgname || '.pkg' || _tabs[_i] ||
            ' DISABLE TRIGGER pkg' || _tabs[_i] || 'altertrigger;';
  END LOOP;

  -- drop all of the schemas that are part of this package, forcing the
  -- main schema of the package to be last.
  -- TODO: is this really necessary? the 2.0.0beta2 updater removed the
  --       syntax for creating schemas
  FOR _r IN SELECT *,
                   CASE WHEN pkgitem_name=_pkgname THEN 1 ELSE 0 END AS seq
            FROM pkgitem
            WHERE ((pkgitem_type='S')
               AND (pkgitem_pkghead_id=ppkgheadid))
            ORDER BY seq LOOP
    IF (_debug) THEN RAISE NOTICE 'dropping schema %', _r.pkgitem_name; END IF;
    EXECUTE 'DROP SCHEMA ' || _r.pkgitem_name || ' CASCADE';
  END LOOP;

  DELETE FROM pkghead WHERE pkghead_id=ppkgheadid;

  RETURN ppkgheadid;
END;
$$ LANGUAGE 'plpgsql';
