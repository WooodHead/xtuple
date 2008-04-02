CREATE OR REPLACE FUNCTION postInvoices(BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pPostUnprinted ALIAS FOR $1;
BEGIN
  RETURN postInvoices(pPostUnprinted, FALSE);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION postInvoices(BOOLEAN, BOOLEAN) RETURNS INTEGER AS '
DECLARE
  pPostUnprinted ALIAS FOR $1;
  pInclZeros	 ALIAS FOR $2;
  _journalNumber INTEGER;
  _counter INTEGER;
  _r RECORD;

BEGIN

  SELECT fetchJournalNumber(''AR-IN'') INTO _journalNumber;

  IF (pInclZeros) THEN
    PERFORM postInvoice(invchead_id, _journalNumber)
    FROM invchead
    WHERE ( (NOT invchead_posted)
     AND (pPostUnprinted OR invchead_printed) );

  ELSE
    PERFORM postInvoice(invchead_id, _journalNumber)
    FROM invchead, invcitem LEFT OUTER JOIN item ON (invcitem_item_id=item_id)  
    WHERE ((invchead_id=invcitem_invchead_id)
      AND  (NOT invchead_posted)
      AND  (pPostUnprinted OR invchead_printed))
    GROUP BY invchead_id 
    HAVING SUM(round((invcitem_billed * invcitem_qty_invuomratio) * (invcitem_price /  
	      CASE WHEN (item_id IS NULL) THEN 1 
	      ELSE invcitem_price_invuomratio END), 2)) > 0;
  END IF;

  RETURN _journalNumber;

END;
' LANGUAGE plpgsql;
