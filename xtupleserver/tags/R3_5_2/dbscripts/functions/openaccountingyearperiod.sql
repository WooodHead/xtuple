
CREATE OR REPLACE FUNCTION openAccountingYearPeriod(INTEGER) RETURNS INTEGER AS '
DECLARE
  pPeriodid ALIAS FOR $1;
  _r RECORD;

BEGIN

--  Check to make use that the yearperiod is closed
  IF ( ( SELECT (NOT yearperiod_closed)
         FROM yearperiod
         WHERE (yearperiod_id=pPeriodid) ) ) THEN
    RETURN -1;
  END IF;

--  Reset the yearperiod_closed flag
  UPDATE yearperiod
  SET yearperiod_closed=FALSE
  WHERE (yearperiod_id=pPeriodid);

  RETURN pPeriodid;

END;
' LANGUAGE 'plpgsql';

