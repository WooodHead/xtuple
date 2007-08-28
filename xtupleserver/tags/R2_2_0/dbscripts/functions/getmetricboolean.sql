CREATE OR REPLACE FUNCTION getMetricBoolean(TEXT) RETURNS BOOLEAN IMMUTABLE AS '
DECLARE
  _value	TEXT;
BEGIN
  SELECT UPPER(metric_value) INTO _value FROM metric WHERE (metric_name=$1);

  IF (_value = ''T'' OR _value = ''TRUE'') THEN
    RETURN true;
  ELSIF (_value = ''F'' OR _value = ''FALSE'') THEN
    RETURN false;
  END IF;

  RETURN NULL;	-- we just don''t know
END;
' LANGUAGE 'plpgsql';
