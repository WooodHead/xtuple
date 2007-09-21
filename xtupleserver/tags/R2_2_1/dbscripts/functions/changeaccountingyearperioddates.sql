
CREATE OR REPLACE FUNCTION changeAccountingYearPeriodDates(INTEGER, DATE, DATE) RETURNS INTEGER AS '
DECLARE
  pPeriodid ALIAS FOR $1;
  pStartDate ALIAS FOR $2;
  pEndDate ALIAS FOR $3;
  _check INTEGER;
  _r RECORD;

BEGIN

--  Check to make sure that the passed yearperiod is not closed
  IF ( ( SELECT yearperiod_closed
         FROM yearperiod
         WHERE (yearperiod_id=pPeriodid) ) ) THEN
    RETURN -1;
  END IF;

--  Check to make sure that the passed start date does not fall
--  into another yearperiod
  SELECT yearperiod_id INTO _check
  FROM yearperiod
  WHERE ( (pStartDate BETWEEN yearperiod_start AND yearperiod_end)
    AND (yearperiod_id <> pPeriodid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -2;
  END IF;

--  Check to make sure that the passed end date does not fall
--  into another yearperiod
  SELECT yearperiod_id INTO _check
  FROM yearperiod
  WHERE ( (pEndDate BETWEEN yearperiod_start AND yearperiod_end)
    AND (yearperiod_id <> pPeriodid) )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -3;
  END IF;

--  Alter the start and end dates of the pass period
  UPDATE yearperiod
  SET yearperiod_start=pStartDate, yearperiod_end=pEndDate
  WHERE (yearperiod_id=pPeriodid);

--  All done
  RETURN 1;

END;
' LANGUAGE 'plpgsql';

