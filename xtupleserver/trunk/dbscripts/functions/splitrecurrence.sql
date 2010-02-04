CREATE OR REPLACE FUNCTION splitRecurrence(INTEGER, TEXT, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS $$
DECLARE
  pParentid     ALIAS FOR $1;
  pType         TEXT := UPPER($2);
  pDatetime     TIMESTAMP WITH TIME ZONE := COALESCE($3, CURRENT_TIMESTAMP);

  _newrecurid   INTEGER;
  _newparentid  INTEGER;

BEGIN
  IF (pParentid IS NULL) THEN
    RETURN -11;
  END IF;

  IF (pType = 'TODO') THEN
    SELECT todoitem_id INTO _newparentid
      FROM todoitem
     WHERE ((todoitem_recurring_todoitem_id=pParentid)
        AND (todoitem_completed_date IS NULL)
        AND (todoitem_due_date > pDatetime))
     ORDER BY todoitem_due_date
     LIMIT 1;
  ELSE
    RETURN -10; -- unrecognized pType
  END IF;

  IF (_newparentid = pParentid) THEN
    SELECT recur_id INTO _newrecurid
      FROM recur
     WHERE ((recur_parent_id=pParentid)
        AND (recur_parent_type=pType));

  ELSE
    INSERT INTO recur (recur_parent_id, recur_parent_type, recur_period,
                       recur_freq,      recur_start,       recur_end,
                       recur_max,       recur_data
             ) SELECT _newparentid,     pType,             recur_period,
                      recur_freq,       pDatetime,         recur_end,
                      recur_max,        recur_data
                 FROM recur
                WHERE ((recur_parent_id=pParentid)
                   AND (recur_parent_type=pType))
      RETURNING recur_id INTO _newrecurid;

    UPDATE recur SET recur_end=pDatetime
    WHERE ((recur_parent_id=pParentid)
       AND (recur_parent_type=pType));

    IF (pType = 'TODO') THEN
      UPDATE todoitem SET todoitem_recurring_todoitem_id=_newparentid
       WHERE ((todoitem_recurring_todoitem_id=pParentid)
          AND (todoitem_completed_date IS NULL)
          AND (todoitem_due_date > pDatetime));
    ELSE
      RETURN -10; -- unrecognized pType
    END IF;
  END IF;

  RETURN _newrecurid;
END;
$$ LANGUAGE 'plpgsql';
