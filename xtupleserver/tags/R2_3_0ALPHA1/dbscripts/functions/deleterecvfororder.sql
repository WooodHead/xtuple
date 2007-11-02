CREATE OR REPLACE FUNCTION deleteRecvForOrder(TEXT, INTEGER) RETURNS INTEGER AS '
DECLARE
  pordertype	ALIAS FOR $1;
  porderid	ALIAS FOR $2;

BEGIN
  IF (pordertype = ''PO'') THEN
    DELETE FROM recv
    USING poitem
    WHERE ((recv_orderitem_id=poitem_id)
      AND  (NOT recv_posted)
      AND  (recv_order_type=pordertype)
      AND  (poitem_pohead_id=porderid));

  ELSEIF (pordertype = ''TO'' AND fetchMetricBool(''MultiWhs'')) THEN
    DELETE FROM recv
    USING toitem
    WHERE ((recv_orderitem_id=toitem_id)
      AND  (NOT recv_posted)
      AND  (recv_order_type=pordertype)
      AND  (toitem_tohead_id=porderid));

  ELSE
    RETURN -11;
  END IF;

  RETURN 0;

END;
' LANGUAGE 'plpgsql';
