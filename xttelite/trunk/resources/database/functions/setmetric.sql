-- Function: te.setmetric(text, text)

-- DROP FUNCTION te.setmetric(text, text);

CREATE OR REPLACE FUNCTION te.setmetric(text, text)
  RETURNS boolean AS
$BODY$
DECLARE
  pMetricName ALIAS FOR $1;
  pMetricValue ALIAS FOR $2;
  _metricid INTEGER;

BEGIN

  SELECT metric_id INTO _metricid
  FROM te.temetric
  WHERE (metric_name=pMetricName);

  IF (FOUND) THEN
    UPDATE te.temetric
    SET metric_value=pMetricValue
    WHERE (metric_id=_metricid);

  ELSE
    INSERT INTO te.temetric
    (metric_name, metric_value)
    VALUES (pMetricName, pMetricValue);
  END IF;

  RETURN TRUE;

END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;
ALTER FUNCTION te.setmetric(text, text) OWNER TO "admin";
