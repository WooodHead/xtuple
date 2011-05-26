BEGIN;

CREATE OR REPLACE FUNCTION changeGroup() RETURNS INTEGER AS $$
DECLARE
  result TEXT;
BEGIN
  SELECT groname
    INTO result
    FROM pg_group
   WHERE(groname = 'xtrole');
  IF(NOT FOUND) THEN
    EXECUTE 'CREATE GROUP xtrole;';
    EXECUTE 'GRANT xtrole TO openmfg;';
  END IF;
  RETURN 0;
END;
$$ LANGUAGE 'plpgsql';

SELECT changeGroup();
SELECT fixACL();

DROP FUNCTION changeGroup();

COMMIT;

