
CREATE OR REPLACE FUNCTION getperiodid(INTEGER,  char) RETURNS SETOF INTEGER AS '
DECLARE
  pPeriodId ALIAS FOR $1;
  pInterval ALIAS FOR $2;
  _x RECORD;
BEGIN

-- Validate Interval
   IF pInterval <> ''M'' AND pInterval <> ''Q'' AND pInterval <> ''Y'' THEN
     RAISE EXCEPTION ''Invalid Interval --> %'', pInterval;
   END IF;

   IF pInterval=''M'' THEN
       RETURN NEXT pPeriodId;
     ELSE IF pInterval=''Q'' THEN
        FOR _x IN SELECT qp.period_id AS period_id
                FROM period cp, period qp
                WHERE ((cp.period_id=pPeriodId)
                AND (cp.period_yearperiod_id=qp.period_yearperiod_id)
                AND (cp.period_quarter=qp.period_quarter)
                AND (cp.period_start>=qp.period_start))
        ORDER BY qp.period_start
        LOOP
                RETURN NEXT _x.period_id;
        END LOOP;
     ELSE
        FOR _x IN SELECT yp.period_id AS period_id
                FROM period cp, period yp
                WHERE ((cp.period_id=pPeriodId)
                AND (cp.period_yearperiod_id=yp.period_yearperiod_id)
                AND (cp.period_start>=yp.period_start))
        ORDER BY yp.period_start
        LOOP
                RETURN NEXT _x.period_id;
        END LOOP;
     END IF;
   END IF;
  RETURN;
END;
' LANGUAGE 'plpgsql';

