BEGIN;

CREATE OR REPLACE FUNCTION dropEdiProfile() RETURNS INTEGER AS $$
DECLARE
  _result BOOLEAN;
BEGIN
  SELECT (metric_value='PostBooks') INTO _result
    FROM metric
   WHERE(metric_name='Application');

  IF(_result) THEN
    PERFORM dropIfExists('TABLE', 'ediprofile');
  END IF;

  RETURN 0;
  
END;
$$ LANGUAGE 'plpgsql';

SELECT dropEdiProfile();

DROP FUNCTION dropEdiProfile();

COMMIT;
