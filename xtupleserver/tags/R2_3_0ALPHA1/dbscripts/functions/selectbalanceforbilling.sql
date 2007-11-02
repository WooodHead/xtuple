CREATE OR REPLACE FUNCTION selectBalanceForBilling(INTEGER) RETURNS BOOLEAN AS '
DECLARE
  pSoheadid ALIAS FOR $1;
  _returnval	BOOLEAN := TRUE;
  _soitem RECORD;

BEGIN

  FOR _soitem IN SELECT cust_partialship, coitem_id,
                        SUM(coship_qty) AS qty,
                        ( (SUM(coship_qty) >= (coitem_qtyord - coitem_qtyshipped + coitem_qtyreturned + SUM(coship_qty))) OR
                          (NOT cust_partialship) ) AS toclose
  FROM cohead, coitem, coship, cosmisc, cust
  WHERE ( (coitem_cohead_id=cohead_id)
   AND (cohead_cust_id=cust_id)
   AND (coship_coitem_id=coitem_id)
   AND (coship_cosmisc_id=cosmisc_id)
   AND (cosmisc_shipped)
   AND (NOT coship_invoiced)
   AND (cohead_id=pSoheadid) )
  GROUP BY cust_partialship, coitem_id,
           coitem_qtyord, coitem_qtyshipped, coitem_qtyreturned LOOP

    -- do as much as we can but still report errors if they occur
    IF (selectForBilling(_soitem.coitem_id, _soitem.qty, _soitem.toclose) < 0) THEN
      _returnval := FALSE;
    END IF;

  END LOOP;

  RETURN _returnval;

END;
' LANGUAGE 'plpgsql';
