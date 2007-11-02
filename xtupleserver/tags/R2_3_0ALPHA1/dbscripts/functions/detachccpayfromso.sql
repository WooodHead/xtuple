CREATE OR REPLACE FUNCTION detachCCPayFromSO(INTEGER, INTEGER, INTEGER)
  RETURNS INTEGER AS
'
DECLARE
  pcoheadid		ALIAS FOR $1;
  pwarehousid		ALIAS FOR $2;
  pcustid		ALIAS FOR $3;
  _ccpayid		INTEGER;
  _numrows		INTEGER;
  _numccpayrows		INTEGER;
  _numpaycorows		INTEGER;
  _numaropencorows	INTEGER;

BEGIN
  UPDATE ccpay
  SET ccpay_order_number = NULL
  WHERE ccpay_id IN (SELECT payco_ccpay_id
		     FROM payco
		     WHERE (payco_cohead_id=pcoheadid));
  GET DIAGNOSTICS _numccpayrows = ROW_COUNT;

  DELETE FROM payco
  WHERE (payco_cohead_id=pcoheadid);
  GET DIAGNOSTICS _numpaycorows = ROW_COUNT;

  DELETE FROM aropenco
  WHERE (aropenco_cohead_id=pcoheadid);
  GET DIAGNOSTICS _numaropencorows = ROW_COUNT;

  _numrows := _numccpayrows + _numpaycorows + _numaropencorows;

  IF (_numrows > 0) THEN
    INSERT INTO evntlog
	 ( evntlog_evnttime,  evntlog_username, evntlog_evnttype_id,
	   evntlog_ordtype,   evntlog_ord_id,   evntlog_warehous_id,
	   evntlog_number )
    SELECT DISTINCT
	   CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
	   ''C'',             pcustid,          pwarehousid,
	   cust_name
    FROM evntnot, evnttype, cust
    WHERE ((evntnot_evnttype_id=evnttype_id)
      AND  (evntnot_warehous_id=pwarehousid)
      AND  (evnttype_name=''DetachCCPayFromSO'')
      AND  (cust_id=pcustid));
  END IF;

  RETURN _numrows;
END;
'
LANGUAGE 'plpgsql';
