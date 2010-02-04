CREATE OR REPLACE FUNCTION createRecurringItems(INTEGER, TEXT) RETURNS INTEGER AS $$
DECLARE
  pParentid  ALIAS FOR $1;      -- if NULL then all items with the given pType
  pType      TEXT := UPPER($2); -- if NULL then all types
                                -- if both are null then all items of all types
  _count     INTEGER := 0;
  _id        INTEGER;
  _interval  TEXT;
  _existcnt  INTEGER;
  _last      TIMESTAMP WITH TIME ZONE;
  _max       INTEGER := CAST(fetchMetricValue('RecurringInvoiceBuffer') AS INTEGER);
  _next      TIMESTAMP WITH TIME ZONE;
  _r         RECORD;

BEGIN
  
  -- TODO: special case for now
  IF (pType = 'INVOICE') THEN
    RETURN createRecurringInvoices();
  END IF;

  FOR _r IN SELECT *
              FROM recur
             WHERE ((COALESCE(recur_end, endOfTime()) >= CURRENT_TIMESTAMP)
                AND (pParentid IS NULL OR recur_parent_id=pParentid)
                AND (pType IS NULL OR UPPER(recur_parent_type)=pType)) LOOP

    _r.recur_max := COALESCE(_r.recur_max, _max, 1);
    _interval := CASE _r.recur_period WHEN 'Y' THEN ' year'
                                      WHEN 'M' THEN ' month'
                                      WHEN 'W' THEN ' week'
                                      WHEN 'D' THEN ' day'
                                      WHEN 'H' THEN ' hour'
                                      WHEN 'm' THEN ' minute'
                                      ELSE NULL
                 END;

    IF (_interval IS NULL OR COALESCE(_r.recur_freq, 0) <= 0) THEN
      RAISE EXCEPTION 'Unknown recurrence frequency % % ON % %',
                      _r.recur_freq,        _r.recur_period,
                      _r.recur_parent_type, _r.recur_parent_id;
    END IF;

    -- Get the latest recurrence timestamp of the current recurring item
    IF (UPPER(_r.recur_parent_type) = 'TODO') THEN
      SELECT COUNT(*) INTO _existcnt 
        FROM todoitem
       WHERE todoitem_recurring_todoitem_id=_r.recur_parent_id
         AND todoitem_completed_date IS NULL
         AND (checkPrivilege('MaintainOtherTodoList')
              OR (checkPrivilege('MaintainPersonalTodoList') AND
                  CURRENT_USER IN (todoitem_owner_username, todoitem_username))
             );
      SELECT MAX(todoitem_due_date) INTO _last
        FROM todoitem
       WHERE todoitem_recurring_todoitem_id=_r.recur_parent_id
         AND (checkPrivilege('MaintainOtherTodoList')
              OR (checkPrivilege('MaintainPersonalTodoList') AND
                  CURRENT_USER IN (todoitem_owner_username, todoitem_username))
             );

--  ELSIF (UPPER(_r.recur_parent_type) = 'INCDT') THEN
--    _existcnt  := _r.recur_max + 1; -- do nothing yet TODO: write me
    ELSE
      RETURN -10;
    END IF;

    WHILE (_existcnt < _r.recur_max) LOOP
      _next := _last +
               CAST(_r.recur_freq * (_r.recur_max - _existcnt ) || _interval AS INTERVAL);

      IF (_next BETWEEN _r.recur_start AND _r.recur_end) THEN
        _id := CASE _r.recur_parent_type
                 WHEN 'TODO' THEN
                    copyTodoItem(_r.recur_parent_id, CAST(_next AS DATE), NULL)
--                 WHEN 'INCDT' THEN
--                    copyIncdt(_r.recur_parent_id, _next, TRUE)
                 ELSE NULL
               END;
        IF (_id IS NOT NULL) THEN
          _count := _count + 1;
        END IF;
      END IF;

      _existcnt := _existcnt + 1;
    END LOOP;
  END LOOP;

  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';
