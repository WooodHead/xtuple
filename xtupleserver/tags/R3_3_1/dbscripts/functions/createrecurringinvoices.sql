CREATE OR REPLACE FUNCTION createRecurringInvoices() RETURNS INTEGER AS $$
DECLARE
  _count INTEGER := 0;
  _iteration INTEGER;
  _interval TEXT;
  _cutoffDate DATE;
  _lastDate DATE;
  _nextDate DATE;
  _i RECORD;
  _id INTEGER;
BEGIN
  SELECT CURRENT_DATE + CAST(metric_value AS INTEGER)
    INTO _cutoffDate
    FROM metric
   WHERE(metric_name='RecurringInvoiceBuffer');
  IF(_cutoffDate IS NULL) THEN
    _cutoffDate := CURRENT_DATE;
  END IF;

  FOR _i IN SELECT *
              FROM invchead
             WHERE((invchead_recurring)
               AND (COALESCE(invchead_recurring_until, endOfTime())>=CURRENT_DATE)) LOOP
    _iteration := 0;

    IF(upper(_i.invchead_recurring_type)='Y') THEN
      _interval := ' year';
    ELSIF(upper(_i.invchead_recurring_type)='M') THEN
      _interval := ' month';
    ELSIF(upper(_i.invchead_recurring_type)='W') THEN
      _interval := ' week';
    ELSIF(upper(_i.invchead_recurring_type)='D') THEN
      _interval := ' days';
    ELSE
      RAISE EXCEPTION 'Invalid interval type on invoice %', _i.invchead_invcnumber;
    END IF;

    IF(COALESCE(_i.invchead_recurring_interval, 0) <= 0) THEN
      RAISE EXCEPTION 'Invalid interval value on invoice %', _i.invchead_invcnumber;
    END IF;

-- Get the last date a recurring invocie was generated
    SELECT invchead_invcdate
      INTO _lastDate
      FROM invchead
     WHERE(invchead_recurring_invchead_id=_i.invchead_id)
     ORDER BY invchead_invcdate DESC
     LIMIT 1;
    IF(_lastDate IS NULL) THEN
      _lastDate := _i.invchead_invcdate;
    END IF;

    LOOP
      _iteration := _iteration + 1;
      SELECT _i.invchead_invcdate + CAST((_i.invchead_recurring_interval * _iteration) || _interval AS INTERVAL)
        INTO _nextDate;

      EXIT WHEN (_nextDate > _cutoffDate) OR (_nextDate > COALESCE(_i.invchead_recurring_until, endOfTime()));

      IF(_nextDate > _lastDate) THEN
        _id := copyInvoice(_i.invchead_id, _nextDate);
        IF(_id > 0) THEN
          UPDATE invchead
             SET invchead_recurring_invchead_id=_i.invchead_id
           WHERE(invchead_id=_id);
          _count := _count + 1;
        END IF;
      END IF;
    END LOOP;
  END LOOP;

  RETURN _count;
END;
$$ LANGUAGE 'plpgsql';

