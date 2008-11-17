CREATE OR REPLACE FUNCTION postCreditMemo(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCmheadid ALIAS FOR $1;
  pItemlocSeries ALIAS FOR $2;
  _return INTEGER;

BEGIN

  SELECT postCreditMemo(pCmheadid, fetchJournalNumber(''AR-CM''), pItemlocSeries) INTO _return;

  RETURN _return;

END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION postCreditMemo(INTEGER, INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pCmheadid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  pItemlocSeries ALIAS FOR $3;
  _r RECORD;
  _p RECORD;
  _aropenid INTEGER;
  _sequence INTEGER;
  _itemlocSeries INTEGER;
  _invhistid INTEGER;
  _test INTEGER;
  _totalAmount NUMERIC   := 0;
  _commissionDue NUMERIC := 0;
  _toApply NUMERIC;
  _toClose BOOLEAN;
  _glDate	DATE;
  _taxBaseValue	NUMERIC	:= 0;

BEGIN

--  Cache some parameters
  SELECT cmhead.*, findARAccount(cmhead_cust_id) AS ar_accnt_id INTO _p
  FROM cmhead
  WHERE (cmhead_id=pCmheadid);

  IF (_p.cmhead_posted) THEN
    RETURN -10;
  END IF;

  IF (_p.cmhead_hold) THEN
    RETURN -11;
  END IF;

  _glDate := COALESCE(_p.cmhead_gldistdate, _p.cmhead_docdate);

  _itemlocSeries = pItemlocSeries;

  SELECT fetchGLSequence() INTO _sequence;

  FOR _r IN SELECT cmitem.*,
                   (cmitem_unitprice / cmitem_price_invuomratio) AS unitprice,
                   ((cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice / cmitem_price_invuomratio)) AS amount,
                   itemsite_id AS itemsite_id,
                   cmhead_number, cmhead_commission,
                   cmhead_cust_id AS cust_id,
                   cmhead_rahead_id,
                   stdCost(item_id) AS cost
            FROM cmhead, cmitem, itemsite, item
            WHERE ( (cmitem_cmhead_id=cmhead_id)
             AND (cmitem_itemsite_id=itemsite_id)
             AND (itemsite_item_id=item_id)
             AND (NOT cmhead_posted)
             AND (cmhead_id=pCmheadid)
             AND (cmitem_qtycredit <> 0 ) ) LOOP

--  Calcuate the Commission to be debited
    _commissionDue := (_commissionDue + (_r.amount * _r.cmhead_commission));

    IF (_r.amount <> 0) THEN
--  Debit the Sales Account for the current cmitem
      SELECT insertIntoGLSeries( _sequence, ''A/R'', ''CM'', _r.cmhead_number,
                                 CASE WHEN _r.cmhead_rahead_id IS NULL THEN
                                   salesaccnt_credit_accnt_id
                                 ELSE
                                   salesaccnt_returns_accnt_id
                                 END,
                               round(currToBase(_p.cmhead_curr_id,
                                                _r.amount * -1,
                                                _p.cmhead_docdate), 2),
                                 _glDate, _p.cmhead_billtoname) INTO _test
      FROM salesaccnt
      WHERE (salesaccnt_id=findSalesAccnt(_r.itemsite_id, _r.cust_id));
      IF (NOT FOUND) THEN
        PERFORM deleteGLSeries(_sequence);
        RETURN -12;
      END IF;
    END IF;

    _taxBaseValue := addTaxToGLSeries(_sequence, _p.cmhead_tax_curr_id,
				      ''A/R'', ''CM'', _p.cmhead_number,
				      _glDate, _p.cmhead_docdate,
				      _r.cmitem_tax_id,
				      0 - COALESCE(_r.cmitem_tax_ratea,0.0),
				      0 - COALESCE(_r.cmitem_tax_rateb,0.0),
				      0 - COALESCE(_r.cmitem_tax_ratec,0.0),
                                      (''Tax liability for '' || _p.cmhead_billtoname));
    IF (_taxBaseValue IS NULL) THEN
      PERFORM deleteGLSeries(_sequence);
      RETURN -13;
    END IF;

--  Record Sales History for this C/M Item
    INSERT INTO cohist
    ( cohist_cust_id, cohist_itemsite_id, cohist_shipto_id, cohist_tax_id,
      cohist_shipdate, cohist_shipvia,
      cohist_ordernumber, cohist_ponumber, cohist_orderdate,
      cohist_doctype, cohist_invcnumber, cohist_invcdate,
      cohist_qtyshipped, cohist_unitprice, cohist_unitcost,
      cohist_salesrep_id, cohist_commission, cohist_commissionpaid,
      cohist_billtoname, cohist_billtoaddress1,
      cohist_billtoaddress2, cohist_billtoaddress3,
      cohist_billtocity, cohist_billtostate, cohist_billtozip,
      cohist_shiptoname, cohist_shiptoaddress1,
      cohist_shiptoaddress2, cohist_shiptoaddress3,
      cohist_shiptocity, cohist_shiptostate, cohist_shiptozip,
      cohist_curr_id,	cohist_taxtype_id,
      cohist_tax_pcta,	cohist_tax_pctb,	cohist_tax_pctc,
      cohist_tax_ratea,	cohist_tax_rateb,	cohist_tax_ratec)
    VALUES
    ( _p.cmhead_cust_id, _r.itemsite_id, _p.cmhead_shipto_id, _r.cmitem_tax_id,
      _p.cmhead_docdate, '''',
      _p.cmhead_number, _p.cmhead_custponumber, _p.cmhead_docdate,
      ''C'', _p.cmhead_invcnumber, _p.cmhead_docdate,
      (_r.cmitem_qtycredit * _r.cmitem_qty_invuomratio * -1), _r.unitprice, _r.cost,
      _p.cmhead_salesrep_id, (_r.cmhead_commission * _r.amount * -1), FALSE,
      _p.cmhead_billtoname, _p.cmhead_billtoaddress1,
      _p.cmhead_billtoaddress2, _p.cmhead_billtoaddress3,
      _p.cmhead_billtocity, _p.cmhead_billtostate, _p.cmhead_billtozip,
      _p.cmhead_shipto_name, _p.cmhead_shipto_address1,
      _p.cmhead_shipto_address2, _p.cmhead_shipto_address3,
      _p.cmhead_shipto_city, _p.cmhead_shipto_state, _p.cmhead_shipto_zipcode,
      _p.cmhead_curr_id,	_r.cmitem_taxtype_id,
      _r.cmitem_tax_pcta,	_r.cmitem_tax_pctb,	_r.cmitem_tax_pctc,
      COALESCE(_r.cmitem_tax_ratea * -1,0.0), COALESCE(_r.cmitem_tax_rateb * -1,0.0), COALESCE(_r.cmitem_tax_ratec * -1,0.0));

    _totalAmount := _totalAmount + round(_r.amount, 2) + currToCurr(_p.cmhead_tax_curr_id,
							  _p.cmhead_curr_id,
							  COALESCE(_r.cmitem_tax_ratea,0.0) +
							  COALESCE(_r.cmitem_tax_rateb,0.0) +
							  COALESCE(_r.cmitem_tax_ratec,0.0),
							  _p.cmhead_docdate);

  END LOOP;

--  Credit the Misc. Account for Miscellaneous Charges
  IF (_p.cmhead_misc <> 0) THEN
    SELECT insertIntoGLSeries( _sequence, ''A/R'', ''CM'', _p.cmhead_number,
                               accnt_id, round(currToBase(_p.cmhead_curr_id,
                                                          _p.cmhead_misc * -1,
                                                          _p.cmhead_docdate), 2),
                               _glDate, _p.cmhead_billtoname) INTO _test
    FROM accnt
    WHERE (accnt_id=_p.cmhead_misc_accnt_id);

--  If the Misc. Charges Account was not found then punt
    IF (NOT FOUND) THEN
      PERFORM deleteGLSeries(_sequence);
      RETURN -14;
    END IF;

--  Record the Sales History for any Misc. Charge
    INSERT INTO cohist
    ( cohist_cust_id, cohist_itemsite_id, cohist_shipto_id, cohist_tax_id,
      cohist_misc_type, cohist_misc_descrip, cohist_misc_id,
      cohist_shipdate, cohist_shipvia,
      cohist_ordernumber, cohist_ponumber, cohist_orderdate,
      cohist_doctype, cohist_invcnumber, cohist_invcdate,
      cohist_qtyshipped, cohist_unitprice, cohist_unitcost,
      cohist_salesrep_id, cohist_commission, cohist_commissionpaid,
      cohist_billtoname, cohist_billtoaddress1,
      cohist_billtoaddress2, cohist_billtoaddress3,
      cohist_billtocity, cohist_billtostate, cohist_billtozip,
      cohist_shiptoname, cohist_shiptoaddress1,
      cohist_shiptoaddress2, cohist_shiptoaddress3,
      cohist_shiptocity, cohist_shiptostate, cohist_shiptozip,
      cohist_curr_id )
    VALUES
    ( _p.cmhead_cust_id, -1, _p.cmhead_shipto_id, _p.cmhead_adjtax_id,
      ''M'', _p.cmhead_misc_descrip, _p.cmhead_misc_accnt_id,
      _p.cmhead_docdate, '''',
      _p.cmhead_number, _p.cmhead_custponumber, _p.cmhead_docdate,
      ''C'', _p.cmhead_invcnumber, _p.cmhead_docdate,
      1, (_p.cmhead_misc * -1), (_p.cmhead_misc * -1),
      _p.cmhead_salesrep_id, 0, FALSE,
      _p.cmhead_billtoname, _p.cmhead_billtoaddress1,
      _p.cmhead_billtoaddress2, _p.cmhead_billtoaddress3,
      _p.cmhead_billtocity, _p.cmhead_billtostate, _p.cmhead_billtozip,
      _p.cmhead_shipto_name, _p.cmhead_shipto_address1,
      _p.cmhead_shipto_address2, _p.cmhead_shipto_address3,
      _p.cmhead_shipto_city, _p.cmhead_shipto_state, _p.cmhead_shipto_zipcode,
      _p.cmhead_curr_id );

--  Cache the Misc. Amount distributed
    _totalAmount := _totalAmount + _p.cmhead_misc;
  END IF;

  -- Credit Tax Adjustments
  IF (COALESCE(_p.cmhead_adjtax_ratea,0.0) != 0 OR COALESCE(_p.cmhead_adjtax_rateb,0.0) != 0 OR
      COALESCE(_p.cmhead_adjtax_ratec,0.0) != 0) THEN
    _taxBaseValue := addTaxToGLSeries(_sequence, _p.cmhead_tax_curr_id,
				      ''A/R'', ''CM'', _p.cmhead_number,
				      _glDate, _p.cmhead_docdate,
				      _p.cmhead_adjtax_id,
				      0 - COALESCE(_p.cmhead_adjtax_ratea,0.0),
				      0 - COALESCE(_p.cmhead_adjtax_rateb,0.0),
				      0 - COALESCE(_p.cmhead_adjtax_ratec,0.0),
                                      (''Tax liability for '' || _p.cmhead_billtoname));
    IF (_taxBaseValue IS NULL) THEN
      PERFORM deleteGLSeries(_sequence);
      RETURN -15;
    END IF;

    _totalAmount := _totalAmount + currToCurr(_p.cmhead_tax_curr_id,
					      _p.cmhead_curr_id,
					      COALESCE(_p.cmhead_adjtax_ratea,0.0) +
					      COALESCE(_p.cmhead_adjtax_rateb,0.0) +
					      COALESCE(_p.cmhead_adjtax_ratec,0.0),
					      _p.cmhead_docdate);
  --  Record the Sales History for misc tax adjustment
    INSERT INTO cohist
    ( cohist_cust_id, cohist_itemsite_id, cohist_shipto_id, cohist_tax_id,
      cohist_misc_type, cohist_misc_descrip,
      cohist_shipdate, cohist_shipvia,
      cohist_ordernumber, cohist_ponumber, cohist_orderdate,
      cohist_doctype, cohist_invcnumber, cohist_invcdate,
      cohist_qtyshipped, cohist_unitprice, cohist_unitcost,
      cohist_salesrep_id, cohist_commission, cohist_commissionpaid,
      cohist_billtoname, cohist_billtoaddress1,
      cohist_billtoaddress2, cohist_billtoaddress3,
      cohist_billtocity, cohist_billtostate, cohist_billtozip,
      cohist_shiptoname, cohist_shiptoaddress1,
      cohist_shiptoaddress2, cohist_shiptoaddress3,
      cohist_shiptocity, cohist_shiptostate, cohist_shiptozip,
      cohist_curr_id,	cohist_taxtype_id,
      cohist_tax_pcta,	cohist_tax_pctb,	cohist_tax_pctc,
      cohist_tax_ratea,	cohist_tax_rateb,	cohist_tax_ratec)
    VALUES
    ( _p.cmhead_cust_id, -1, _p.cmhead_shipto_id, _p.cmhead_adjtax_id,
      ''T'', ''Misc Tax Adjustment'',
      _p.cmhead_docdate, '''',
      _p.cmhead_number, _p.cmhead_custponumber, _p.cmhead_docdate,
      ''C'', _p.cmhead_invcnumber, _p.cmhead_docdate,
      0, 0, 0,
      _p.cmhead_salesrep_id, 0, FALSE,
      _p.cmhead_billtoname, _p.cmhead_billtoaddress1,
      _p.cmhead_billtoaddress2, _p.cmhead_billtoaddress3,
      _p.cmhead_billtocity, _p.cmhead_billtostate, _p.cmhead_billtozip,
      _p.cmhead_shipto_name, _p.cmhead_shipto_address1,
      _p.cmhead_shipto_address2, _p.cmhead_shipto_address3,
      _p.cmhead_shipto_city, _p.cmhead_shipto_state, _p.cmhead_shipto_zipcode,
      _p.cmhead_curr_id,      _p.cmhead_adjtaxtype_id,
      _p.cmhead_adjtax_pcta,  _p.cmhead_adjtax_pctb,  _p.cmhead_adjtax_pctc,
      COALESCE(_p.cmhead_adjtax_ratea * -1,0.0), COALESCE(_p.cmhead_adjtax_rateb * -1,0.0), COALESCE(_p.cmhead_adjtax_ratec * -1,0.0));

  END IF;

--  Debit the Freight Account
  IF (_p.cmhead_freight <> 0) THEN
    SELECT insertIntoGLSeries( _sequence, ''A/R'', ''CM'', _p.cmhead_number,
                               accnt_id,
                               round(currToBase(_p.cmhead_curr_id,
                                                _p.cmhead_freight * -1,
                                                _p.cmhead_docdate), 2),
                               _glDate, _p.cmhead_billtoname) INTO _test
    FROM accnt
    WHERE (accnt_id=findFreightAccount(_p.cmhead_cust_id));

--  If the Freight Charges Account was not found then punt
    IF (NOT FOUND) THEN
      PERFORM deleteGLSeries(_sequence);
      RETURN -16;
    END IF;

    _taxBaseValue := addTaxToGLSeries(_sequence, _p.cmhead_tax_curr_id,
				      ''A/R'', ''CM'', _p.cmhead_number,
				      _glDate, _p.cmhead_docdate,
				      _p.cmhead_freighttax_id,
				      0 - COALESCE(_p.cmhead_freighttax_ratea,0.0),
				      0 - COALESCE(_p.cmhead_freighttax_rateb,0.0),
				      0 - COALESCE(_p.cmhead_freighttax_ratec,0.0),
                                      (''Tax liability for '' || _p.cmhead_billtoname));
    IF (_taxBaseValue IS NULL) THEN
      PERFORM deleteGLSeries(_sequence);
      RETURN -17;
    END IF;

--  Cache the Amount Distributed to Freight
    _totalAmount := _totalAmount + _p.cmhead_freight +
		    currToCurr(_p.cmhead_tax_curr_id, _p.cmhead_curr_id,
			       COALESCE(_p.cmhead_freighttax_ratea,0.0) +
			       COALESCE(_p.cmhead_freighttax_rateb,0.0) +
			       COALESCE(_p.cmhead_freighttax_ratec,0.0),
			       _p.cmhead_docdate);

--  Record the Sales History for any Freight
    INSERT INTO cohist
    ( cohist_cust_id, cohist_itemsite_id, cohist_shipto_id, cohist_tax_id,
      cohist_misc_type, cohist_misc_descrip,
      cohist_shipdate, cohist_shipvia,
      cohist_ordernumber, cohist_ponumber, cohist_orderdate,
      cohist_doctype, cohist_invcnumber, cohist_invcdate,
      cohist_qtyshipped, cohist_unitprice, cohist_unitcost,
      cohist_salesrep_id, cohist_commission, cohist_commissionpaid,
      cohist_billtoname, cohist_billtoaddress1,
      cohist_billtoaddress2, cohist_billtoaddress3,
      cohist_billtocity, cohist_billtostate, cohist_billtozip,
      cohist_shiptoname, cohist_shiptoaddress1,
      cohist_shiptoaddress2, cohist_shiptoaddress3,
      cohist_shiptocity, cohist_shiptostate, cohist_shiptozip,
      cohist_curr_id,	cohist_taxtype_id,
      cohist_tax_pcta,	cohist_tax_pctb,	cohist_tax_pctc,
      cohist_tax_ratea,	cohist_tax_rateb,	cohist_tax_ratec)
    VALUES
    ( _p.cmhead_cust_id, -1, _p.cmhead_shipto_id, _p.cmhead_freighttax_id,
      ''F'', ''Freight Charge'',
      _p.cmhead_docdate, '''',
      _p.cmhead_number, _p.cmhead_custponumber, _p.cmhead_docdate,
      ''C'', _p.cmhead_invcnumber, _p.cmhead_docdate,
      1, (_p.cmhead_freight * -1), (_p.cmhead_freight * -1),
      _p.cmhead_salesrep_id, 0, FALSE,
      _p.cmhead_billtoname, _p.cmhead_billtoaddress1,
      _p.cmhead_billtoaddress2, _p.cmhead_billtoaddress3,
      _p.cmhead_billtocity, _p.cmhead_billtostate, _p.cmhead_billtozip,
      _p.cmhead_shipto_name, _p.cmhead_shipto_address1,
      _p.cmhead_shipto_address2, _p.cmhead_shipto_address3,
      _p.cmhead_shipto_city, _p.cmhead_shipto_state, _p.cmhead_shipto_zipcode,
      _p.cmhead_curr_id,	  _p.cmhead_freighttaxtype_id,
      _p.cmhead_freighttax_pcta,  _p.cmhead_freighttax_pctb,  _p.cmhead_freighttax_pctc,
      COALESCE(_p.cmhead_freighttax_ratea * -1,0.0), COALESCE(_p.cmhead_freighttax_rateb * -1,0.0), COALESCE(_p.cmhead_freighttax_ratec * -1,0.0));

  END IF;

--  Credit the A/R for the total Amount
  IF (_totalAmount <> 0) THEN
    IF (_p.ar_accnt_id != -1) THEN
      PERFORM insertIntoGLSeries( _sequence, ''A/R'', ''CM'', _p.cmhead_number,
                                  _p.ar_accnt_id,
                                  round(currToBase(_p.cmhead_curr_id,
                                                   _totalAmount,
                                                   _p.cmhead_docdate), 2),
                                  _glDate, _p.cmhead_billtoname);
    ELSE
      PERFORM deleteGLSeries(_sequence);
      RETURN -18;
    END IF;
  END IF;

--  Commit the GLSeries;
  PERFORM postGLSeries(_sequence, pJournalNumber);

  IF (_totalAmount <> 0) THEN
--  Create the Invoice aropen item
    SELECT NEXTVAL(''aropen_aropen_id_seq'') INTO _aropenid;
    INSERT INTO aropen
    ( aropen_id, aropen_username, aropen_journalnumber,
      aropen_open, aropen_posted,
      aropen_cust_id, aropen_ponumber,
      aropen_docnumber,
      aropen_applyto, aropen_doctype,
      aropen_docdate, aropen_duedate, aropen_terms_id,
      aropen_amount, aropen_paid,
      aropen_salesrep_id, aropen_commission_due, aropen_commission_paid,
      aropen_ordernumber, aropen_notes,
      aropen_rsncode_id, aropen_curr_id )
    SELECT _aropenid, CURRENT_USER, pJournalNumber,
           TRUE, FALSE,
           cmhead_cust_id, cmhead_custponumber,
           cmhead_number,
           CASE WHEN (cmhead_invcnumber=''-1'') THEN ''OPEN''
                ELSE (cmhead_invcnumber::TEXT)
           END,
           ''C'',
           cmhead_docdate, cmhead_docdate, -1,
           _totalAmount, 0,
           cmhead_salesrep_id, (_commissionDue * -1), FALSE,
           cmhead_number::TEXT, cmhead_comments,
           cmhead_rsncode_id, cmhead_curr_id
    FROM cmhead
    WHERE (cmhead_id=pCmheadid);
  END IF;

-- Handle the Inventory and G/L Transactions for any returned Inventory
  FOR _r IN SELECT cmitem_itemsite_id AS itemsite_id, cmitem_id,
                   (cmitem_qtyreturned * cmitem_qty_invuomratio) AS qty,
                   cmhead_number, cmhead_cust_id AS cust_id, item_number
            FROM cmhead, cmitem, itemsite, item
            WHERE ( (cmitem_cmhead_id=cmhead_id)
             AND (cmitem_itemsite_id=itemsite_id)
             AND (itemsite_item_id=item_id)
             AND (cmitem_qtyreturned <> 0)
             AND (cmhead_id=pCmheadid) ) LOOP

--  Return credited stock to inventory
    IF (_itemlocSeries = 0) THEN
      SELECT NEXTVAL(''itemloc_series_seq'') INTO _itemlocSeries;
    END IF;
    SELECT postInvTrans( itemsite_id, ''RS'', _r.qty,
                         ''S/O'', ''CM'', _r.cmhead_number, '''',
                         (''Credit Return '' || _r.item_number),
                         costcat_asset_accnt_id, resolveCOSAccount(itemsite_id, _r.cust_id), _itemlocSeries ) INTO _invhistid
    FROM itemsite, costcat
    WHERE ( (itemsite_costcat_id=costcat_id)
     AND (itemsite_id=_r.itemsite_id) );

  END LOOP;

--  Update coitem to reflect the returned qty
  FOR _r IN SELECT cmitem_qtyreturned, cmitem_itemsite_id, cohead_id
            FROM cmitem, cmhead, invchead, cohead
            WHERE ( (cmitem_cmhead_id=cmhead_id)
             AND (cmhead_invcnumber=invchead_invcnumber)
             AND (invchead_ordernumber=cohead_number)
             AND (cmhead_id=pCmheadid) ) LOOP
    UPDATE coitem
    SET coitem_qtyreturned = (coitem_qtyreturned + _r.cmitem_qtyreturned)
    WHERE coitem_id IN ( SELECT coitem_id
                         FROM coitem
                         WHERE ( (coitem_cohead_id=_r.cohead_id)
                          AND (coitem_itemsite_id = _r.cmitem_itemsite_id) )
                         LIMIT 1 );
  END LOOP;

--  Mark the cmhead as posted
  UPDATE cmhead
  SET cmhead_posted=TRUE, cmhead_gldistdate=_glDate
  WHERE (cmhead_id=pCmheadid);

--  Find the apply-to document and make the application
  SELECT cmhead_number, cmhead_curr_id, cmhead_docdate,
         aropen_id, aropen_cust_id, aropen_docnumber,
         currToCurr(aropen_curr_id, cmhead_curr_id, aropen_amount - aropen_paid,
                    cmhead_docdate) AS balance INTO _p
  FROM aropen, cmhead
  WHERE ( (aropen_doctype=''I'')
   AND (aropen_docnumber=cmhead_invcnumber)
   AND (cmhead_id=pCmheadid) );
  IF (FOUND) THEN

    IF round(_totalAmount, 2) <= round(_p.balance, 2) THEN
      _toApply = _totalAmount;
    ELSE
      _toApply = _p.balance;
    END IF;

    UPDATE aropen
    SET aropen_paid = round(aropen_paid + currToCurr(_p.cmhead_curr_id,
                                                     aropen_curr_id, _toApply,
                                                     _p.cmhead_docdate), 2)
    WHERE (aropen_id=_p.aropen_id);

--  Alter the new A/R Open Item to reflect the application
    UPDATE aropen
    SET aropen_paid = round(currToCurr(_p.cmhead_curr_id, aropen_curr_id,
                                       _toApply, _p.cmhead_docdate), 2)
    WHERE (aropen_id=_aropenid);

--  Record the application
    INSERT INTO arapply
    ( arapply_cust_id,
      arapply_source_aropen_id, arapply_source_doctype, arapply_source_docnumber,
      arapply_target_aropen_id, arapply_target_doctype, arapply_target_docnumber,
      arapply_fundstype, arapply_refnumber,
      arapply_applied, arapply_closed,
      arapply_postdate, arapply_distdate, arapply_journalnumber, arapply_curr_id )
    VALUES
    ( _p.aropen_cust_id,
      _aropenid, ''C'', _p.cmhead_number,
      _p.aropen_id, ''I'', _p.aropen_docnumber,
      '''', '''',
      round(_toApply, 2), _toClose,
      CURRENT_DATE, _p.cmhead_docdate, 0, _p.cmhead_curr_id );

  END IF;
    
  RETURN _itemlocSeries;

END;
' LANGUAGE 'plpgsql';
