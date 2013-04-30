CREATE OR REPLACE FUNCTION insertAutoVersionUpdate() RETURNS INTEGER AS $$
DECLARE
  _result INTEGER;

BEGIN
  SELECT metric_id INTO _result
  FROM metric
  WHERE metric_name='AutoVersionUpdate';

  IF (NOT FOUND) THEN
    INSERT INTO metric (metric_name, metric_value) values ('AutoVersionUpdate', 't');
  END IF;

  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT insertAutoVersionUpdate();
DROP FUNCTION insertAutoVersionUpdate();
