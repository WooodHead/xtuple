CREATE OR REPLACE FUNCTION deleteSoItem(INTEGER) RETURNS INTEGER AS $$
DECLARE
  pSoitemid	ALIAS FOR $1;

  _r            RECORD;
  _result       INTEGER;
  _jobItem      BOOLEAN;

BEGIN
-- Get coitem
   SELECT * INTO _r FROM coitem WHERE (coitem_id=pSoitemid);

   IF (NOT FOUND) THEN
     RETURN -999;
   END IF;

-- Cannot delete if shipped
  IF (_r.coitem_qtyshipped > 0) THEN
    RETURN -101;
  END IF;

-- Cannot delete if issued to shipping
  SELECT coship_id INTO _result
  FROM coship
  WHERE (coship_coitem_id=pSoitemid)
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -102;
  END IF;

-- Cannot delete if returned
  IF (fetchMetricBool('MultiWhs')) THEN
    SELECT raitem_id INTO _result
    FROM raitem
    WHERE ( (raitem_orig_coitem_id=pSoitemid)
       OR   (raitem_new_coitem_id=pSoitemid) )
    LIMIT 1;
    IF (FOUND) THEN
      RETURN -103;
    END IF;
  END IF;

  SELECT (item_type='J') INTO _jobItem
  FROM coitem JOIN itemsite ON (itemsite_id=coitem_itemsite_id)
              JOIN item ON (item_id=itemsite_item_id)
  WHERE (coitem_id=pSoitemid);

  IF (_jobItem AND _r.coitem_order_type='W') THEN
-- Delete associated Work Order
    SELECT deleteWo(_r.coitem_order_id, TRUE) INTO _result;
    IF (_result < 0) THEN
      RETURN -104;
    END IF;
  ELSE
-- Break association
    IF (_r.coitem_order_type='R') THEN
      UPDATE pr SET pr_prj_id=-1
      WHERE (pr_id=_r.coitem_order_id);
    ELSE
      IF (_r.coitem_order_type='W') THEN
        PERFORM changeWoProject(_r.coitem_order_id, -1, TRUE);
      END IF;
    END IF;
  END IF;

-- Delete the coitem
  DELETE FROM coitem
  WHERE (coitem_id=pSoitemid);

  RETURN 0;

END;
$$ LANGUAGE 'plpgsql';
