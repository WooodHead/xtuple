-- TODO: can we make this general and move to dbscripts/functions?
CREATE OR REPLACE FUNCTION createColumn(pSchema        TEXT,
                                        pTable         TEXT,
                                        pColumn        TEXT,
                                        pType          TEXT,
                                        pDefault       TEXT    = NULL,
                                        pNullable      BOOLEAN = TRUE,
                                        pFtable        TEXT    = NULL,
                                        pFcolumn       TEXT    = NULL
                                        )
RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  _c      RECORD;
  _cmd    TEXT;
BEGIN
  IF (pSchema IS NULL OR pTable IS NULL OR pColumn IS NULL OR
      pType   IS NULL) THEN
    RAISE EXCEPTION 'createColumn() called with NULL for a required argument [xtuple: createColumn, -1, %, %, %, %, %, %, %, %]',
                    pSchema, pTable, pColumn, pType, pDefault, pNullable, pFtable, pFcolumn;
  END IF;
    
  SELECT * INTO _c
    FROM information_schema.columns
   WHERE table_schema = pSchema
     AND table_name   = pTable
     AND column_name  = pColumn;

  IF (NOT FOUND) THEN
    _cmd := 'ALTER TABLE ' || quote_ident(pSchema) || '.' || quote_ident(pTable)
            || ' ADD COLUMN ' || quote_ident(pColumn)
            || ' '            || pType;
    IF (pDefault IS NOT NULL) THEN
      _cmd := _cmd || ' DEFAULT ''' || pDefault || '''';
    END IF;
    IF (NOT pNullable) THEN
      _cmd := _cmd || ' NOT NULL';
    END IF;
    IF (pFtable IS NOT NULL) THEN
      _cmd := _cmd || ' REFERENCES ' || quote_ident(pFtable);
      IF (pFcolumn IS NOT NULL) THEN
        _cmd := _cmd || '(' || quote_ident(pFcolumn) || ')';
      END IF;
    END IF;

    RAISE NOTICE 'createColumn: %', _cmd;

    EXECUTE _cmd;

    RETURN 1;

  ELSE
    -- TODO: handle these cases
    RAISE NOTICE 'createColumn() does not know how to handle these inputs [xtuple: createColumn, -100, %, %, %, %, %, %, %, %]',
                    pSchema, pTable, pColumn, pType, pDefault, pNullable, pFtable, pFcolumn;
    RETURN -1;

  END IF;

  RETURN 0;
END;
$$
LANGUAGE 'plpgsql';
