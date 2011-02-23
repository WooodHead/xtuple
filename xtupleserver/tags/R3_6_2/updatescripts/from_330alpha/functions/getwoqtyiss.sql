
CREATE OR REPLACE FUNCTION getwoqtyiss(integer) RETURNS numeric AS $$
DECLARE
  pWoid             ALIAS FOR $1;
  _Womatlid	    INTEGER;
  _issued	    numeric(18,6);
BEGIN
  --find parent id
  SELECT *, getwomatlidfromwoid(wo_id) INTO _Womatlid
  FROM wo
  WHERE wo_id = pWoid;
  --get issue value
  SELECT womatl_qtyiss INTO _issued
  FROM womatl
  WHERE womatl_id = _Womatlid;
  --return
  IF(_issued isnull) THEN
	RETURN 0;
    ELSE
	RETURN _issued;
  END IF;    
END;
$$ LANGUAGE 'plpgsql';

