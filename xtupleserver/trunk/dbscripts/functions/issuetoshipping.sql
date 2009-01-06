CREATE OR REPLACE FUNCTION issueToShipping(INTEGER, NUMERIC) RETURNS INTEGER AS '
BEGIN
  RETURN issueToShipping(''SO'', $1, $2, 0, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION issueToShipping(INTEGER, NUMERIC, INTEGER) RETURNS INTEGER AS '
BEGIN
  RETURN issueToShipping(''SO'', $1, $2, $3, CURRENT_TIMESTAMP);
END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION issueToShipping(TEXT, INTEGER, NUMERIC, INTEGER, TIMESTAMP WITH TIME ZONE) RETURNS INTEGER AS '
DECLARE
  pordertype		ALIAS FOR $1;
  pitemid		ALIAS FOR $2;
  pQty			ALIAS FOR $3;
  _itemlocSeries	INTEGER			 := $4;
  _timestamp		TIMESTAMP WITH TIME ZONE := $5;
  _coholdtype		TEXT;
  _invhistid		INTEGER;
  _shipheadid		INTEGER;
  _shipnumber		INTEGER;
  _cntctid              INTEGER;
  _r                    RECORD;
  _p                    RECORD;
  _m                    RECORD;
  _value                NUMERIC;
  _warehouseid		 INTEGER;

BEGIN

  IF (_timestamp IS NULL) THEN
    _timestamp := CURRENT_TIMESTAMP;
  END IF;

  IF (_itemlocSeries = 0) THEN
    _itemlocSeries := NEXTVAL(''itemloc_series_seq'');
  END IF;

  IF (pordertype = ''SO'') THEN

    -- Check site security
    SELECT warehous_id INTO _warehouseid
    FROM coitem,itemsite,site()
    WHERE ((coitem_id=pitemid)
    AND (itemsite_id=coitem_itemsite_id)
    AND (warehous_id=itemsite_warehous_id));
          
    IF (NOT FOUND) THEN
      RETURN 0;
    END IF;

    -- Check auto registration
    IF ( SELECT COALESCE(itemsite_autoreg, FALSE)
         FROM coitem JOIN itemsite ON (itemsite_id=coitem_itemsite_id)
         WHERE (coitem_id=pitemid) ) THEN
      SELECT COALESCE(crmacct_cntct_id_1, -1) INTO _cntctid
      FROM coitem JOIN cohead ON (cohead_id=coitem_cohead_id)
                  JOIN crmacct ON (crmacct_cust_id=cohead_cust_id)
      WHERE (coitem_id=pitemid);
      IF (_cntctid = -1) THEN
        RETURN -15;
      END IF;
    END IF; 
  
    SELECT shiphead_id INTO _shipheadid
    FROM shiphead, coitem
    WHERE ((shiphead_order_id=coitem_cohead_id)
      AND  (NOT shiphead_shipped)
      AND  (coitem_id=pitemid)
      AND  (shiphead_order_type=pordertype));
    IF (NOT FOUND) THEN
      SELECT NEXTVAL(''shiphead_shiphead_id_seq'') INTO _shipheadid;

      _shipnumber := fetchShipmentNumber();
      IF (_shipnumber < 0) THEN
	RETURN -10;
      END IF;

      SELECT cohead_holdtype INTO _coholdtype
      FROM cohead, coitem
      WHERE ((cohead_id=coitem_cohead_id)
        AND  (coitem_id=pitemid));

      IF (_coholdtype = ''C'') THEN
	RETURN -12;
      ELSIF (_coholdtype = ''P'') THEN
	RETURN -13;
      ELSIF (_coholdtype = ''R'') THEN
	RETURN -14;
      END IF;

      INSERT INTO shiphead
      ( shiphead_id, shiphead_number, shiphead_order_id, shiphead_order_type,
	shiphead_shipped,
	shiphead_sfstatus, shiphead_shipvia, shiphead_shipchrg_id,
	shiphead_freight, shiphead_freight_curr_id,
	shiphead_shipdate, shiphead_notes, shiphead_shipform_id )
      SELECT _shipheadid, _shipnumber, coitem_cohead_id, pordertype,
	     FALSE,
	     ''N'', cohead_shipvia,
	     CASE WHEN (cohead_shipchrg_id <= 0) THEN NULL
	          ELSE cohead_shipchrg_id
	     END,
	     cohead_freight, cohead_curr_id,
	     _timestamp::DATE, cohead_shipcomments,
	     CASE WHEN cohead_shipform_id = -1 THEN NULL
	          ELSE cohead_shipform_id
	     END
      FROM cohead, coitem
      WHERE ((coitem_cohead_id=cohead_id)
         AND (coitem_id=pitemid) );

      UPDATE pack
      SET pack_shiphead_id = _shipheadid,
	  pack_printed = FALSE
      FROM coitem
      WHERE ((pack_head_id=coitem_cohead_id)
	AND  (pack_shiphead_id IS NULL)
	AND  (pack_head_type=''SO'')
	AND  (coitem_id=pitemid));

    ELSE
      UPDATE pack
      SET pack_printed = FALSE
      FROM coitem
      WHERE ((pack_head_id=coitem_cohead_id)
	AND  (pack_shiphead_id=_shipheadid)
	AND  (pack_head_type=''SO'')
	AND  (coitem_id=pitemid));
    END IF;

    --See if this is inventory or job item and value accordingly
    SELECT coitem_itemsite_id, coitem_qty_invuomratio,
           item_id, item_type, itemsite_costmethod INTO _r
    FROM coitem, itemsite, item
    WHERE ((coitem_id=pitemid)
    AND (itemsite_id=coitem_itemsite_id)
    AND (itemsite_item_id=item_id));

    IF (_r.item_type != ''J'') THEN
      -- This is inventory so handle with g/l transaction
      SELECT postInvTrans( itemsite_id, ''SH'', pQty * coitem_qty_invuomratio,
			   ''S/R'', porderType,
			   formatSoNumber(coitem_id), shiphead_number,
                           (''Issue '' || item_number || '' to Shipping for customer '' || cohead_billtoname),
			   costcat_shipasset_accnt_id, costcat_asset_accnt_id,
			   _itemlocSeries, _timestamp ) INTO _invhistid
      FROM coitem, cohead, itemsite, item, costcat, shiphead
      WHERE ( (coitem_cohead_id=cohead_id)
       AND (coitem_itemsite_id=itemsite_id)
       AND (itemsite_item_id=item_id)
       AND (itemsite_costcat_id=costcat_id)
       AND (coitem_id=pitemid)
       AND (shiphead_id=_shipheadid) );

      SELECT (invhist_unitcost * invhist_invqty) INTO _value
      FROM invhist
      WHERE (invhist_id=_invhistid);
      
    ELSE
    -- This is a job so deal with costing and work order
    
       --Backflush eligble material
      FOR _m IN SELECT womatl_id, womatl_qtyper, womatl_scrap, womatl_qtywipscrap,
		     womatl_qtyreq - roundQty(item_fractional, womatl_qtyper * wo_qtyord) AS preAlloc
	      FROM womatl, wo, itemsite, item
	      WHERE ((womatl_issuemethod IN (''L'', ''M''))
		AND  (womatl_wo_id=wo_id)
		AND  (womatl_itemsite_id=itemsite_id)
		AND  (itemsite_item_id=item_id)
		AND  (wo_ordtype = ''S'')
		AND  (wo_ordid = pitemid))
      LOOP
        -- CASE says: don''t use scrap % if someone already entered actual scrap
        SELECT issueWoMaterial(_m.womatl_id,
	  CASE WHEN _m.womatl_qtywipscrap > _m.preAlloc THEN
	    pQty * _m.womatl_qtyper + (_m.womatl_qtywipscrap - _m.preAlloc)
	  ELSE
	    pQty * _m.womatl_qtyper * (1 + _m.womatl_scrap)
	  END, _itemlocSeries) INTO _itemlocSeries;

        UPDATE womatl
        SET womatl_issuemethod=''L''
        WHERE ( (womatl_issuemethod=''M'')
          AND (womatl_id=_m.womatl_id) );
    
      END LOOP;
      
      --Get Work Order Info
      SELECT
        wo_id, formatwonumber(wo_id) AS f_wonumber,wo_status, wo_qtyord, wo_qtyrcv,
        CASE WHEN (wo_cosmethod = ''D'') THEN
          COALESCE(wo_wipvalue, 0)
        ELSE
          COALESCE(round((wo_wipvalue - (wo_postedvalue / wo_qtyord * (wo_qtyord - wo_qtyrcv - pQty))),2), 0)
        END AS value INTO _p
      FROM wo
      WHERE ((wo_ordtype = ''S'')
      AND (wo_ordid = pitemid));
      IF (_p.wo_status = ''C'') THEN
        RAISE EXCEPTION ''Work order % is closed and can not be shipped'',_p.f_wonumber;
      END IF;
  --  Make sure value is not null
      _p.value := COALESCE(_p.value, 0);

  --  Distribute to G/L, debit Shipping Asset, credit WIP
      PERFORM MIN(insertGLTransaction( ''S/R'', ''SO'', formatSoNumber(pItemid), ''Issue to Shipping'',
                                     costcat_wip_accnt_id,
				     costcat_shipasset_accnt_id,
                                     -1, _p.value, current_date )) 
      FROM itemsite, costcat
      WHERE ( (itemsite_costcat_id=costcat_id)
      AND (itemsite_id=_r.coitem_itemsite_id) );

  --  Update the work order about what happened
      UPDATE wo SET 
        wo_qtyrcv = wo_qtyrcv + pQty * _r.coitem_qty_invuomratio,
        wo_wipvalue = wo_wipvalue - _p.value,
        wo_status = 
          CASE WHEN (wo_qtyord - wo_qtyrcv - pQty <= 0) THEN
            ''C''
          ELSE
            wo_status
          END
      WHERE (wo_id=_p.wo_id);

      _value := _p.value;
    END IF;

    INSERT INTO shipitem
    ( shipitem_shiphead_id, shipitem_orderitem_id, shipitem_qty,
      shipitem_transdate, shipitem_trans_username, shipitem_invoiced,
      shipitem_value, shipitem_invhist_id )
    VALUES
    ( _shipheadid, pitemid, pQty,
      _timestamp, CURRENT_USER, FALSE,
      _value, 
      CASE WHEN _invhistid = -1 THEN
        NULL
      ELSE 
        _invhistid
      END );

    UPDATE coitem
       SET coitem_qtyreserved = noNeg(coitem_qtyreserved - pQty)
     WHERE(coitem_id=pitemid);

  ELSEIF (pordertype = ''TO'') THEN

    -- Check site security
    IF (fetchMetricBool(''MultiWhs'')) THEN
      SELECT warehous_id INTO _warehouseid
      FROM toitem, tohead, site()
      WHERE ( (toitem_id=pitemid)
        AND   (tohead_id=toitem_tohead_id)
        AND   (warehous_id=tohead_src_warehous_id) );
          
      IF (NOT FOUND) THEN
        RETURN 0;
      END IF;
    END IF;

    SELECT postInvTrans( itemsite_id, ''SH'', pQty, ''S/R'',
			 pordertype, CAST(tohead_number AS text), '''', ''Issue to Shipping'',
			 costcat_shipasset_accnt_id, costcat_asset_accnt_id,
			 _itemlocSeries, _timestamp) INTO _invhistid
    FROM tohead, toitem, itemsite, costcat
    WHERE ((tohead_id=toitem_tohead_id)
      AND  (itemsite_item_id=toitem_item_id)
      AND  (itemsite_warehous_id=tohead_src_warehous_id)
      AND  (itemsite_costcat_id=costcat_id)
      AND  (toitem_id=pitemid) );

    SELECT shiphead_id INTO _shipheadid
    FROM shiphead, toitem
    WHERE ((shiphead_order_id=toitem_tohead_id)
      AND  (NOT shiphead_shipped)
      AND  (toitem_id=pitemid)
      AND  (shiphead_order_type=pordertype));

    IF (NOT FOUND) THEN
      _shipheadid := NEXTVAL(''shiphead_shiphead_id_seq'');

      _shipnumber := fetchShipmentNumber();
      IF (_shipnumber < 0) THEN
	RETURN -10;
      END IF;

      INSERT INTO shiphead
      ( shiphead_id, shiphead_number, shiphead_order_id, shiphead_order_type,
	shiphead_shipped,
	shiphead_sfstatus, shiphead_shipvia, shiphead_shipchrg_id,
	shiphead_freight, shiphead_freight_curr_id,
	shiphead_shipdate, shiphead_notes, shiphead_shipform_id )
      SELECT _shipheadid, _shipnumber, tohead_id, pordertype,
	     FALSE,
	     ''N'', tohead_shipvia, tohead_shipchrg_id,
	     tohead_freight + SUM(toitem_freight), tohead_freight_curr_id,
	     _timestamp::DATE, tohead_shipcomments, tohead_shipform_id
      FROM tohead, toitem
      WHERE ((toitem_tohead_id=tohead_id)
         AND (tohead_id IN (SELECT toitem_tohead_id
			    FROM toitem
			    WHERE (toitem_id=pitemid))) )
      GROUP BY tohead_id, tohead_shipvia, tohead_shipchrg_id, tohead_freight,
	       tohead_freight_curr_id, tohead_shipcomments, tohead_shipform_id;
    END IF;

    INSERT INTO shipitem
    ( shipitem_shiphead_id, shipitem_orderitem_id, shipitem_qty,
      shipitem_transdate, shipitem_trans_username, shipitem_value,
      shipitem_invhist_id )
    SELECT
      _shipheadid, pitemid, pQty,
      _timestamp, CURRENT_USER, invhist_invqty * invhist_unitcost,
      _invhistid
    FROM toitem, item, invhist
    WHERE ((toitem_id=pitemid)
    AND (item_id=toitem_item_id)
    AND (invhist_id=_invhistid));

  ELSE
    RETURN -11;
  END IF;

  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
