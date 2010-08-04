
CREATE OR REPLACE FUNCTION getwoqtyscrap(integer) RETURNS numeric AS $$
DECLARE
  pWoid             ALIAS FOR $1;
  _Womatlid	    INTEGER;
  _scrap	    numeric(18,6);
BEGIN
  --find parent id
  SELECT *, getwomatlidfromwoid(wo_id) INTO _Womatlid
  FROM wo
  WHERE wo_id = pWoid;
  --get issue value
  SELECT womatl_scrap INTO _scrap
  FROM womatl
  WHERE womatl_id = _Womatlid;
  --return
  IF(_scrap isnull) THEN
	RETURN 0;
    ELSE
	RETURN _scrap;
  END IF;    
END;
$$ LANGUAGE 'plpgsql';

