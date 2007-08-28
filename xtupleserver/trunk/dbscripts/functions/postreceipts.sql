CREATE OR REPLACE FUNCTION postReceipts(TEXT, INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pordertype		ALIAS FOR $1;
  porderid		ALIAS FOR $2;
  _itemlocSeries	INTEGER	:= $3;
  _qtyToRecv		NUMERIC;
  _r			RECORD;
  _multiWhs            BOOLEAN;

BEGIN

  _multiWhs := fetchMetricBool(''MultiWhs'');

  IF (_multiWhs) THEN
    SELECT SUM(qtyToReceive(pordertype, recv_orderitem_id)) INTO _qtyToRecv
    FROM recv
    WHERE ((recv_order_type=pordertype)
      AND  (recv_orderitem_id IN (SELECT poitem_id
    				FROM poitem
				WHERE ((poitem_pohead_id=porderid)
				  AND  (pordertype=''PO''))
				UNION
				SELECT toitem_id
				FROM toitem
				WHERE ((toitem_tohead_id=porderid)
				  AND  (pordertype=''TO''))
			       )));
  ELSE
    SELECT SUM(qtyToReceive(pordertype, recv_orderitem_id)) INTO _qtyToRecv
    FROM recv
    WHERE ((recv_order_type=pordertype)
      AND  (recv_orderitem_id IN (SELECT poitem_id
    				FROM poitem
				WHERE ((poitem_pohead_id=porderid)
				  AND  (pordertype=''PO''))
			       )));
  END IF;

  IF (_qtyToRecv <= 0) THEN
    RETURN -11;
  END IF;

  IF (_itemlocSeries IS NULL OR _itemlocSeries <= 0) THEN
    _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
  END IF;

  IF (pordertype = ''PO'') THEN
    FOR _r IN SELECT postReceipt(recv_id, _itemlocSeries) AS postResult
	    FROM recv, pohead, poitem
	    WHERE ((recv_orderitem_id=poitem_id)
	      AND  (poitem_pohead_id=pohead_id)
	      AND  (pohead_id=porderid)
	      AND  (NOT recv_posted)
	      AND  (recv_order_type=pordertype)) LOOP
      IF (_r.postResult < 0 AND _r.postResult != -11) THEN
	RETURN _r.postResult;	-- fail on first error but ignore lines with qty == 0
      END IF;
    END LOOP;

  ELSEIF (pordertype = ''TO'' AND _multiWhs) THEN
    FOR _r IN SELECT postReceipt(recv_id, _itemlocSeries) AS postResult
	    FROM recv, tohead, toitem
	    WHERE ((recv_orderitem_id=toitem_id)
	      AND  (toitem_tohead_id=tohead_id)
	      AND  (tohead_id=porderid)
	      AND  (NOT recv_posted)
	      AND  (recv_order_type=pordertype)) LOOP
      IF (_r.postResult < 0 AND _r.postResult != -11) THEN
	RETURN _r.postResult;	-- fail on first error but ignore lines with qty == 0
      END IF;
    END LOOP;
  END IF;

  RETURN _itemlocSeries;
END;
' LANGUAGE 'plpgsql';
