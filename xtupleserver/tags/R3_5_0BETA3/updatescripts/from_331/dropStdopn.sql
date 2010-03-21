BEGIN;

CREATE OR REPLACE FUNCTION dropStdopnTable() RETURNS BOOLEAN AS $$
BEGIN
  IF((SELECT metric_value != 'Manufacturing' FROM metric WHERE metric_name = 'Application')) THEN
    PERFORM dropIfExists('TABLE', 'stdopn');
    RETURN true;
  END IF;
  RETURN false;
END;
$$ LANGUAGE 'plpgsql';

SELECT dropStdopnTable();

COMMIT;

