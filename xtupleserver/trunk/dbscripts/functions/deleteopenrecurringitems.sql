CREATE OR REPLACE FUNCTION deleteOpenRecurringItems(INTEGER, TEXT, TIMESTAMP WITH TIME ZONE, BOOLEAN) RETURNS INTEGER AS $$
DECLARE
  pParentid     ALIAS FOR $1;
  pType         TEXT                     := UPPER($2);
  pDatetime     TIMESTAMP WITH TIME ZONE := COALESCE($3, startOfTime());
  pInclParent   BOOLEAN                  := COALESCE($4, FALSE);

  _count         INTEGER := 0;
  _delchildstmt  TEXT;
  _delparentstmt TEXT;
  _rt            RECORD;
  _tmp           INTEGER;
BEGIN
  RAISE DEBUG 'deleteOpenRecurringItems(%, %, %)', pParentid, pType, pDatetime;

  IF (pParentid IS NULL) THEN
    RETURN -11;
  END IF;

  SELECT * INTO _rt FROM recurtype WHERE (UPPER(recurtype_type)=pType);
  GET DIAGNOSTICS _count = ROW_COUNT;
  IF (_count <= 0) THEN
    RETURN -10;
  END IF;

  -- 2 deletes avoid reparenting problems if the parent gets deleted first
  IF (_rt.recurtype_delfunc IS NULL) THEN
    _delchildstmt := 'DELETE FROM [fulltable] USING recur'
                  || ' WHERE (NOT ([done])'
                  || '    AND ([schedcol]>''$2'')'
                  || '    AND ([table]_recurring_[table]_id=recur_parent_id)'
                  || '    AND (recur_parent_type=''$1'')'
                  || '    AND ([table]_id!=recur_parent_id));';

    _delparentstmt := 'DELETE FROM [fulltable] USING recur'
                   || ' WHERE (NOT ([done])'
                   || '    AND ([schedcol]>''$2'')'
                   || '    AND ([table]_recurring_[table]_id=recur_parent_id)'
                   || '    AND (recur_parent_type=''$1'')'
                   || '    AND ([table]_id=recur_parent_id));';

  ELSE
    _delchildstmt := 'SELECT [delfunc]([table]_id)'
                  || '  FROM [fulltable] JOIN recur ON'
                  || '    ([table]_recurring_[table]_id=recur_parent_id'
                  || '     AND recur_parent_type=''$1'')'
                  || ' WHERE (NOT ([done])'
                  || '    AND ([schedcol]>''$2'')'
                  || '    AND ([table]_id!=recur_parent_id));';
    _delparentstmt := 'SELECT [delfunc]([table]_id)'
                   || '  FROM [fulltable] JOIN recur ON'
                   || '    ([table]_recurring_[table]_id=recur_parent_id'
                   || '     AND recur_parent_type=''$1'')'
                   || ' WHERE (NOT ([done])'
                   || '    AND ([schedcol]>''$2'')'
                   || '    AND ([table]_id!=recur_parent_id));';
  END IF;

  _delchildstmt := REPLACE(_delchildstmt, '[fulltable]', _rt.recurtype_table);
  _delchildstmt := REPLACE(_delchildstmt, '[table]',
                            REGEXP_REPLACE(_rt.recurtype_table, E'.*\\.', ''));
  _delchildstmt := REPLACE(_delchildstmt, '[done]',  _rt.recurtype_donecheck);
  _delchildstmt := REPLACE(_delchildstmt, '[schedcol]', _rt.recurtype_schedcol);
  _delchildstmt := REPLACE(_delchildstmt, '[delfunc]',  _rt.recurtype_delfunc);

  _delparentstmt := REPLACE(_delparentstmt, '[fulltable]', _rt.recurtype_table);
  _delparentstmt := REPLACE(_delparentstmt, '[table]',
                            REGEXP_REPLACE(_rt.recurtype_table, E'.*\\.', ''));
  _delparentstmt := REPLACE(_delparentstmt, '[done]',  _rt.recurtype_donecheck);
  _delparentstmt := REPLACE(_delparentstmt, '[schedcol]', _rt.recurtype_schedcol);
  _delparentstmt := REPLACE(_delparentstmt, '[delfunc]',  _rt.recurtype_delfunc);

  IF (_rt.recurtype_delfunc IS NULL) THEN
    -- 8.4+: EXECUTE _delchildstmt  USING pDatetime, pType;
    EXECUTE REPLACE(REPLACE(_delchildstmt, '$1', pType::TEXT),
                                           '$2', pDatetime::TEXT);
    GET DIAGNOSTICS _count = ROW_COUNT;

    IF (pInclParent) THEN
      -- 8.4+: EXECUTE _delparentstmt USING pDatetime, pType;
      EXECUTE REPLACE(REPLACE(_delparentstmt, '$1', pType::TEXT),
                                              '$2', pDatetime::TEXT);
      GET DIAGNOSTICS _tmp   = ROW_COUNT;
      _count := _count + _tmp;
    END IF;

  ELSE
    -- 8.4+: FOR _tmp IN EXECUTE _delchildstmt USING pDatetime, pType LOOP
    FOR _tmp IN EXECUTE REPLACE(REPLACE(_delchildstmt, '$1', pType::TEXT),
                                                       '$2', pDatetime::TEXT)
    LOOP
      IF _tmp < 0 THEN
        RETURN _tmp;
      END IF;
      _count := _count + 1;
    END LOOP;

    IF (pInclParent) THEN
      -- 8.4+: EXECUTE _delparentstmt INTO _tmp USING pDatetime, pType;
      EXECUTE REPLACE(REPLACE(_delparentstmt, '$1', pType::TEXT),
                                              '$2', pDatetime::TEXT) INTO _tmp;
      IF (_tmp < 0) THEN
        RETURN _tmp;
      END IF;
      _count := _count + 1;
    END IF;
  END IF;

  RAISE DEBUG 'deleteOpenrecurringItems() returning %', _count;
  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';
