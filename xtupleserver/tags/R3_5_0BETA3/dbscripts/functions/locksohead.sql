
CREATE OR REPLACE FUNCTION lockSohead(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pSoheadid ALIAS FOR $1;
  _lock RECORD;
  _stat RECORD;

BEGIN

  SELECT soheadlock_sohead_id,
         soheadlock_username,
         soheadlock_procpid
    INTO _lock
    FROM soheadlock
   WHERE (soheadlock_sohead_id=pSoheadid);
  IF (FOUND) THEN
-- Check to see if the lock is being held be an active user
    SELECT usename, procpid
      INTO _stat
      FROM pg_stat_activity
     WHERE ( (datname=current_database())
       AND   (usename=_lock.soheadlock_username)
       AND   (procpid=_lock.soheadlock_procpid) );
    IF (FOUND) THEN
-- Someone else has this record locked
      RETURN FALSE;
    ELSE
-- No currently logged in has this record locked so remove the lock record
-- and let the user requesting this lock continue
      DELETE FROM soheadlock WHERE (soheadlock_sohead_id=pSoheadid);
    END IF;
  END IF;

  INSERT INTO soheadlock VALUES(pSoheadid, CURRENT_USER, pg_backend_pid());

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';

