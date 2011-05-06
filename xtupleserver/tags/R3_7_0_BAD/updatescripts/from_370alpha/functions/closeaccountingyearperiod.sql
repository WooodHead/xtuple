
CREATE OR REPLACE FUNCTION closeAccountingYearPeriod(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pYearPeriodid ALIAS FOR $1;
  _r RECORD;
  _n RECORD;
  _c RECORD;
  _beginningPeriodid INTEGER;
  _trialbalid INTEGER;
  _accntid INTEGER;
  _totalProfitLoss      NUMERIC;
  _periodid INTEGER;
  _forwardupdate INTEGER;
BEGIN

--  Check to make sure that the yearperiod is not already closed
  IF ( ( SELECT yearperiod_closed
           FROM yearperiod
          WHERE (yearperiod_id=pYearPeriodid) ) ) THEN
    RETURN -1;
  END IF;

  IF ( ( SELECT (count(period_id) > 0)
           FROM period
          WHERE ((period_yearperiod_id=pYearPeriodid)
           AND (NOT period_closed)) ) ) THEN
    RETURN -10;
  END IF;

  IF ( ( SELECT (count(yearperiod_id) > 0)
           FROM yearperiod
          WHERE ((yearperiod_end< (
            SELECT yearperiod_end 
            FROM yearperiod 
            WHERE (yearperiod_id=pYearPeriodId))
          )
           AND (NOT yearperiod_closed)) ) ) THEN
    RETURN -11;
  END IF;

--  Should we check for a previous yearperiod existing already ?
--  If so then we should return -2 if one does not.

--  If we did the previous yearperiod we should check to make sure that
--  it is also closed. Returning -3 if it is not.

--  First thing we need to do is to get the yearperiod

  SELECT * INTO _r FROM yearperiod where yearperiod_id = pYearPeriodid;

  IF (NOT FOUND) THEN
    RETURN -6;
  END IF;

--  Now we need to find the next yearperiod

  SELECT * INTO _n FROM yearperiod WHERE yearperiod_start = _r.yearperiod_end + interval '1 day';

  IF (NOT FOUND) THEN
    RETURN -4;
  END IF;

--  Make sure that the user is not trying to prematurely close the YearPeriod
  IF ( ( SELECT (yearperiod_end >= CURRENT_DATE)
           FROM yearperiod
          WHERE (yearperiod_id=pYearPeriodid) ) ) THEN
    RETURN -5;
  END IF;

--  Now we have to find where to stick the end of year data

  SELECT period_id INTO _periodid FROM period WHERE period_start = _n.yearperiod_start;

  IF (NOT FOUND) THEN
    RETURN -8;
  END IF;

--  Loop through companies and process each one

  FOR _c IN
    SELECT company_number, company_yearend_accnt_id
    FROM company
  LOOP
  --  Calculate the profit-loss for the year that we are closing

    SELECT SUM(gltrans_amount) INTO _totalProfitLoss
     FROM gltrans, accnt
     WHERE ( (gltrans_accnt_id = accnt_id)
       AND   (accnt_type IN ( 'R', 'E' ) )
       AND   (accnt_company = _c.company_number)
       AND   (gltrans_date between _r.yearperiod_start and _r.yearperiod_end ) );
    IF(_totalProfitLoss IS NULL) THEN
      _totalProfitLoss := 0;
    END IF;

  -- Get the trailbal_id

    SELECT trialbal_id INTO _trialbalid
      FROM trialbal
        JOIN accnt ON (trialbal_accnt_id=accnt_id)
     WHERE ( (trialbal_period_id = _periodid )
       AND   (trialbal_accnt_id = _c.company_yearend_accnt_id) );

    IF (NOT FOUND) THEN
      -- Create a trial balance record
      SELECT NEXTVAL('trialbal_trialbal_id_seq') INTO _trialbalid;
      INSERT INTO trialbal
        ( trialbal_id, trialbal_accnt_id, trialbal_period_id,
          trialbal_beginning, trialbal_dirty,
          trialbal_ending,
          trialbal_credits,
          trialbal_debits,
          trialbal_yearend )
      VALUES
        ( _trialbalid, _c.company_yearend_accnt_id, _periodid,
          _totalProfitLoss, TRUE,
          _totalProfitLoss,
          0,
          0,
          _totalProfitLoss );
    ELSE
      -- Lets do the update for the trialbal
      UPDATE trialbal
         SET trialbal_beginning = trialbal_beginning - trialbal_yearend + _totalProfitLoss,
             trialbal_yearend = _totalProfitLoss
       WHERE trialbal_id = _trialbalid;
    END IF;


  -- Now the forward update

    SELECT forwardupdatetrialbalance(_trialbalid) INTO _forwardupdate;

  END LOOP;

  UPDATE yearperiod
    SET yearperiod_closed = TRUE
  WHERE yearperiod_id = pYearPeriodid;

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';

