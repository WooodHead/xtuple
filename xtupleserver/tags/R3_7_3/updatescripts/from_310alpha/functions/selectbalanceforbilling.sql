CREATE OR REPLACE FUNCTION selectBalanceForBilling(INTEGER) RETURNS BOOLEAN AS $$
DECLARE
  pSoheadid ALIAS FOR $1;
  _returnval	BOOLEAN := TRUE;
  _doSelect BOOLEAN;
  _result INTEGER;
  _soitem RECORD;

BEGIN

  FOR _soitem IN SELECT cust_partialship, coitem_id,
                        coitem_linenumber,
                        COALESCE(item_type,'') AS item_type,
                        SUM(coship_qty) AS qty,
                        ( (SUM(coship_qty) >= (coitem_qtyord - coitem_qtyshipped + coitem_qtyreturned + SUM(coship_qty))) OR
                          (NOT cust_partialship) ) AS toclose
  FROM cohead, coship, cosmisc, cust,
       coitem LEFT OUTER JOIN (itemsite JOIN item ON (itemsite_item_id=item_id)) ON (coitem_itemsite_id=itemsite_id)
  WHERE ( (coitem_cohead_id=cohead_id)
   AND (cohead_cust_id=cust_id)
   AND (coship_coitem_id=coitem_id)
   AND (coship_cosmisc_id=cosmisc_id)
   AND (cosmisc_shipped)
   AND (NOT coship_invoiced)
   AND (cohead_id=pSoheadid) )
  GROUP BY cust_partialship, coitem_id,
           coitem_linenumber, item_type,
           coitem_qtyord, coitem_qtyshipped, coitem_qtyreturned LOOP

    _doSelect := true;
    IF(_soitem.item_type = 'K') THEN
      -- see if all the sub items are shipped
      SELECT coitem_id
        INTO _result
        FROM coitem
       WHERE((coitem_cohead_id=pSoheadid)
         AND (coitem_linenumber=_soitem.coitem_linenumber)
         AND (coitem_subnumber > 0)
         AND ((coitem_qtyord - coitem_qtyshipped + coitem_qtyreturned) > 0))
       LIMIT 1;
      IF( FOUND ) THEN
        _doSelect := false;
      END IF;
    END IF;

    IF (_doSelect) THEN
      -- do as much as we can but still report errors if they occur
      IF (selectForBilling(_soitem.coitem_id, _soitem.qty, _soitem.toclose) < 0) THEN
        _returnval := FALSE;
      END IF;
    END IF;

  END LOOP;

  RETURN _returnval;

END;
$$ LANGUAGE 'plpgsql';
