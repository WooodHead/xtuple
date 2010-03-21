
CREATE OR REPLACE FUNCTION saveMetasql(text,text,text,text) RETURNS INTEGER AS '
DECLARE
  pGroup	ALIAS FOR $1;
  pName 	ALIAS FOR $2;
  pNotes	ALIAS FOR $3;
  pQuery	ALIAS FOR $4;
  _metasqlid	INTEGER;
  
BEGIN

  --See if Query already exists
  SELECT metasql_id INTO _metasqlid
  FROM metasql
  WHERE ((metasql_group=pGroup)
  AND (metasql_name=pName));

  IF (FOUND) THEN
      --Update Existing
      UPDATE metasql SET
        metasql_group=pGroup,
        metasql_name=pName,
        metasql_notes=pNotes,
        metasql_query=pQuery
      WHERE (metasql_id=_metasqlid);
  ELSE
    --Create a new Record
    _metasqlid := NEXTVAL(''metasql_metasql_seq_id'');

    INSERT INTO metasql 
    VALUES (_metasqlid,pGroup,pName,pNotes,pQuery);
  END IF;
 
  RETURN _metasqlid;
END;
' LANGUAGE 'plpgsql';

