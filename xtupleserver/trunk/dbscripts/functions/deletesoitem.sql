
CREATE OR REPLACE FUNCTION deleteSoItem(INTEGER) RETURNS INTEGER AS $$
-- Copyright (c) 1999-2012 by OpenMFG LLC, d/b/a xTuple. 
-- See www.xtuple.com/CPAL for the full text of the software license.
DECLARE
  pSoitemid	ALIAS FOR $1;

  _r            RECORD;
  _s            RECORD;
  _result       INTEGER;
  _deletePO     INTEGER := 0;
  _recvId       INTEGER := -1;
  _poStatus     TEXT;
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
  SELECT shipitem_id INTO _result
  FROM shipitem JOIN shiphead ON (shiphead_id=shipitem_shiphead_id AND shiphead_order_type='SO')
  WHERE (shipitem_orderitem_id=pSoitemid)
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

-- Cannot delete if any inventory history
  SELECT invhist_id INTO _result
  FROM invhist
  WHERE ( (invhist_ordnumber=formatSoNumber(pSoitemid))
    AND   (invhist_ordtype='SO') )
  LIMIT 1;
  IF (FOUND) THEN
    RETURN -105;
  END IF;

-- If Kit, check deletion of component items
  FOR _s IN
    SELECT a.*
    FROM coitem a, (SELECT DISTINCT coitem_cohead_id,
                           coitem_linenumber
                    FROM coitem
                    WHERE coitem_id = pSoitemid) b
    WHERE ((a.coitem_cohead_id = b.coitem_cohead_id)
       AND (a.coitem_linenumber = b.coitem_linenumber)
       AND (a.coitem_subnumber > 0))
  LOOP
    IF ((COALESCE(_s.coitem_order_id, -1) > 0)
     AND (_s.coitem_order_type = 'P')) THEN
      SELECT poitem_status, COALESCE(recv_id, -1)
        INTO _poStatus, _recvId
      FROM poitem LEFT OUTER JOIN recv
             ON ((recv_orderitem_id=poitem_id)
               AND (recv_order_type='PO'))
      WHERE (poitem_id = _s.coitem_order_id);

      IF ((_recvId > 0) OR (_poStatus = 'C')) THEN
        RETURN -10;
      ELSIF ((_recvId = -1) AND (_poStatus = 'O')) THEN
        _deletePO := _deletePO - 1;
      END IF;
    END IF;
  END LOOP;


  SELECT (itemsite_costmethod='J') INTO _jobItem
  FROM coitem JOIN itemsite ON (itemsite_id=coitem_itemsite_id)
  WHERE (coitem_id=pSoitemid);

  IF (_jobItem AND _r.coitem_order_type='W') THEN
-- Delete associated Work Order
    SELECT deleteWo(_r.coitem_order_id, TRUE, TRUE) INTO _result;
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

  IF (_r.coitem_order_type='P') THEN
-- Delete associated Purchase Order Item
    SELECT deletepoitem(_r.coitem_order_id) INTO _result;
    IF ((_result < 0) AND (_result <> -20)) THEN
      RETURN _result;
    ELSIF (_result = -20) THEN
      _deletePO := _deletePO - 1;
    END IF;
  END IF;

-- Delete the coitem
  DELETE FROM coitem
  WHERE (coitem_id=pSoitemid);

  IF (_deletePO < 0) THEN
    RETURN -20;
  ELSE
    RETURN 0;
  END IF;

END;
$$ LANGUAGE 'plpgsql';
