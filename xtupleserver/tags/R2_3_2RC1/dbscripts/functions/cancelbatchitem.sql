
CREATE OR REPLACE FUNCTION cancelBatchItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pBatchid ALIAS FOR $1;

BEGIN

  DELETE FROM batch
  WHERE (batch_id=pBatchid);

  DELETE FROM batchparam
  WHERE (batchparam_batch_id=pBatchid);

  RETURN 1;

END;
' LANGUAGE 'plpgsql';

