CREATE OR REPLACE FUNCTION saveMetasql(TEXT, TEXT, TEXT, TEXT) RETURNS INTEGER AS $$
BEGIN
  RETURN saveMetasql($1, $2, $3, $4, true);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION saveMetasql(TEXT,TEXT,TEXT,TEXT,BOOL) RETURNS INTEGER AS $$
DECLARE
  pGroup	ALIAS FOR $1;
  pName 	ALIAS FOR $2;
  pNotes	ALIAS FOR $3;
  pQuery	ALIAS FOR $4;
  pSystem       ALIAS FOR $5;
  _metasqlid	INTEGER;
  _tableoid     INTEGER;
  _schema       TEXT;
  _debug        BOOL    := true;
  
BEGIN

  --See if Query already exists
  SELECT tableoid, metasql_id INTO _metasqlid, _tableoid
  FROM metasql
  WHERE ((metasql_group=pGroup)
     AND (metasql_name=pName));

  IF (FOUND) THEN
    IF (_debug) THEN RAISE NOTICE 'update metasql'; END IF;
    UPDATE metasql SET
      metasql_group=pGroup,
      metasql_name=pName,
      metasql_notes=pNotes,
      metasql_query=pQuery
    WHERE (metasql_id=_metasqlid);
  ELSE
    _metasqlid := NEXTVAL('metasql_metasql_id_seq');

    BEGIN
      IF (_debug) THEN RAISE NOTICE 'attempting to insert into pkgmetasql'; END IF;
      INSERT INTO pkgmetasql 
      VALUES (_metasqlid,pGroup,pName,pNotes,pQuery);
    EXCEPTION WHEN undefined_table THEN
                    IF (_debug) THEN RAISE NOTICE 'insert metasql'; END IF;
                    INSERT INTO metasql 
                    VALUES (_metasqlid,pGroup,pName,pNotes,pQuery);
              WHEN OTHERS THEN RAISE EXCEPTION '% %', SQLSTATE, SQLERRM;
    END;
  END IF;
 
  RETURN _metasqlid;
END;
$$ LANGUAGE 'plpgsql';
