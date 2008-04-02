
CREATE OR REPLACE FUNCTION numOfDatabaseUsers() RETURNS INTEGER AS '
DECLARE
  _count INTEGER;

BEGIN

  SELECT COUNT(*) INTO _count
  FROM pg_stat_activity
  WHERE (datid IN ( SELECT datid
                    FROM pg_stat_activity
                    WHERE (procpid=pg_backend_pid()) ) );
  IF (_count IS NULL) THEN
    _count := 0;
  END IF;

  RETURN _count;

END;
' LANGUAGE 'plpgsql';

