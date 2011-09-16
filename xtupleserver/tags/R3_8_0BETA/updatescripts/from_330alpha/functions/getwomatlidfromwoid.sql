
CREATE OR REPLACE FUNCTION getwomatlidfromwoid(integer) RETURNS integer AS $$
DECLARE
  pWoid	                ALIAS FOR $1; 
  _parentWoid		INTEGER;
  _itemsiteid		INTEGER;
  _returnVal 		INTEGER;
  _woreccount		INTEGER;
  _womatlrecCount	INTEGER;
  _worec 		RECORD;
  _womatl		RECORD;
BEGIN
  --find parent id
  SELECT wo_ordid INTO _parentWoid
  FROM wo
  WHERE wo_id = pWoid;  
  --return -1 if no parent found
  IF(_parentWoid = -1 OR _parentWoid isnull) THEN
     RETURN -1;
  END IF;
  --find itemsite id
  SELECT wo_itemsite_id INTO _itemsiteid
  FROM wo
  WHERE wo_id = pWoid;
  --return -1 if no parent found
  IF(_itemsiteid isnull) THEN
     RETURN -1;
  END IF;
  
  --find the row position of the wo_id in the query
  --So matching this order with the womatl_id order
  --shows the which womatl_id = which wo_id as the 
  --womatl_id are created in the wo_id order or bom order.
  _woreccount := 0;
  FOR _worec IN
	SELECT * FROM wo
	WHERE wo_ordid = _parentWoid
	  AND wo_itemsite_id = _itemsiteid
	ORDER BY wo_id
  LOOP 
       _woreccount := _woreccount + 1;                  
       IF(_worec.wo_id = pwoid) THEN
	 EXIT;
       END IF;
  END LOOP;
  --count rows to find womatl_id
  _womatlrecCount := 0;
  FOR _womatl IN
	SELECT womatl_id
        FROM womatl  
	WHERE womatl_wo_id = _parentWoid
	  AND womatl_itemsite_id = _itemsiteid
	ORDER BY womatl_id
  LOOP 
       _womatlrecCount := _womatlrecCount + 1;                  
       IF(_womatlrecCount = _woreccount) THEN
	 RETURN _womatl.womatl_id;
       END IF;                                 
  END LOOP; 
  RETURN -1;
END; $$
  LANGUAGE 'plpgsql';

