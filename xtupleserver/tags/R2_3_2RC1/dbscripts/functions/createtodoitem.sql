
CREATE OR REPLACE FUNCTION createTodoItem(INTEGER, TEXT, TEXT, INTEGER, DATE, DATE, CHARACTER(1), DATE, DATE, INTEGER, TEXT) RETURNS INTEGER AS '
BEGIN
  RETURN createTodoItem($1, $2, $3, $4, NULL, NULL, $5, $6, $7, $8, $9, $10, $11);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createTodoItem(INTEGER, TEXT, TEXT, INTEGER, INTEGER, DATE, DATE, CHARACTER(1), DATE, DATE, INTEGER, TEXT) RETURNS INTEGER AS '
BEGIN
  RETURN createTodoItem($1, $2, $3, $4, $5, NULL, $6, $7, $8, $9, $10, $11, $12);
END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION createTodoItem(INTEGER, TEXT, TEXT, INTEGER, INTEGER, INTEGER, DATE, DATE, CHARACTER(1), DATE, DATE, INTEGER, TEXT) RETURNS INTEGER AS '
  DECLARE
    pusrid      ALIAS FOR  $1;
    pname       ALIAS FOR  $2;
    pdesc       ALIAS FOR  $3;
    pincdtid    ALIAS FOR  $4;
    pcrmacctid  ALIAS FOR  $5;
    pOpheadid   ALIAS FOR  $6;
    pstarted    ALIAS FOR  $7;
    pdue        ALIAS FOR  $8;
    pstatus     ALIAS FOR  $9;
    passigned   ALIAS FOR $10;
    pcompleted  ALIAS FOR $11;
    pseq        ALIAS FOR $12;
    pnotes      ALIAS FOR $13;

    _seq        INTEGER         := pseq;
    _curr       INTEGER; -- todoitem_id for this user with same seq value
    _max        INTEGER;
    _status     CHARACTER(1)    := pstatus;
    _incdtid    INTEGER         := pincdtid;
    _crmacctid  INTEGER         := pcrmacctid;
    _opheadid   INTEGER         := pOpheadid;
    _assigned   DATE            := passigned;
    _result     INTEGER;

  BEGIN
    IF (pusrid IS NULL OR pusrid <= 0) THEN
      RETURN -1;
    END IF;

    IF (pname IS NULL OR pname = '''') THEN
      RETURN -2;
    END IF;

    IF (pdue IS NULL) THEN
      RETURN -3;
    END IF;

    IF (pcompleted IS NOT NULL) THEN
      _status := ''C'';
    ELSIF (pstatus IS NULL AND pstarted IS NOT NULL) THEN
      _status := ''I'';
    ELSIF (pstatus IS NULL) THEN
      _status := ''N'';
    END IF;

    IF (_incdtid <= 0) THEN
      _incdtid := NULL;
    END IF;

    IF (_crmacctid <= 0) THEN
      _crmacctid := NULL;
    END IF;

    IF (_opheadid <= 0) THEN
      _opheadid := NULL;
    END IF;

    IF (_assigned IS NULL) THEN
      _assigned := CURRENT_DATE;
    END IF;

    IF (_seq IS NULL) THEN
      SELECT max(todoitem_seq) INTO _max
      FROM todoitem
      WHERE (todoitem_usr_id=pusrid);
      IF (_max IS NULL) THEN
        _seq := 1;
      ELSE
        _seq := _max + 1;
      END IF;
    END IF;
    IF (_seq < 1) THEN
      _seq := 1;
    END IF;

    SELECT todoitem_id INTO _curr
    FROM todoitem
    WHERE ((todoitem_usr_id=pusrid)
      AND  (todoitem_seq=_seq));
    IF FOUND THEN
      PERFORM todoitemMove(_curr, 1);
    END IF;

    INSERT INTO todoitem ( todoitem_usr_id, todoitem_name,
                           todoitem_description, todoitem_incdt_id,
                           todoitem_creator_username, todoitem_status,
                           todoitem_active, todoitem_start_date,
                           todoitem_due_date, todoitem_assigned_date,
                           todoitem_completed_date, todoitem_seq,
                           todoitem_notes, todoitem_crmacct_id,
                           todoitem_ophead_id
                ) VALUES ( pusrid, pname,
                           pdesc, _incdtid,
                           CURRENT_USER, _status,
                           TRUE, pstarted,
                           pdue, _assigned,
                           pcompleted, _seq, pnotes, _crmacctid, _opheadid );

    RETURN CURRVAL(''todoitem_todoitem_id_seq'');
  END;
' LANGUAGE 'plpgsql';

