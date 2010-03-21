CREATE OR REPLACE FUNCTION deleteSo(INTEGER) RETURNS INTEGER AS '
DECLARE
  pSoheadid	ALIAS FOR $1;
BEGIN
  RETURN deleteSo(pSoheadid, NULL);
END;
' LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteSo(INTEGER, TEXT) RETURNS INTEGER AS '
DECLARE
  pSoheadid	ALIAS FOR $1;
  pSonumber	ALIAS FOR $2;

  _r		RECORD;
  _test		INTEGER;

BEGIN
  SELECT * INTO _r FROM cohead WHERE (cohead_id=pSoheadid);

  SELECT coitem_id INTO _test
  FROM coitem
  WHERE ( (coitem_qtyshipped > 0)
   AND (coitem_cohead_id=pSoheadid) );
  IF (FOUND) THEN
    RETURN -1;
  END IF;

  SELECT coship_id INTO _test
  FROM coship, coitem
  WHERE ( (coship_coitem_id=coitem_id)
   AND (coitem_cohead_id=pSoheadid) );
  IF (FOUND) THEN
    RETURN -2;
  END IF;

  IF (EXISTS(SELECT ccpay_id
	     FROM ccpay, payco
	     WHERE ((ccpay_status IN (''C''))
	       AND  (ccpay_id=payco_ccpay_id)
	       AND  (payco_cohead_id=pSoheadid)))) THEN
    RETURN -4;
  END IF;

  IF (EXISTS(SELECT ccpay_id
	     FROM ccpay, payco
	     WHERE ((ccpay_status != ''C'')
	       AND  (ccpay_id=payco_ccpay_id)
	       AND  (payco_cohead_id=pSoheadid)))) THEN
    RETURN -5;
  END IF;

  UPDATE pr SET pr_prj_id=-1
  FROM coitem
  WHERE ((coitem_cohead_id=pSoheadid)
  AND  (coitem_order_type=''R'')
  AND  (coitem_order_id=pr_id));

  PERFORM changeWoProject(coitem_order_id, -1, TRUE)
  FROM coitem
  WHERE ((coitem_cohead_id=pSoheadid)
  AND  (coitem_order_type=''W''));

  DELETE FROM prj
  WHERE ((prj_id=_r.cohead_prj_id)
  AND (prj_status IS NULL));

  DELETE FROM coitem
  WHERE (coitem_cohead_id=pSoheadid);

  DELETE FROM cohead
  WHERE (cohead_id=pSoheadid);

  DELETE FROM aropenco
  WHERE (aropenco_cohead_id=pSoheadid);

  IF (pSonumber IS NOT NULL) THEN
    IF (NOT releaseSoNumber(CAST(pSonumber AS INTEGER))) THEN
      RETURN 0; -- change to -3 when releaseSoNumber returns INTEGER
    END IF;

  ELSEIF (_r.cohead_number IS NOT NULL) THEN
    IF (NOT releaseSoNumber(CAST(_r.cohead_number AS INTEGER))) THEN
      RETURN 0; -- change to -3 when releaseSoNumber returns INTEGER
    END IF;
      
  END IF;

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
