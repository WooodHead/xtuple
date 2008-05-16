CREATE OR REPLACE FUNCTION lockHead(TEXT, INTEGER) RETURNS BOOLEAN AS '
DECLARE
  ptable	ALIAS FOR $1;
  pheadid	ALIAS FOR $2;
  _lock		RECORD;
  _stat		RECORD;

BEGIN

  SELECT headlock_head_id,
         headlock_username,
         headlock_procpid
    INTO _lock
    FROM headlock
   WHERE ((headlock_head_id=pheadid)
     AND  (headlock_table=ptable));

  IF (FOUND) THEN
-- Check to see if the lock is being held be an active user
    SELECT usename, procpid
      INTO _stat
      FROM pg_stat_activity
     WHERE ( (datname=current_database())
       AND   (usename=_lock.headlock_username)
       AND   (procpid=_lock.headlock_procpid) );
    IF (FOUND) THEN
-- Someone else has this record locked
      RETURN FALSE;
    ELSE
-- No currently logged in has this record locked so remove the lock record
-- and let the user requesting this lock continue
      DELETE FROM headlock
      WHERE ((headlock_head_id=pheadid)
       AND   (headlock_table=ptable));
    END IF;
  END IF;

  INSERT INTO headlock (headlock_table, headlock_head_id,
			headlock_username, headlock_procpid
	      ) VALUES (ptable, pheadid,
			CURRENT_USER, pg_backend_pid());

  RETURN TRUE;

END;
' LANGUAGE 'plpgsql';
