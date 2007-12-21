
CREATE OR REPLACE FUNCTION rescheduleBatchItem(INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pBatchid ALIAS FOR $1;
  pScheduled ALIAS FOR $2;

BEGIN

  UPDATE batch
  SET batch_scheduled=pScheduled,
      batch_started=NULL,
      batch_completed=NULL
  WHERE (batch_id=pBatchid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION rescheduleBatchItem(INTEGER, TIMESTAMP WITH TIME ZONE, CHARACTER) RETURNS INTEGER AS '
DECLARE
  pBatchid ALIAS FOR $1;
  pScheduled ALIAS FOR $2;
  pInterval ALIAS FOR $3;

BEGIN

  UPDATE batch
  SET batch_scheduled=pScheduled,
      batch_reschedinterval=pInterval,
      batch_started=NULL,
      batch_completed=NULL
  WHERE (batch_id=pBatchid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

