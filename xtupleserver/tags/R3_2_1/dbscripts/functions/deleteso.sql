CREATE OR REPLACE FUNCTION deleteSo(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pSoheadid	ALIAS FOR $1;
BEGIN
  RETURN deleteSo(pSoheadid, NULL);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION deleteSo(INTEGER, TEXT) RETURNS INTEGER AS $$
DECLARE
  pSoheadid	ALIAS FOR $1;
  pSonumber	ALIAS FOR $2;

  _r            RECORD;
  _result       INTEGER;

BEGIN
-- Get cohead
  SELECT * INTO _r FROM cohead WHERE (cohead_id=pSoheadid);

   IF (NOT FOUND) THEN
     RETURN 0;
   END IF;

-- Cannot delete if credit card payments
  IF (EXISTS(SELECT ccpay_id
	     FROM ccpay, payco
	     WHERE ((ccpay_status IN ('C'))
	       AND  (ccpay_id=payco_ccpay_id)
	       AND  (payco_cohead_id=pSoheadid)))) THEN
    RETURN -1;
  END IF;

-- Cannot delete if credit card history
  IF (EXISTS(SELECT ccpay_id
	     FROM ccpay, payco
	     WHERE ((ccpay_status != 'C')
	       AND  (ccpay_id=payco_ccpay_id)
	       AND  (payco_cohead_id=pSoheadid)))) THEN
    RETURN -2;
  END IF;

-- Delete Sales Order Items
  SELECT deleteSoItem(coitem_id) INTO _result
  FROM coitem
  WHERE (coitem_cohead_id=pSoheadid);
  IF (_result < 0) THEN
    RETURN _result;
  END IF;

  DELETE FROM prj
  WHERE ((prj_id=_r.cohead_prj_id)
  AND (prj_status IS NULL));

  DELETE FROM cohead
  WHERE (cohead_id=pSoheadid);

  DELETE FROM aropenco
  WHERE (aropenco_cohead_id=pSoheadid);

  IF (COALESCE(pSonumber,'') != '') THEN
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
$$ LANGUAGE 'plpgsql';
