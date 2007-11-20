CREATE OR REPLACE FUNCTION copyTransferOrder(INTEGER, DATE) RETURNS INTEGER AS '
DECLARE
  pSrcid		ALIAS FOR $1;
  _orderdate		DATE := $2;
  _head			RECORD;
  _toheadid		INTEGER;

BEGIN
  SELECT * INTO _head FROM tohead WHERE tohead_id = pSrcid;
  IF (NOT FOUND) THEN
    RETURN -1;
  END IF;

  IF (_orderdate IS NULL) THEN
    _orderdate := CURRENT_DATE;
  END IF;

  INSERT INTO tohead (tohead_number,		tohead_status,
		      tohead_orderdate,
		      tohead_src_warehous_id,	tohead_srcname,
		      tohead_srcaddress1,	tohead_srcaddress2,
		      tohead_srcaddress3,	tohead_srccity,
		      tohead_srcstate,		tohead_srcpostalcode,
		      tohead_srccountry,	tohead_srccntct_id,
		      tohead_srccntct_name,	tohead_srcphone,
		      tohead_trns_warehous_id,	tohead_trnsname,
		      tohead_dest_warehous_id,	tohead_destname,
		      tohead_destaddress1,	tohead_destaddress2,
		      tohead_destaddress3,	tohead_destcity,
		      tohead_deststate,		tohead_destpostalcode,
		      tohead_destcountry,	tohead_destcntct_id,
		      tohead_destcntct_name,	tohead_destphone,
		      tohead_agent_username,	tohead_shipvia,
		      tohead_shipform_id,	tohead_shipchrg_id,
		      tohead_taxauth_id,
		      tohead_freight,		tohead_freight_curr_id,
		      tohead_freighttax_id,
		      tohead_shipcomplete,	tohead_ordercomments,
		      tohead_shipcomments
	      ) VALUES (
		      fetchNextNumber(''ToNumber''),	''O'',
		      _orderdate,
		      _head.tohead_src_warehous_id, _head.tohead_srcname,
		      _head.tohead_srcaddress1,	    _head.tohead_srcaddress2,
		      _head.tohead_srcaddress3,	    _head.tohead_srccity,
		      _head.tohead_srcstate,	    _head.tohead_srcpostalcode,
		      _head.tohead_srccountry,	    _head.tohead_srccntct_id,
		      _head.tohead_srccntct_name,   _head.tohead_srcphone,
		      _head.tohead_trns_warehous_id,_head.tohead_trnsname,
		      _head.tohead_dest_warehous_id,_head.tohead_destname,
		      _head.tohead_destaddress1,    _head.tohead_destaddress2,
		      _head.tohead_destaddress3,    _head.tohead_destcity,
		      _head.tohead_deststate,	    _head.tohead_destpostalcode,
		      _head.tohead_destcountry,	    _head.tohead_destcntct_id,
		      _head.tohead_destcntct_name,  _head.tohead_destphone,
		      _head.tohead_agent_username,  _head.tohead_shipvia,
		      _head.tohead_shipform_id,	    _head.tohead_shipchrg_id,
		      NULL,
		      _head.tohead_freight,	   _head.tohead_freight_curr_id,
		      NULL,
		      _head.tohead_shipcomplete,     _head.tohead_ordercomments,
		      _head.tohead_shipcomments);

  _toheadid := CURRVAL(''tohead_tohead_id_seq'');

  INSERT INTO toitem (toitem_tohead_id,	toitem_linenumber,	toitem_item_id,
		      toitem_status,
		      toitem_duedate,
		      toitem_schedshipdate,
		      toitem_qty_ordered,	toitem_uom,	toitem_stdcost,	
		      toitem_freight,	toitem_freight_curr_id, toitem_notes
	      ) SELECT _toheadid,	toitem_linenumber,	toitem_item_id,
		      ''O'',
		      CURRENT_DATE + COALESCE(d.itemsite_leadtime, 0) + COALESCE(t.itemsite_leadtime, 0),
		      CURRENT_DATE,
		      toitem_qty_ordered,	toitem_uom,	stdcost(toitem_item_id),
		      toitem_freight,	toitem_freight_curr_id, toitem_notes
		FROM toitem
		     LEFT OUTER JOIN itemsite d ON (
			    (toitem_item_id=d.itemsite_item_id)
			    AND  (d.itemsite_warehous_id=_head.tohead_dest_warehous_id))
		     LEFT OUTER JOIN itemsite t ON (
			    (toitem_item_id=t.itemsite_item_id)
			    AND  (t.itemsite_warehous_id=_head.tohead_trns_warehous_id))
		WHERE (toitem_tohead_id=pSrcid);

  PERFORM changeToTaxAuth(_toheadid, _head.tohead_taxauth_id);

  RETURN _toheadid;

END;
' LANGUAGE 'plpgsql';
