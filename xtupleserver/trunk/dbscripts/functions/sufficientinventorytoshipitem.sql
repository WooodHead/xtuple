CREATE OR REPLACE FUNCTION sufficientInventoryToShipItem(TEXT, INTEGER) RETURNS INTEGER AS '
DECLARE
  pordertype		ALIAS FOR $1;
  porderitemid		ALIAS FOR $2;
  _returnVal		INTEGER;
  _isqtyavail		BOOLEAN;

BEGIN
  IF (porderitemid IS NULL) THEN
    RETURN -1;
  END IF;

  IF (pordertype = ''SO'') THEN
    SELECT (roundQty(item_fractional,
		    noNeg(coitem_qtyord - coitem_qtyshipped +
			  coitem_qtyreturned - qtyAtShipping(pordertype, coitem_id)
			 )
		    ) <= itemsite_qtyonhand) INTO _isqtyavail
      FROM coitem, itemsite, item
     WHERE ((coitem_itemsite_id=itemsite_id) 
       AND (coitem_status <> ''X'')
       AND (itemsite_item_id=item_id) 
       AND (coitem_id=porderitemid));

  ELSEIF (pordertype = ''TO'') THEN
    SELECT (roundQty(item_fractional,
		     noNeg(toitem_qty_ordered - toitem_qty_shipped - 
			   qtyAtShipping(pordertype, toitem_id)
		      )
		   ) <= itemsite_qtyonhand) INTO _isqtyavail  
      FROM toitem, tohead, itemsite, item
     WHERE ((toitem_tohead_id=tohead_id)
       AND  (tohead_src_warehous_id=itemsite_warehous_id) 
       AND  (toitem_item_id=itemsite_item_id) 
       AND  (itemsite_warehous_id=tohead_src_warehous_id) 
       AND  (itemsite_item_id=item_id) 
       AND  (toitem_status <> ''X'')
       AND  (toitem_id=porderitemid));
  ELSE
    RETURN -11;
  END IF;

  IF (NOT _isqtyavail) THEN
    RETURN -2;
  END IF;

  IF (pordertype = ''SO'') THEN
    SELECT (COALESCE((SELECT SUM(itemloc_qty) 
			FROM itemloc 
		       WHERE (itemloc_itemsite_id=itemsite_id)), 0.0) >= roundQty(item_fractional, 
			      noNeg( coitem_qtyord - coitem_qtyshipped + coitem_qtyreturned - 
			      qtyAtShipping(pordertype, coitem_id) )
			     )) INTO _isqtyavail 
      FROM coitem, itemsite, item
     WHERE ((coitem_itemsite_id=itemsite_id) 
       AND (itemsite_item_id=item_id) 
       AND (NOT ((item_type = ''R'') OR (itemsite_controlmethod = ''N''))) 
       AND ((itemsite_controlmethod IN (''L'', ''S'')) OR (itemsite_loccntrl)) 
       AND (coitem_id=porderitemid)); 

  ELSEIF (pordertype = ''TO'') THEN
    SELECT (COALESCE((SELECT SUM(itemloc_qty) 
			FROM itemloc 
		       WHERE (itemloc_itemsite_id=itemsite_id)), 0.0) >= roundQty(item_fractional, 
			      noNeg( toitem_qty_ordered - toitem_qty_shipped - 
			      qtyAtShipping(pordertype, toitem_id) )
			     )) INTO _isqtyavail 
      FROM toitem, tohead, itemsite, item
     WHERE ((toitem_tohead_id=tohead_id)
       AND  (tohead_src_warehous_id=itemsite_warehous_id) 
       AND  (toitem_item_id=itemsite_item_id) 
       AND  (itemsite_item_id=item_id) 
       AND  (toitem_status <> ''X'')
       AND  (NOT ((item_type = ''R'') OR (itemsite_controlmethod = ''N''))) 
       AND  ((itemsite_controlmethod IN (''L'', ''S'')) OR (itemsite_loccntrl)) 
       AND  (toitem_id=porderitemid)); 
  END IF;
  
  IF (NOT _isqtyavail) THEN
    RETURN -3;
  END IF;

  RETURN 0;
END;
' LANGUAGE 'plpgsql';
