CREATE OR REPLACE FUNCTION calcWooperStart(INTEGER, INTEGER) RETURNS DATE AS '
DECLARE
  pWoId ALIAS FOR $1;
  pBooitemSeqId ALIAS FOR $2;
  _result DATE;
BEGIN
  SELECT (wo_startdate + booitem_execday - 1) INTO _result
  FROM wo,booitem 
  WHERE ((wo_id=pWoId)
  AND (wo_boo_rev_id=booitem_rev_id)
  AND (booitem_seq_id=pBooitemSeqId));
 
  RETURN _result;
END;
' LANGUAGE 'plpgsql';