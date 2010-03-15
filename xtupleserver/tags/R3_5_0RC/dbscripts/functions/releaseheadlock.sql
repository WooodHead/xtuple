CREATE OR REPLACE FUNCTION releaseHeadLock(TEXT, INTEGER) RETURNS BOOLEAN AS '
DECLARE
  ptable	ALIAS FOR $1;
  pheadid	ALIAS FOR $2;

BEGIN
  DELETE FROM headlock
   WHERE ( (headlock_head_id=pheadid)
     AND   (headlock_table=ptable)
     AND   (headlock_username=CURRENT_USER)
     AND   (headlock_procpid=pg_backend_pid()) );

  RETURN TRUE;
END;
' LANGUAGE 'plpgsql';
