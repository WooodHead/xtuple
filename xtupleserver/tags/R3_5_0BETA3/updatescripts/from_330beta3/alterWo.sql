BEGIN;
-- ALTER TABLE wo DROP COLUMN wo_womatl_id 
ALTER TABLE wo ADD COLUMN wo_womatl_id INTEGER REFERENCES womatl (womatl_id) ON DELETE SET NULL;

CREATE OR REPLACE FUNCTION getwomatlidfromwoid(integer) RETURNS integer STABLE AS $$
DECLARE
  pWoid	                ALIAS FOR $1; 
  _parentWoid		INTEGER;
  _itemsiteid		INTEGER;
  _returnVal 		INTEGER;
  _woreccount		INTEGER;
  _womatlrecCount	INTEGER;
  _worec 		RECORD;
  _womatl		RECORD;
  _womatlid            INTEGER;
  _qty	               NUMERIC;
BEGIN
  --find parent id
  SELECT wo_ordid, wo_itemsite_id, wo_qtyord INTO _parentWoid, _itemsiteid, _qty
  FROM wo
  WHERE ((wo_id = pWoid)
   AND (COALESCE(wo_ordid,-1) != -1));  
  --return -1 if no parent found
  IF(NOT FOUND) THEN
     RETURN -1;
  END IF;
  
  --find the row position of the wo_id in the query
  --So matching this order with the womatl_id order
  --shows the which womatl_id = which wo_id as the 
  --womatl_id are created in the wo_id order or bom order.
  _woreccount := 0;
  SELECT COUNT(wo_id) INTO _woreccount
  FROM wo
  WHERE ((wo_ordid = _parentWoid)
   AND (wo_itemsite_id = _itemsiteid)
   AND (wo_qtyord = _qty)
   AND (wo_id <= pwoid));

  SELECT LAST(womatl_id) INTO _womatlid
  FROM
    (SELECT womatl_id
     FROM womatl  
     WHERE womatl_wo_id = _parentWoid
     AND womatl_itemsite_id = _itemsiteid
     AND womatl_qtyreq = _qty
     ORDER BY womatl_id
     LIMIT _woreccount) AS data;
  IF (FOUND) THEN
    RETURN _womatlid;
  END IF;

  RETURN -1;
END; $$
  LANGUAGE 'plpgsql';

UPDATE wo SET wo_womatl_id = getwomatlidfromwoid(wo_id)
WHERE wo_status != 'C'
AND wo_ordtype = 'W';

SELECT dropIfExists('FUNCTION', 'getwomatlidfromwoid(integer)');

COMMIT;

