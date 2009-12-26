CREATE OR REPLACE FUNCTION postItemlocSeries(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pItemlocseries ALIAS FOR $1;
  _result INTEGER;

BEGIN

  PERFORM postIntoTrialBalance(itemlocpost_glseq)
  FROM itemlocpost
  WHERE (itemlocpost_itemlocseries=pItemlocseries);
  
  PERFORM postInvHist(invhist_id)
  FROM invhist
    JOIN itemsite ON (invhist_itemsite_id=itemsite_id)
  WHERE ( (invhist_series=pItemlocseries)
  AND ( NOT invhist_posted) 
  AND ( NOT itemsite_freeze) );

  DELETE FROM itemlocpost WHERE (itemlocpost_itemlocseries=pItemlocseries);

  RETURN TRUE;
  
END;
' LANGUAGE 'plpgsql';

