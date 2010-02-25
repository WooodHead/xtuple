CREATE OR REPLACE FUNCTION postBillingSelection(INTEGER) RETURNS INTEGER AS '
DECLARE
  pCobmiscid ALIAS FOR $1;
  _invcheadid INTEGER;
  _invcitemid INTEGER;
  _qtyToInvoice	NUMERIC;
  _r		RECORD;
  _s		RECORD;

BEGIN

  IF ( ( SELECT cobmisc_posted
         FROM cobmisc
         WHERE (cobmisc_id=pCobmiscid) ) ) THEN
    RETURN -1;
  END IF;

  SELECT NEXTVAL(''invchead_invchead_id_seq'') INTO _invcheadid;

--  Give this selection a number if it has not been assigned one
  UPDATE cobmisc
  SET cobmisc_invcnumber=fetchInvcNumber()
  WHERE ( (cobmisc_invcnumber IS NULL)
   AND (cobmisc_id=pCobmiscid) );

--  Create the Invoice header
  INSERT INTO invchead
  ( invchead_id, invchead_cust_id, invchead_shipto_id,
    invchead_ordernumber, invchead_orderdate,
    invchead_posted, invchead_printed,
    invchead_invcnumber, invchead_invcdate, invchead_shipdate,
    invchead_ponumber, invchead_shipvia, invchead_fob,
    invchead_billto_name, invchead_billto_address1,
    invchead_billto_address2, invchead_billto_address3,
    invchead_billto_city, invchead_billto_state,
    invchead_billto_zipcode, invchead_billto_phone,
    invchead_billto_country,
    invchead_shipto_name, invchead_shipto_address1,
    invchead_shipto_address2, invchead_shipto_address3,
    invchead_shipto_city, invchead_shipto_state,
    invchead_shipto_zipcode, invchead_shipto_phone,
    invchead_shipto_country,
    invchead_salesrep_id, invchead_commission,
    invchead_terms_id,
    invchead_freight, invchead_tax,
    invchead_tax_ratea, invchead_tax_rateb, invchead_tax_ratec,
    invchead_misc_amount, invchead_misc_descrip, invchead_misc_accnt_id,
    invchead_payment, invchead_paymentref,
    invchead_notes, invchead_prj_id, invchead_curr_id,
    invchead_taxauth_id, invchead_tax_curr_id,
    invchead_adjtax_id, invchead_adjtaxtype_id,
    invchead_adjtax_pcta, invchead_adjtax_pctb, invchead_adjtax_pctc,
    invchead_adjtax_ratea, invchead_adjtax_rateb, invchead_adjtax_ratec,
    invchead_freighttax_id, invchead_freighttaxtype_id,
    invchead_freighttax_pcta, invchead_freighttax_pctb, invchead_freighttax_pctc,
    invchead_freighttax_ratea, invchead_freighttax_rateb, invchead_freighttax_ratec )
  SELECT _invcheadid,
         cohead_cust_id, cohead_shipto_id,
         cohead_number, cohead_orderdate,
         FALSE, FALSE,
         cobmisc_invcnumber, cobmisc_invcdate, cobmisc_shipdate,
         cohead_custponumber, cobmisc_shipvia, cohead_fob,
         cohead_billtoname, cohead_billtoaddress1,
         cohead_billtoaddress2, cohead_billtoaddress3,
         cohead_billtocity, cohead_billtostate,
         cohead_billtozipcode, cust_phone,
         cohead_billtocountry,
         cohead_shiptoname, cohead_shiptoaddress1,
         cohead_shiptoaddress2, cohead_shiptoaddress3,
         cohead_shiptocity, cohead_shiptostate,
         cohead_shiptozipcode, cohead_shiptophone,
         cohead_shiptocountry,
         cohead_salesrep_id, COALESCE(cohead_commission, 0),
         cohead_terms_id,
         cobmisc_freight, COALESCE(cobmisc_tax, 0),
         cobmisc_tax_ratea, cobmisc_tax_rateb, cobmisc_tax_ratec,
         cobmisc_misc, cobmisc_misc_descrip, cobmisc_misc_accnt_id,
         cobmisc_payment, cobmisc_paymentref,
         cobmisc_notes, cohead_prj_id, cobmisc_curr_id,
         cobmisc_taxauth_id, cobmisc_tax_curr_id,
         cobmisc_adjtax_id, cobmisc_adjtaxtype_id,
         cobmisc_adjtax_pcta, cobmisc_adjtax_pctb, cobmisc_adjtax_pctc,
         cobmisc_adjtax_ratea, cobmisc_adjtax_rateb, cobmisc_adjtax_ratec,
         cobmisc_freighttax_id, cobmisc_freighttaxtype_id,
         cobmisc_freighttax_pcta, cobmisc_freighttax_pctb, cobmisc_freighttax_pctc,
         cobmisc_freighttax_ratea, cobmisc_freighttax_rateb, cobmisc_freighttax_ratec
  FROM cobmisc, cohead, cust
  WHERE ( (cobmisc_cohead_id=cohead_id)
   AND (cohead_cust_id=cust_id)
   AND (cobmisc_id=pCobmiscid) );

--  Create the Invoice items
  FOR _r IN SELECT coitem_id, coitem_linenumber, coitem_subnumber, coitem_custpn,
                   coitem_qtyord, cobill_qty,
                   coitem_qty_uom_id, coitem_qty_invuomratio,
                   coitem_custprice, coitem_price,
                   coitem_price_uom_id, coitem_price_invuomratio,
                   coitem_memo,
                   itemsite_item_id, itemsite_warehous_id,
                   cobill_tax_id, cobill_taxtype_id,
                   cobill_tax_pcta, cobill_tax_pctb, cobill_tax_pctc,
                   cobill_tax_ratea, cobill_tax_rateb, cobill_tax_ratec
            FROM coitem, cobill, itemsite
            WHERE ( (cobill_coitem_id=coitem_id)
             AND (coitem_itemsite_id=itemsite_id)
             AND (cobill_cobmisc_id=pCobmiscid) ) LOOP

    SELECT NEXTVAL(''invcitem_invcitem_id_seq'') INTO _invcitemid;
    INSERT INTO invcitem
    ( invcitem_id, invcitem_invchead_id,
      invcitem_linenumber, invcitem_item_id, invcitem_warehous_id,
      invcitem_custpn, invcitem_number, invcitem_descrip,
      invcitem_ordered, invcitem_billed,
      invcitem_qty_uom_id, invcitem_qty_invuomratio,
      invcitem_custprice, invcitem_price,
      invcitem_price_uom_id, invcitem_price_invuomratio,
      invcitem_notes,
      invcitem_tax_id, invcitem_taxtype_id,
      invcitem_tax_pcta, invcitem_tax_pctb, invcitem_tax_pctc,
      invcitem_tax_ratea, invcitem_tax_rateb, invcitem_tax_ratec,
      invcitem_coitem_id )
    VALUES
    ( _invcitemid, _invcheadid,
      CASE WHEN(_r.coitem_subnumber > 0) THEN (_r.coitem_linenumber * 1000) + _r.coitem_subnumber ELSE _r.coitem_linenumber END,
      _r.itemsite_item_id, _r.itemsite_warehous_id,
      _r.coitem_custpn, '''', '''',
      _r.coitem_qtyord, _r.cobill_qty,
      _r.coitem_qty_uom_id, _r.coitem_qty_invuomratio,
      _r.coitem_custprice, _r.coitem_price,
      _r.coitem_price_uom_id, _r.coitem_price_invuomratio,
      _r.coitem_memo,
      _r.cobill_tax_id, _r.cobill_taxtype_id,
      _r.cobill_tax_pcta, _r.cobill_tax_pctb, _r.cobill_tax_pctc,
      _r.cobill_tax_ratea, _r.cobill_tax_rateb, _r.cobill_tax_ratec,
      _r.coitem_id );

--  Find and mark any Lot/Serial invdetail records associated with this bill
    UPDATE invdetail SET invdetail_invcitem_id = _invcitemid
     WHERE (invdetail_id IN (SELECT invdetail_id
                               FROM coitem, cohead, invhist, invdetail
                              WHERE ((coitem_cohead_id=cohead_id)
                                AND  (invdetail_invhist_id=invhist_id)
                                AND  (invhist_ordnumber = text(cohead_number||''-''||formatSoLineNumber(coitem_id)))
                                AND  (invdetail_invcitem_id IS NULL)
                                AND  (coitem_id=_r.coitem_id)) ) );

--  Mark any shipped, uninvoiced shipitems for the current coitem as invoiced
    _qtyToInvoice :=  _r.cobill_qty;
    FOR _s IN SELECT shipitem.*, shipitem_qty = _r.cobill_qty AS matched
	      FROM shipitem, shiphead
	      WHERE ((shipitem_shiphead_id=shiphead_id)
	        AND  (shipitem_orderitem_id=_r.coitem_id)
	        AND  (shiphead_shipped)
		AND  (shiphead_order_type=''SO'')
	        AND  (NOT shipitem_invoiced))
	      ORDER BY matched DESC, shipitem_qty DESC FOR UPDATE LOOP
      IF (_qtyToInvoice >= _s.shipitem_qty) THEN
	UPDATE shipitem
	SET shipitem_invoiced=TRUE, shipitem_invcitem_id=_invcitemid
	WHERE (shipitem_id=_s.shipitem_id);
	_qtyToInvoice := _qtyToInvoice - _s.shipitem_qty;
      END IF;
      IF (_qtyToInvoice <= 0) THEN
	EXIT;
      END IF;
    END LOOP;

  END LOOP;

  UPDATE cobill SET cobill_invcnum=cobmisc_invcnumber,
		    cobill_invcitem_id=invcitem_id
  FROM invcitem, coitem, cobmisc
  WHERE ((invcitem_linenumber=CASE WHEN(coitem_subnumber > 0) THEN (coitem_linenumber * 1000) + coitem_subnumber ELSE coitem_linenumber END)
    AND  (coitem_id=cobill_coitem_id)
    AND  (cobmisc_id=cobill_cobmisc_id)
    AND  (cobill_cobmisc_id=pCobmiscid)
    AND  (invcitem_invchead_id=_invcheadid));

--  Close all requested coitem''s
  IF ( ( SELECT cobmisc_closeorder
         FROM cobmisc
         WHERE (cobmisc_id=pCobmiscid) ) ) THEN
    UPDATE coitem
    SET coitem_status=''C''
    FROM cobmisc
    WHERE ( (coitem_status NOT IN (''C'', ''X''))
     AND (coitem_cohead_id=cobmisc_cohead_id)
     AND (cobmisc_id=pCobmiscid) );
  ELSE
    UPDATE coitem
    SET coitem_status=''C''
    FROM cobill
    WHERE ( (cobill_coitem_id=coitem_id)
     AND (coitem_status <> ''X'')
     AND (cobill_toclose)
     AND (cobill_cobmisc_id=pCobmiscid) );
  END IF;

--  Mark the cobmisc as posted
  UPDATE cobmisc
  SET cobmisc_posted=TRUE, cobmisc_invchead_id=_invcheadid
  WHERE (cobmisc_id=pCobmiscid);

--  All done
  RETURN _invcheadid;

END;
' LANGUAGE 'plpgsql';
