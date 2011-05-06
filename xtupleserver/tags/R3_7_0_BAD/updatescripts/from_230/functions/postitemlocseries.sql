CREATE OR REPLACE FUNCTION postItemlocSeries(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pItemlocseries ALIAS FOR $1;
  _result INTEGER;

BEGIN

  PERFORM postIntoTrialBalance(itemlocpost_glseq)
  FROM itemlocpost
  WHERE (itemlocpost_itemlocseries=pItemlocseries);

  DELETE FROM itemlocpost WHERE (itemlocpost_itemlocseries=pItemlocseries);

  RETURN TRUE;
  
END;
' LANGUAGE 'plpgsql';

