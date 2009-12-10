CREATE OR REPLACE FUNCTION saveMetasql(TEXT, TEXT, TEXT, TEXT) RETURNS INTEGER AS $$
BEGIN
  RETURN saveMetasql($1, $2, $3, $4, true);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION saveMetasql(TEXT,TEXT,TEXT,TEXT,BOOL) RETURNS INTEGER AS $$
BEGIN
  RETURN saveMetasql($1, $2, $3, $4, $5, NULL);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION saveMetasql(TEXT,TEXT,TEXT,TEXT,BOOL,TEXT) RETURNS INTEGER AS $$
DECLARE
  pGroup	ALIAS FOR $1;
  pName 	ALIAS FOR $2;
  pNotes	ALIAS FOR $3;
  pQuery	ALIAS FOR $4;
  pSystem       ALIAS FOR $5;
  pSchema       ALIAS FOR $6;
  _metasqlid	INTEGER;
  _debug        BOOL    := false;
  _insertstr    TEXT;
  _table        TEXT;
  
BEGIN

  --See if Query already exists
  SELECT metasql_id INTO _metasqlid
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
    IF (COALESCE(pSchema, 'public') = 'public' OR
        TRIM(pSchema) = '') THEN
      _table := 'metasql';
    ELSE
      _table := pSchema || '.pkgmetasql';
    END IF;

    _insertstr := 'INSERT INTO ' ||
                  _table || ' VALUES (DEFAULT, ' ||
                  quote_literal(pGroup) || ',' || quote_literal(pName) || ',' ||
                  quote_literal(pNotes) || ',' || quote_literal(pQuery) ||
                  ') RETURNING metasql_id;' ;

    IF (_debug) THEN RAISE NOTICE '%', _insertstr; END IF;
    EXECUTE _insertstr INTO _metasqlid;
  END IF;
 
  RETURN _metasqlid;
END;
$$ LANGUAGE 'plpgsql';
