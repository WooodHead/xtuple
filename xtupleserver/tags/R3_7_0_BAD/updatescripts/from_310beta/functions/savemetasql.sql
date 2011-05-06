CREATE OR REPLACE FUNCTION saveMetasql(TEXT, TEXT, TEXT, TEXT) RETURNS INTEGER AS '
BEGIN
  RETURN saveMetasql($1, $2, $3, $4, true);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION saveMetasql(TEXT,TEXT,TEXT,TEXT,BOOL) RETURNS INTEGER AS '
DECLARE
  pGroup	ALIAS FOR $1;
  pName 	ALIAS FOR $2;
  pNotes	ALIAS FOR $3;
  pQuery	ALIAS FOR $4;
  pSystem       ALIAS FOR $5;
  _metasqlid	INTEGER;
  _debug        BOOL    := true;
  
BEGIN

  --See if Query already exists
  IF (pSystem) THEN
    SELECT metasql_id INTO _metasqlid
    FROM metasql
    WHERE ((metasql_group=pGroup)
    AND (metasql_name=pName));
  ELSE
    SELECT metasql_id INTO _metasqlid
    FROM pkgmetasql
    WHERE ((metasql_group=pGroup)
    AND (metasql_name=pName));
  END IF;

  IF (FOUND) THEN
    IF (pSystem) THEN
      IF (_debug) THEN RAISE NOTICE ''update metasql''; END IF;
      UPDATE metasql SET
        metasql_group=pGroup,
        metasql_name=pName,
        metasql_notes=pNotes,
        metasql_query=pQuery
      WHERE (metasql_id=_metasqlid);
    ELSE
      IF (_debug) THEN RAISE NOTICE ''update pkgmetasql''; END IF;
      UPDATE pkgmetasql SET
        metasql_group=pGroup,
        metasql_name=pName,
        metasql_notes=pNotes,
        metasql_query=pQuery
      WHERE (metasql_id=_metasqlid);
    END IF;
  ELSE
    _metasqlid := NEXTVAL(''metasql_metasql_id_seq'');

    IF (pSystem) THEN
      IF (_debug) THEN RAISE NOTICE ''insert metasql''; END IF;
      INSERT INTO metasql 
      VALUES (_metasqlid,pGroup,pName,pNotes,pQuery);
    ELSE
      IF (_debug) THEN RAISE NOTICE ''insert pkgmetasql''; END IF;
      INSERT INTO pkgmetasql 
      VALUES (_metasqlid,pGroup,pName,pNotes,pQuery);
    END IF;
  END IF;
 
  RETURN _metasqlid;
END;
' LANGUAGE 'plpgsql';
