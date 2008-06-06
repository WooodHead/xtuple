
CREATE OR REPLACE FUNCTION reportBatchItemError(INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pBatchid ALIAS FOR $1;
  pExitStatus ALIAS FOR $2;

BEGIN

  UPDATE batch
  SET batch_completed=CURRENT_TIMESTAMP,
      batch_exitstatus=pExitStatus
  WHERE (batch_id=pBatchid);

  RETURN pBatchid;

END;
' LANGUAGE 'plpgsql';

