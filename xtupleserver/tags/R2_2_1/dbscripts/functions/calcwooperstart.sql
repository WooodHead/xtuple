CREATE OR REPLACE FUNCTION calcWooperStart(INTEGER, INTEGER) RETURNS DATE AS '
DECLARE
  pWoId ALIAS FOR $1;
  pBooitemId ALIAS FOR $2;
  _result DATE;
BEGIN
  SELECT (wo_startdate + booitem_execday - 1) INTO _result
  FROM wo,booitem 
  WHERE ((wo_id=pWoId)
  AND (booitem_id=pBooitemId));
 
  RETURN _result;
END;
' LANGUAGE 'plpgsql';