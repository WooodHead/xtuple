ALTER TABLE period ADD COLUMN period_number INTEGER;

CREATE OR REPLACE FUNCTION numberPeriods() RETURNS BOOLEAN AS $$
DECLARE
 _y RECORD;
 _p RECORD;
 _n INTEGER := 1;

BEGIN

  FOR _y IN SELECT yearperiod_id FROM yearperiod ORDER BY yearperiod_start
  LOOP

    FOR _p IN 
      SELECT period_id 
      FROM period 
      WHERE period_yearperiod_id = _y.yearperiod_id
      ORDER BY period_start
    LOOP
      UPDATE period SET period_number = _n WHERE period_id = _p.period_id;
      _n := _n + 1;
    END LOOP;

    _n := 1;
  END LOOP;

  RETURN true;

END;
$$ LANGUAGE 'plpgsql';

SELECT numberPeriods();
SELECT dropIfExists('FUNCTION', 'numberPeriods()');

ALTER TABLE period ALTER COLUMN period_number SET NOT NULL;
