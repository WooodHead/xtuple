CREATE OR REPLACE FUNCTION fixRecurringInvoicesFromBeta1upgrade() RETURNS INTEGER AS $$
DECLARE
  _c            RECORD;
  _p            RECORD;
  _result       INTEGER := 0;
  _tmpdate      DATE;
BEGIN
  FOR _p IN SELECT invchead_id, invchead_cust_id, invchead_recurring,
                   invchead_recurring_interval,   invchead_recurring_type,
                   invchead_invcdate,             invchead_invcnumber,
                   invoicetotal(invchead_id) AS total
              FROM invchead
             WHERE (invchead_id IN (SELECT recur_parent_id
                                     FROM recur
                                    WHERE recur_parent_type='I'))
               -- AND (invchead_recurring_invchead_id IS NULL)
  LOOP
    RAISE DEBUG 'setting recurring invchead_id for % (%)',
                _p.invchead_invcnumber, _p.invchead_id;

    UPDATE invchead
       SET invchead_recurring_invchead_id=invchead_id
     WHERE (invchead_id=_p.invchead_id);

    IF (_p.invchead_recurring_interval IS NULL OR
        _p.invchead_recurring_type IS NULL) THEN
      RAISE DEBUG 'looking at recur table for period and freq';
      SELECT recur_period, recur_freq
        INTO _p.invchead_recurring_type, _p.invchead_recurring_interval
        FROM recur
       WHERE (recur_parent_id=_p.invchead_id)
         AND (recur_parent_type='I');

      IF (_p.invchead_recurring_interval IS NULL) THEN
        RAISE DEBUG 'arbitrarily choosing freq of 1';
        _p.invchead_recurring_interval := 1;
      END IF;
      IF (_p.invchead_recurring_type IS NULL) THEN
        RAISE DEBUG 'arbitrarily choosing period of M';
        _p.invchead_recurring_type := 'M';
      END IF;

    END IF;

    FOR _c IN SELECT invchead_id, invchead_invcdate, invchead_invcnumber
                FROM invchead
               WHERE ((invchead_cust_id=_p.invchead_cust_id)
                  AND (invoicetotal(invchead_id)=_p.total)
                  AND (invchead_id!=_p.invchead_id)
                  AND (invchead_recurring_invchead_id IS NULL)
                  AND (invchead_invcdate >= _p.invchead_invcdate)
                  AND NOT invchead_recurring)
    LOOP
      RAISE DEBUG 'is % (%) a child of % (%)? % %',
                  _c.invchead_invcnumber, _c.invchead_invcdate,
                  _p.invchead_invcnumber, _p.invchead_invcdate,
                  _p.invchead_recurring_type, _p.invchead_recurring_interval;

      _tmpdate := _p.invchead_invcdate;
      WHILE _tmpdate < _c.invchead_invcdate LOOP
        IF (_p.invchead_recurring_type = 'M') THEN
          _tmpdate := _tmpdate +
                      CAST(CAST(_p.invchead_recurring_interval AS TEXT) ||
                           ' month' AS interval);
        ELSIF (_p.invchead_recurring_type = 'Y') THEN
          _tmpdate := _tmpdate +
                      CAST(CAST(_p.invchead_recurring_interval AS TEXT) ||
                           ' year' AS interval);
        ELSIF (_p.invchead_recurring_type = 'W') THEN
          _tmpdate := _tmpdate +
                      CAST(CAST(_p.invchead_recurring_interval AS TEXT) ||
                           ' week' AS interval);
        ELSE
          EXIT;
        END IF;
      END LOOP;
      
      IF (_c.invchead_invcdate = _tmpdate) THEN
        UPDATE invchead SET invchead_recurring_invchead_id=_p.invchead_id
         WHERE invchead_id=_c.invchead_id;
        _result := _result + 1;
        RAISE DEBUG 'YES';
      ELSE
        RAISE DEBUG 'No: child % != calculated %', _c.invchead_invcdate, _tmpdate;
      END IF;
    END LOOP;
  END LOOP;

  RAISE DEBUG 'Returning %', _result;
  RETURN _result;
END;
$$
LANGUAGE 'plpgsql';

SELECT fixRecurringInvoicesFromBeta1upgrade();

SELECT dropIfExists('FUNCTION', 'fixRecurringInvoicesFromBeta1upgrade()', 'public');
