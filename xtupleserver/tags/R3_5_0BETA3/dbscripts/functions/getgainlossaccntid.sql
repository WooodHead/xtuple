
CREATE OR REPLACE FUNCTION getGainLossAccntId() RETURNS INTEGER AS '
DECLARE
  _returnVal INTEGER;
BEGIN
  SELECT metric_value::INTEGER INTO _returnVal
    FROM metric
   WHERE metric_name = ''CurrencyGainLossAccount'';
  RETURN _returnVal;
END;
' LANGUAGE 'plpgsql';

