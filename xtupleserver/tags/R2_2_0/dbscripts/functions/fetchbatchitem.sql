
CREATE OR REPLACE FUNCTION fetchBatchItem() RETURNS INTEGER AS '
DECLARE
  _batchid INTEGER;

BEGIN

  SELECT batch_id INTO _batchid
  FROM batch
  WHERE ( (batch_started IS NULL)
   AND (batch_scheduled <= (CURRENT_TIMESTAMP - ''5 seconds''::interval)) )
  ORDER BY batch_scheduled
  LIMIT 1;

  IF (FOUND) THEN
    UPDATE batch
    SET batch_started=CURRENT_TIMESTAMP
    WHERE (batch_id=_batchid);
  ELSE
    _batchid := -1;
  END IF;

  RETURN _batchid;

END;
' LANGUAGE 'plpgsql';

