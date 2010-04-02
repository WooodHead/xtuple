CREATE OR REPLACE FUNCTION deleteOpenRecurringItems(INTEGER, TEXT, TIMESTAMP WITH TIME ZONE, BOOLEAN) RETURNS INTEGER AS $$
DECLARE
  pParentid     ALIAS FOR $1;
  pType         TEXT                     := UPPER($2);
  pDatetime     TIMESTAMP WITH TIME ZONE := COALESCE($3, startOfTime());
  pInclParent   BOOLEAN                  := COALESCE($4, FALSE);

  _count        INTEGER := 0;
  _tmp          INTEGER;
BEGIN
  IF (pParentid IS NULL) THEN
    RETURN -11;
  END IF;

  RAISE DEBUG 'deleteOpenRecurringItems(%, %, %)', pParentid, pType, pDatetime;
  IF (pType = 'TODO') THEN
    DELETE FROM todoitem
          USING recur
     WHERE ((todoitem_completed_date IS NULL)
        AND (todoitem_due_date >= pDatetime)
        AND (todoitem_recurring_todoitem_id=recur_parent_id)
        AND (recur_parent_type='TODO')
        AND (todoitem_id!=recur_parent_id));
    GET DIAGNOSTICS _count = ROW_COUNT;

    -- separate delete to avoid problems with reparenting if parent deleted first
    IF (pInclParent) THEN
      DELETE FROM todoitem
            USING recur
       WHERE ((todoitem_completed_date IS NULL)
          AND (todoitem_due_date >= pDatetime)
          AND (todoitem_recurring_todoitem_id=recur_parent_id)
          AND (recur_parent_type='TODO')
          AND (todoitem_id=recur_parent_id));
      GET DIAGNOSTICS _tmp = ROW_COUNT;
      _count := _count + _tmp;
    END IF;

  ELSIF (pType = 'INCDT') THEN
    FOR _tmp IN SELECT deleteIncident(incdt_id)
                  FROM incdt
                  JOIN recur ON (incdt_recurring_incdt_id=recur_parent_id
                             AND recur_parent_type='INCDT')
                 WHERE ((incdt_status='N')
                    AND (incdt_timestamp >= pDatetime)
                    AND (incdt_id!=recur_parent_id)) LOOP
      IF _tmp < 0 THEN
        RETURN _tmp;
      END IF;
      _count := _count + 1;
    END LOOP;

    -- separate delete to avoid problems with reparenting if parent deleted first
    IF (pInclParent) THEN
      SELECT deleteIncident(incdt_id) INTO _tmp
        FROM incdt
        JOIN recur ON (incdt_recurring_incdt_id=recur_parent_id
                       AND recur_parent_type='INCDT')
       WHERE ((incdt_status='N')
          AND (incdt_timestamp >= pDatetime));
      IF (_tmp < 0) THEN
        RETURN _tmp;
      END IF;
      _count := _count + 1;
    END IF;

  ELSIF (pType = 'J') THEN
    DELETE FROM prj
          USING recur
     WHERE ((prj_completed_date IS NULL)
        AND (prj_due_date >= pDatetime)
        AND (prj_recurring_prj_id=recur_parent_id)
        AND (recur_parent_type='J')
        AND (prj_id!=recur_parent_id));
    GET DIAGNOSTICS _count = ROW_COUNT;

    -- separate delete to avoid problems with reparenting if parent deleted first
    IF (pInclParent) THEN
      DELETE FROM prj
            USING recur
       WHERE ((prj_completed_date IS NULL)
          AND (prj_due_date >= pDatetime)
          AND (prj_recurring_prj_id=recur_parent_id)
          AND (recur_parent_type='J')
          AND (prj_id=recur_parent_id));
      GET DIAGNOSTICS _tmp = ROW_COUNT;
      _count := _count + _tmp;
    END IF;

  ELSE
    RETURN -10; -- pType not handled
  END IF;

  RAISE DEBUG 'deleteOpenrecurringItems() returning %', _count;
  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';
