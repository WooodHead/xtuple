CREATE OR REPLACE FUNCTION FetchMetricValue(text) RETURNS NUMERIC AS '
DECLARE
  _pMetricName ALIAS FOR $1;
  _returnVal INTEGER;
BEGIN
  SELECT metric_value::INTEGER INTO _returnVal
    FROM metric
   WHERE metric_name = _pMetricName;
  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';
