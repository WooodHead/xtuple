
CREATE OR REPLACE FUNCTION completeBatchItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pBatchid ALIAS FOR $1;

BEGIN

  UPDATE batch
  SET batch_completed=CURRENT_TIMESTAMP
  WHERE (batch_id=pBatchid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION completeBatchItem(INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pBatchid ALIAS FOR $1;
  pExitStatus ALIAS FOR $2;
  _r RECORD;
  _reschedule TIMESTAMP;

BEGIN

  SELECT batch_reschedinterval, batch_scheduled INTO _r
  FROM batch
  WHERE (batch_id=pBatchid);
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  _reschedule := _r.batch_scheduled;

  IF (_r.batch_reschedinterval IN (''D'', ''W'', ''M'')) THEN
    LOOP
      IF (_r.batch_reschedinterval = ''D'') THEN
        _reschedule := (_reschedule + INTERVAL ''1 day'');
      ELSIF (_r.batch_reschedinterval = ''W'') THEN
        _reschedule := (_reschedule + INTERVAL ''1 week'');
      ELSIF (_r.batch_reschedinterval = ''M'') THEN
        _reschedule := (_reschedule + INTERVAL ''1 month'');
      END IF;

      EXIT WHEN (_reschedule > CURRENT_TIMESTAMP);
    END LOOP;

    PERFORM copyBatchItem(pBatchid, _reschedule);
  END IF;

  UPDATE batch
  SET batch_completed=CURRENT_TIMESTAMP,
      batch_exitstatus=pExitStatus
  WHERE (batch_id=pBatchid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

