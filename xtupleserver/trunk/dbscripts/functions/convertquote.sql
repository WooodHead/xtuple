CREATE OR REPLACE FUNCTION convertQuote(INTEGER) RETURNS INTEGER AS '
DECLARE
  pQuheadid ALIAS FOR $1;
  _soheadid INTEGER;
  _soitemid INTEGER;
  _orderid INTEGER;
  _ordertype CHARACTER(1);
  _creditstatus	TEXT;
  _prospectid	INTEGER;
  _r RECORD;

BEGIN

--  Check to make sure that all of the quote items have a valid itemsite
  SELECT quitem_id INTO _r
    FROM quitem LEFT OUTER JOIN itemsite ON (quitem_itemsite_id=itemsite_id)
   WHERE ((itemsite_id IS NULL)
     AND  (quitem_quhead_id=pQuheadid));
  IF (FOUND) THEN
    INSERT INTO evntlog (evntlog_evnttime, evntlog_username, evntlog_evnttype_id,
                         evntlog_ordtype, evntlog_ord_id, evntlog_warehous_id, evntlog_number)
    SELECT CURRENT_TIMESTAMP, evntnot_username, evnttype_id,
           ''Q'', quhead_id, quhead_warehous_id, quhead_number
    FROM evntnot, evnttype, quhead
    WHERE ( (evntnot_evnttype_id=evnttype_id)
     AND (evntnot_warehous_id=quhead_warehous_id)
     AND (evnttype_name=''CannotConvertQuote'')
     AND (quhead_id=pQuheadid) );

    RETURN -1;
  END IF;

  SELECT cust_creditstatus INTO _creditstatus
  FROM quhead, custinfo
  WHERE ((quhead_cust_id=cust_id)
    AND  (quhead_id=pQuheadid));

  IF (NOT FOUND) THEN
    SELECT prospect_id INTO _prospectid
    FROM quhead, prospect
    WHERE ((quhead_cust_id=prospect_id)
      AND  (quhead_id=pQuheadid));
    IF (NOT FOUND) THEN
      RETURN -2;
    ELSE
      RETURN -3;
    END IF;
  ELSIF (_creditstatus = ''H'' AND NOT hasPriv(''CreateSOForHoldCustomer'')) THEN
    RETURN -4;
  ELSIF (_creditstatus = ''W'' AND NOT hasPriv(''CreateSOForWarnCustomer'')) THEN
    RETURN -5;
  END IF;

  SELECT NEXTVAL(''cohead_cohead_id_seq'') INTO _soheadid;
  INSERT INTO cohead
  ( cohead_id, cohead_number, cohead_cust_id,
    cohead_orderdate, cohead_packdate,
    cohead_custponumber, cohead_warehous_id,
    cohead_billtoname, cohead_billtoaddress1,
    cohead_billtoaddress2, cohead_billtoaddress3,
    cohead_billtocity, cohead_billtostate, cohead_billtozipcode,
    cohead_billtocountry,
    cohead_shipto_id, cohead_shiptoname, cohead_shiptoaddress1,
    cohead_shiptoaddress2, cohead_shiptoaddress3,
    cohead_shiptocity, cohead_shiptostate, cohead_shiptozipcode,
    cohead_shiptocountry,
    cohead_salesrep_id, cohead_commission,
    cohead_tax_id, cohead_terms_id, cohead_shipchrg_id, cohead_shipform_id,
    cohead_fob, cohead_shipvia,
    cohead_ordercomments, cohead_shipcomments,
    cohead_freight, cohead_misc, cohead_misc_accnt_id, cohead_misc_descrip,
    cohead_holdtype, cohead_wasquote, cohead_quote_number, cohead_prj_id,
    cohead_curr_id, cohead_taxauth_id )
  SELECT _soheadid, quhead_number, quhead_cust_id,
         CURRENT_DATE, quhead_packdate,
         quhead_custponumber, quhead_warehous_id,
         quhead_billtoname, quhead_billtoaddress1,
         quhead_billtoaddress2, quhead_billtoaddress3,
         quhead_billtocity, quhead_billtostate, quhead_billtozip,
         quhead_billtocountry,
         quhead_shipto_id, quhead_shiptoname, quhead_shiptoaddress1,
         quhead_shiptoaddress2, quhead_shiptoaddress3,
         quhead_shiptocity, quhead_shiptostate, quhead_shiptozipcode,
         quhead_shiptocountry,
         quhead_salesrep_id, quhead_commission,
         quhead_tax_id, quhead_terms_id, cust_shipchrg_id, cust_shipform_id,
         quhead_fob, quhead_shipvia,
         quhead_ordercomments, quhead_shipcomments,
         quhead_freight, quhead_misc, quhead_misc_accnt_id, quhead_misc_descrip,
         ''N'', TRUE, quhead_number, quhead_prj_id,
	 quhead_curr_id, quhead_taxauth_id
  FROM quhead, cust
  WHERE ( (quhead_cust_id=cust_id)
   AND (quhead_id=pQuheadid) );

  FOR _r IN SELECT quitem.*,
                   quhead_number, quhead_prj_id,
                   itemsite_leadtime, item_type
            FROM quhead, quitem, itemsite, item
            WHERE ( (quitem_quhead_id=quhead_id)
             AND (quitem_itemsite_id=itemsite_id)
             AND (itemsite_item_id=item_id)
             AND (quitem_quhead_id=pQuheadid) ) LOOP

    SELECT NEXTVAL(''coitem_coitem_id_seq'') INTO _soitemid;

    _orderid := -1;
    _ordertype := '''';
    IF (_r.quitem_createorder) THEN

      IF (_r.item_type IN (''M'',''J'')) THEN
        SELECT createWo( _r.quhead_number, supply.itemsite_id, 1, (_r.quitem_qtyord * _r.quitem_qty_invuomratio),
                         _r.itemsite_leadtime, _r.quitem_scheddate, _r.quitem_memo, ''S'', _soitemid, _r.quhead_prj_id ) INTO _orderId
        FROM itemsite sold, itemsite supply
        WHERE ((sold.itemsite_item_id=supply.itemsite_item_id)
         AND (supply.itemsite_warehous_id=_r.quitem_order_warehous_id)
         AND (sold.itemsite_id=_r.quitem_itemsite_id) );
        _orderType := ''W'';

        INSERT INTO charass
              (charass_target_type, charass_target_id, charass_char_id, charass_value)
        SELECT ''W'', _orderId, charass_char_id, charass_value
          FROM charass
         WHERE ((charass_target_type=''QI'')
           AND  (charass_target_id=_r.quitem_id));

      ELSIF (_r.item_type IN (''P'', ''O'')) THEN
        SELECT createPr( _r.quhead_number, _r.quitem_itemsite_id, (_r.quitem_qtyord * _r.quitem_qty_invuomratio),
                         _r.quitem_scheddate, '''', ''S'', _soitemid ) INTO _orderId;
        _orderType := ''R'';
        UPDATE pr SET pr_prj_id=_r.quhead_prj_id WHERE pr_id=_orderId;
      END IF;

    END IF;

    INSERT INTO coitem
    ( coitem_id, coitem_cohead_id, coitem_linenumber, coitem_itemsite_id,
      coitem_status, coitem_scheddate, coitem_promdate,
      coitem_price, coitem_custprice, 
      coitem_qtyord, coitem_qtyshipped, coitem_qtyreturned,
      coitem_qty_uom_id, coitem_qty_invuomratio,
      coitem_price_uom_id, coitem_price_invuomratio,
      coitem_order_type, coitem_order_id,
      coitem_custpn, coitem_memo, coitem_prcost, coitem_tax_id )
    VALUES
    ( _soitemid, _soheadid, _r.quitem_linenumber, _r.quitem_itemsite_id,
      ''O'', _r.quitem_scheddate, _r.quitem_promdate,
      _r.quitem_price, _r.quitem_custprice,
      _r.quitem_qtyord, 0, 0,
      _r.quitem_qty_uom_id, _r.quitem_qty_invuomratio,
      _r.quitem_price_uom_id, _r.quitem_price_invuomratio,
      _ordertype, _orderid,
      _r.quitem_custpn, _r.quitem_memo, _r.quitem_prcost, _r.quitem_tax_id );

    INSERT INTO charass
          (charass_target_type, charass_target_id, charass_char_id, charass_value)
    SELECT ''SI'', _soitemid, charass_char_id, charass_value
      FROM charass
     WHERE ((charass_target_type=''QI'')
       AND  (charass_target_id=_r.quitem_id));

  END LOOP;

  PERFORM deleteQuote(pQuheadid);

  RETURN _soheadid;

END;
' LANGUAGE 'plpgsql';
