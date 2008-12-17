CREATE OR REPLACE FUNCTION deleteSoItem(INTEGER) RETURNS INTEGER AS '
DECLARE
  pSoitemid	ALIAS FOR $1;

  _r		RECORD;
  _test		INTEGER;

BEGIN
  SELECT coitem_id INTO _test
  FROM coitem
  WHERE ( (coitem_qtyshipped > 0)
   AND (coitem_id=pSoitemid) );
  IF (FOUND) THEN
    RETURN -1;
  END IF;

  SELECT coship_id INTO _test
  FROM coship, coitem
  WHERE ( (coship_coitem_id=coitem_id)
   AND (coitem_id=pSoitemid) );
  IF (FOUND) THEN
    RETURN -2;
  END IF;

  IF (fetchMetricBool(''MultiWhs'')) THEN
    SELECT raitem_id INTO _test
    FROM raitem, coitem
    WHERE ( (raitem_new_coitem_id=coitem_id)
     AND (coitem_id=pSoitemid) );
    IF (FOUND) THEN
      RETURN -6;
    END IF;
  END IF;

  UPDATE pr SET pr_prj_id=-1
  FROM coitem
  WHERE ((coitem_id=pSoitemid)
  AND  (coitem_order_type=''R'')
  AND  (coitem_order_id=pr_id));

  PERFORM changeWoProject(coitem_order_id, -1, TRUE)
  FROM coitem
  WHERE ((coitem_id=pSoitemid)
  AND  (coitem_order_type=''W''));

  DELETE FROM coitem
  WHERE (coitem_id=pSoitemid);

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
