CREATE OR REPLACE FUNCTION postInvoice(INTEGER) RETURNS INTEGER AS '
DECLARE
  pInvcheadid ALIAS FOR $1;
  _return INTEGER;

BEGIN

  SELECT postInvoice(pInvcheadid, fetchJournalNumber(''AR-IN'')) INTO _return;

  RETURN _return;

END;
' LANGUAGE 'plpgsql';


-- convenience function for use in postInvoices
-- add tax information to a GL Series
-- return the base currency value of the GL Series records inserted
--	  NULL if there has been an error
CREATE OR REPLACE FUNCTION addTaxToGLSeries(INTEGER, INTEGER, TEXT, TEXT, TEXT, DATE, DATE, INTEGER, NUMERIC, NUMERIC, NUMERIC) RETURNS NUMERIC AS '
  DECLARE
    pSequence	ALIAS FOR $1;
    pTaxCurrId	ALIAS FOR $2;
    pSource	ALIAS FOR $3;
    pDocType	ALIAS FOR $4;
    pDocNumber	ALIAS FOR $5;
    pGLDate	ALIAS FOR $6;
    pExchDate	ALIAS FOR $7;
    pTaxId	ALIAS FOR $8;
    pAvalue	ALIAS FOR $9;
    pBvalue	ALIAS FOR $10;
    pCvalue	ALIAS FOR $11;

    _count	INTEGER;
    _returnVal	NUMERIC;
    _t		RECORD;
    _test	INTEGER;
  BEGIN
    _count := 0;
    _returnVal := 0;

    IF (pTaxId IS NULL) THEN	-- no tax id => not taxed
      RETURN 0;
    END IF;

    FOR _t in SELECT tax_sales_accnt_id AS tax_accnt_id,
		     currToBase(pTaxCurrId, pAvalue, pExchDate) AS tax_baseval
	      FROM tax
	      WHERE tax_id=pTaxId
	        AND pAvalue <> 0
	      UNION
	      SELECT tax_salesb_accnt_id AS tax_accnt_id,
		     currToBase(pTaxCurrId, pBvalue, pExchDate) AS tax_baseval
	      FROM tax
	      WHERE tax_id=pTaxId
	        AND pBvalue <> 0
	      UNION
	      SELECT tax_salesc_accnt_id AS tax_accnt_id,
		     currToBase(pTaxCurrId, pCvalue, pExchDate) AS tax_baseval
	      FROM tax
	      WHERE tax_id=pTaxId
	        AND pCvalue <> 0 LOOP
      _count := _count + 1;
      IF (_t.tax_accnt_id IS NOT NULL AND _t.tax_accnt_id > 0) THEN
	_t.tax_baseval := ROUND(_t.tax_baseval, 2);
	SELECT insertIntoGLSeries( pSequence, pSource, pDocType, pDocNumber,
				   _t.tax_accnt_id, _t.tax_baseval,
				   pGLDate ) INTO _test;
	IF (_test < 0) THEN
	  RETURN NULL;	-- error: insertIntoGLSeries failed
	END IF;
	_returnVal := _returnVal + _t.tax_baseval;
      END IF;
    END LOOP;

    IF (_count = 0 AND (pAvalue + pBvalue + pCvalue) <> 0) THEN
      RETURN NULL; -- error: if there is a tax value then we must find the accounts
    END IF;

    RETURN _returnVal;
  END;
' LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION postInvoice(INTEGER, INTEGER) RETURNS INTEGER AS '
DECLARE
  pInvcheadid ALIAS FOR $1;
  pJournalNumber ALIAS FOR $2;
  _aropenid NUMERIC;
  _amount NUMERIC;
  _roundedBase NUMERIC;
  _sequence INTEGER;
  _r RECORD;
  _p RECORD;
  _test INTEGER;
  _totalAmount          NUMERIC := 0;
  _totalRoundedBase     NUMERIC := 0;
  _totalAmountBase      NUMERIC := 0;
  _appliedAmount        NUMERIC := 0;
  _commissionDue        NUMERIC := 0;
  _tmpAccntId INTEGER;
  _tmpCurrId  INTEGER;
  _firstExchDate        DATE;
  _glDate		DATE;
  _exchGain             NUMERIC := 0;
  _taxBaseValue		NUMERIC := 0;

BEGIN

  IF ( ( SELECT invchead_posted
         FROM invchead
         WHERE (invchead_id=pInvcheadid) ) ) THEN
    RETURN -10;
  END IF;

--  Cache some parameters
  SELECT invchead.*, fetchGLSequence() AS sequence,
         findFreightAccount(invchead_cust_id) AS freightaccntid,
         findARAccount(invchead_cust_id) AS araccntid
       INTO _p 
  FROM invchead
  WHERE (invchead_id=pInvcheadid);

  _glDate := COALESCE(_p.invchead_gldistdate, _p.invchead_invcdate);

-- the 1st MC iteration used the cohead_orderdate so we could get curr exch
-- gain/loss between the sales and invoice dates, but see issue 3892.  leave
-- this condition TRUE until we make this configurable or decide not to.
  IF TRUE THEN
      _firstExchDate := _p.invchead_invcdate;
  ELSE
-- can we save a select by using: _firstExchDate := _p.invchead_orderdate;
      SELECT cohead_orderdate INTO _firstExchDate
      FROM cohead JOIN invchead ON (cohead_number = invchead_ordernumber)
      WHERE (invchead_id = pInvcheadid);
  END IF;

--  March through the non-misc invcitems
  FOR _r IN SELECT invcitem.*,
                   itemsite_id, item_id,
                   (SUM(shipitem_value) / r.invcitem_billed * _r.invcitem_qty_invuomratio) AS cost
            FROM item, invcitem LEFT OUTER JOIN
		 itemsite ON ((invcitem_item_id=itemsite_item_id)
			     AND (invcitem_warehous_id=itemsite_warehous_id))
                 shipitem ON (invcitem_id=shipitem_invcitem_id)
            WHERE ((invcitem_item_id=item_id)
              AND  (invcitem_invchead_id=pInvcheadid) ) LOOP

--  Cache the amount due for this line
    _amount := round(((_r.invcitem_billed * _r.invcitem_qty_invuomratio) * (_r.invcitem_price / _r.invcitem_price_invuomratio)), 2);

    IF (_amount > 0) THEN
--  Credit the Sales Account for the invcitem item
      IF (_r.itemsite_id IS NULL) THEN
	SELECT salesaccnt_sales_accnt_id INTO _tmpAccntId
	FROM salesaccnt
	WHERE (salesaccnt_id=findSalesAccnt(_r.item_id, ''I'',
					    _p.invchead_cust_id));
      ELSE
	SELECT salesaccnt_sales_accnt_id INTO _tmpAccntId
	FROM salesaccnt
	WHERE (salesaccnt_id=findSalesAccnt(_r.itemsite_id, ''IS'',
					    _p.invchead_cust_id));
      END IF;

--  If the Sales Account Assignment was not found then punt
      IF (NOT FOUND) THEN
        PERFORM deleteGLSeries(_p.sequence);
        DELETE FROM cohist
         WHERE ((cohist_sequence=_p.sequence)
           AND  (cohist_invcnumber=_p.invchead_invcnumber));
        RETURN -11;
      END IF;

      _roundedBase := round(currToBase(_p.invchead_curr_id, _amount,
                                      _firstExchDate), 2);
      SELECT insertIntoGLSeries( _p.sequence, ''A/R'', ''IN'',
                                 _p.invchead_invcnumber, _tmpAccntId,
                                 _roundedBase, _glDate ) INTO _test;

      _totalAmount := (_totalAmount + _amount);
      _totalRoundedBase := _totalRoundedBase + _roundedBase;
      _commissionDue := (_commissionDue + (_amount * _p.invchead_commission));
    END IF;

    _taxBaseValue := addTaxToGLSeries(_p.sequence, _p.invchead_tax_curr_id,
				      ''A/R'', ''IN'', _p.invchead_invcnumber,
				      _glDate, _firstExchDate,
				      _r.invcitem_tax_id,
				      COALESCE(_r.invcitem_tax_ratea,0.0),
				      COALESCE(_r.invcitem_tax_rateb,0.0),
				      COALESCE(_r.invcitem_tax_ratec,0.0));
    IF (_taxBaseValue IS NULL) THEN
      PERFORM deleteGLSeries(_p.sequence);
      DELETE FROM cohist
       WHERE ((cohist_sequence=_p.sequence)
	 AND  (cohist_invcnumber=_p.invchead_invcnumber));
      RETURN -12;
    END IF;
    _totalAmount := _totalAmount + currToCurr(_p.invchead_tax_curr_id,
					      _p.invchead_curr_id,
					      COALESCE(_r.invcitem_tax_ratea,0.0) +
					      COALESCE(_r.invcitem_tax_rateb,0.0) +
					      COALESCE(_r.invcitem_tax_ratec,0.0),
					      _firstExchDate);
    _totalRoundedBase := _totalRoundedBase + _taxBaseValue;

--  Record Sales History for this S/O Item
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
      cohist_curr_id, cohist_sequence, cohist_taxtype_id,
      cohist_tax_pcta, cohist_tax_pctb, cohist_tax_pctc,
      cohist_tax_ratea, cohist_tax_rateb, cohist_tax_ratec)
    VALUES
    ( _p.invchead_cust_id, _r.itemsite_id, _p.invchead_shipto_id, _r.invcitem_tax_id,
      _p.invchead_shipdate, _p.invchead_shipvia,
      _p.invchead_ordernumber, _p.invchead_ponumber, _p.invchead_orderdate,
      ''I'', _p.invchead_invcnumber, _p.invchead_invcdate,
      (_r.invcitem_billed * _r.invcitem_qty_invuomratio), (_r.invcitem_price / _r.invcitem_price_invuomratio), _r.cost,
      _p.invchead_salesrep_id, (_p.invchead_commission * (_r.invcitem_billed * _r.invcitem_qty_invuomratio) * (_r.invcitem_price / _r.invcitem_price_invuomratio)), FALSE,
      _p.invchead_billto_name, _p.invchead_billto_address1,
      _p.invchead_billto_address2, _p.invchead_billto_address3,
      _p.invchead_billto_city, _p.invchead_billto_state, _p.invchead_billto_zipcode,
      _p.invchead_shipto_name, _p.invchead_shipto_address1,
      _p.invchead_shipto_address2, _p.invchead_shipto_address3,
      _p.invchead_shipto_city, _p.invchead_shipto_state,
      _p.invchead_shipto_zipcode, _p.invchead_tax_curr_id,
      _p.sequence, _r.invcitem_taxtype_id,
      _r.invcitem_tax_pcta, _r.invcitem_tax_pctb, _r.invcitem_tax_pctc,
      COALESCE(_r.invcitem_tax_ratea,0.0), COALESCE(_r.invcitem_tax_rateb,0.0), COALESCE(_r.invcitem_tax_ratec,0.0));

  END LOOP;

--  March through the misc invcitems
  FOR _r IN SELECT invcitem.*,
                   salescat_sales_accnt_id
            FROM invcitem, salescat
            WHERE ( (invcitem_item_id=-1)
             AND (invcitem_salescat_id=salescat_id)
             AND (invcitem_invchead_id=pInvcheadid) ) LOOP

--  Cache the amount due for this line and the commission due for such
    _amount := round((_r.invcitem_billed * _r.invcitem_price), 2);

    IF (_amount > 0) THEN
--  Credit the Sales Account for the invcitem item
      _roundedBase = round(currToBase(_p.invchead_curr_id, _amount,
                                      _firstExchDate), 2);
      SELECT insertIntoGLSeries( _p.sequence, ''A/R'', ''IN'', _p.invchead_invcnumber,
                                 _r.salescat_sales_accnt_id, _roundedBase,
                                 _glDate ) INTO _test;
      IF (_test < 0) THEN
        PERFORM deleteGLSeries(_p.sequence);
        DELETE FROM cohist
         WHERE ((cohist_sequence=_p.sequence)
           AND  (cohist_invcnumber=_p.invchead_invcnumber));
        RETURN _test;
      END IF;

      _totalAmount := (_totalAmount + _amount);
      _totalRoundedBase :=  _totalRoundedBase + _roundedBase;
      _commissionDue := (_commissionDue + (_amount * _p.invchead_commission));
    END IF;

    _taxBaseValue := addTaxToGLSeries(_p.sequence, _p.invchead_tax_curr_id,
				      ''A/R'', ''IN'', _p.invchead_invcnumber,
				      _glDate, _firstExchDate,
				      _r.invcitem_tax_id,
				      COALESCE(_r.invcitem_tax_ratea,0.0),
				      COALESCE(_r.invcitem_tax_rateb,0.0),
				      COALESCE(_r.invcitem_tax_ratec,0.0));
    IF (_taxBaseValue IS NULL) THEN
      PERFORM deleteGLSeries(_p.sequence);
      DELETE FROM cohist
       WHERE ((cohist_sequence=_p.sequence)
	 AND  (cohist_invcnumber=_p.invchead_invcnumber));
      RETURN -13;
    END IF;
    _totalAmount := _totalAmount + currToCurr(_p.invchead_tax_curr_id,
					      _p.invchead_curr_id,
					      COALESCE(_r.invcitem_tax_ratea,0.0) +
					      COALESCE(_r.invcitem_tax_rateb,0.0) +
					      COALESCE(_r.invcitem_tax_ratec,0.0),
					      _firstExchDate);
    _totalRoundedBase := _totalRoundedBase + _taxBaseValue;

--  Record Sales History for this S/O Item
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
      cohist_curr_id, cohist_sequence, cohist_taxtype_id,
      cohist_tax_pcta, cohist_tax_pctb, cohist_tax_pctc,
      cohist_tax_ratea, cohist_tax_rateb, cohist_tax_ratec)
    VALUES
    ( _p.invchead_cust_id, -1, _p.invchead_shipto_id, _r.invcitem_tax_id,
      ''M'', (_r.invcitem_number || ''-'' || _r.invcitem_descrip),
      _p.invchead_shipdate, _p.invchead_shipvia,
      _p.invchead_ordernumber, _p.invchead_ponumber, _p.invchead_orderdate,
      ''I'', _p.invchead_invcnumber, _p.invchead_invcdate,
      _r.invcitem_billed, _r.invcitem_price, 0,
      _p.invchead_salesrep_id, (_p.invchead_commission * _r.invcitem_billed * _r.invcitem_price), FALSE,
      _p.invchead_billto_name, _p.invchead_billto_address1,
      _p.invchead_billto_address2, _p.invchead_billto_address3,
      _p.invchead_billto_city, _p.invchead_billto_state, _p.invchead_billto_zipcode,
      _p.invchead_shipto_name, _p.invchead_shipto_address1,
      _p.invchead_shipto_address2, _p.invchead_shipto_address3,
      _p.invchead_shipto_city, _p.invchead_shipto_state,
      _p.invchead_shipto_zipcode, _p.invchead_tax_curr_id,
      _p.sequence, _r.invcitem_taxtype_id,
      _r.invcitem_tax_pcta, _r.invcitem_tax_pctb, _r.invcitem_tax_pctc,
      COALESCE(_r.invcitem_tax_ratea,0.0), COALESCE(_r.invcitem_tax_rateb,0.0), COALESCE(_r.invcitem_tax_ratec,0.0));

  END LOOP;

--  Credit the Freight Account for Freight Charges
  IF (_p.invchead_freight <> 0) THEN
    IF (_p.freightaccntid <> -1) THEN
      _roundedBase = round(currToBase(_p.invchead_curr_id, _p.invchead_freight,
                                      _firstExchDate), 2);
      SELECT insertIntoGLSeries( _p.sequence, ''A/R'', ''IN'', _p.invchead_invcnumber,
                                 _p.freightaccntid, _roundedBase,
                                 _glDate ) INTO _test;

--  Cache the Freight Amount distributed
        _totalAmount := (_totalAmount + _p.invchead_freight);
        _totalRoundedBase := _totalRoundedBase + _roundedBase;
    ELSE
      _test := -14;
    END IF;

--  If the Freight Account was not found then punt
    IF (_test < 0) THEN
      PERFORM deleteGLSeries(_p.sequence);
      DELETE FROM cohist
       WHERE ((cohist_sequence=_p.sequence)
         AND  (cohist_invcnumber=_p.invchead_invcnumber));
      RETURN _test;
    END IF;

    _taxBaseValue := addTaxToGLSeries(_p.sequence, _p.invchead_tax_curr_id,
				      ''A/R'', ''IN'', _p.invchead_invcnumber,
				      _glDate, _firstExchDate,
				      _p.invchead_freighttax_id,
				      COALESCE(_p.invchead_freighttax_ratea,0.0),
				      COALESCE(_p.invchead_freighttax_rateb,0.0),
				      COALESCE(_p.invchead_freighttax_ratec,0.0));
    IF (_taxBaseValue IS NULL) THEN
      PERFORM deleteGLSeries(_p.sequence);
      DELETE FROM cohist
       WHERE ((cohist_sequence=_p.sequence)
	 AND  (cohist_invcnumber=_p.invchead_invcnumber));
      RETURN -15;
    END IF;
    _totalAmount := _totalAmount + currToCurr(_p.invchead_tax_curr_id,
					      _p.invchead_curr_id,
					      COALESCE(_p.invchead_freighttax_ratea,0.0) +
					      COALESCE(_p.invchead_freighttax_rateb,0.0) +
					      COALESCE(_p.invchead_freighttax_ratec,0.0),
					      _firstExchDate);
    _totalRoundedBase := _totalRoundedBase + _taxBaseValue;

--  Record Sales History for the Freight
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
      cohist_curr_id, cohist_sequence, cohist_taxtype_id,
      cohist_tax_pcta, cohist_tax_pctb, cohist_tax_pctc,
      cohist_tax_ratea, cohist_tax_rateb, cohist_tax_ratec)
    VALUES
    ( _p.invchead_cust_id, -1, _p.invchead_shipto_id, _p.invchead_freighttax_id,
      ''F'', ''Freight'',
      _p.invchead_shipdate, _p.invchead_shipvia,
      _p.invchead_ordernumber, _p.invchead_ponumber, _p.invchead_orderdate,
      ''I'', _p.invchead_invcnumber, _p.invchead_invcdate,
      1, _p.invchead_freight, _p.invchead_freight,
      _p.invchead_salesrep_id, 0, FALSE,
      _p.invchead_billto_name, _p.invchead_billto_address1,
      _p.invchead_billto_address2, _p.invchead_billto_address3,
      _p.invchead_billto_city, _p.invchead_billto_state, _p.invchead_billto_zipcode,
      _p.invchead_shipto_name, _p.invchead_shipto_address1,
      _p.invchead_shipto_address2, _p.invchead_shipto_address3,
      _p.invchead_shipto_city, _p.invchead_shipto_state,
      _p.invchead_shipto_zipcode, _p.invchead_tax_curr_id,
      _p.sequence, _r.invcitem_taxtype_id,
      _p.invchead_freighttax_pcta, _p.invchead_freighttax_pctb, _p.invchead_freighttax_pctc,
      COALESCE(_p.invchead_freighttax_ratea,0.0), COALESCE(_p.invchead_freighttax_rateb,0.0), COALESCE(_p.invchead_freighttax_ratec,0.0));

  END IF;

--  Credit the Misc. Account for Miscellaneous Charges
  IF (_p.invchead_misc_amount <> 0) THEN
    _roundedBase := round(currToBase(_p.invchead_curr_id, _p.invchead_misc_amount,
                                     _firstExchDate), 2);
    SELECT insertIntoGLSeries( _p.sequence, ''A/R'', ''IN'', _p.invchead_invcnumber,
                               _p.invchead_misc_accnt_id, _roundedBase,
                               _glDate ) INTO _test;

--  If the Misc. Charges Account was not found then punt
    IF (_test < 0) THEN
      PERFORM deleteGLSeries(_p.sequence);
      DELETE FROM cohist
       WHERE ((cohist_sequence=_p.sequence)
         AND  (cohist_invcnumber=_p.invchead_invcnumber));
      RETURN _test;
    END IF;

--  Cache the Misc. Amount distributed
    _totalAmount := (_totalAmount + _p.invchead_misc_amount);
    _totalRoundedBase := _totalRoundedBase + _roundedBase;

--  Record Sales History for the Misc. Charge
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
      cohist_curr_id, cohist_sequence )
    VALUES
    ( _p.invchead_cust_id, -1, _p.invchead_shipto_id, _p.invchead_adjtax_id,
      ''M'', _p.invchead_misc_descrip, _p.invchead_misc_accnt_id,
      _p.invchead_shipdate, _p.invchead_shipvia,
      _p.invchead_ordernumber, _p.invchead_ponumber, _p.invchead_orderdate,
      ''I'', _p.invchead_invcnumber, _p.invchead_invcdate,
      1, _p.invchead_misc_amount, _p.invchead_misc_amount,
      _p.invchead_salesrep_id, 0, FALSE,
      _p.invchead_billto_name, _p.invchead_billto_address1,
      _p.invchead_billto_address2, _p.invchead_billto_address3,
      _p.invchead_billto_city, _p.invchead_billto_state, _p.invchead_billto_zipcode,
      _p.invchead_shipto_name, _p.invchead_shipto_address1,
      _p.invchead_shipto_address2, _p.invchead_shipto_address3,
      _p.invchead_shipto_city, _p.invchead_shipto_state,
      _p.invchead_shipto_zipcode, _p.invchead_curr_id,
      _p.sequence );

  END IF;

  _taxBaseValue := addTaxToGLSeries(_p.sequence, _p.invchead_tax_curr_id,
				    ''A/R'', ''IN'', _p.invchead_invcnumber,
				    _glDate, _firstExchDate,
				    _p.invchead_adjtax_id,
				    COALESCE(_p.invchead_adjtax_ratea,0.0),
				    COALESCE(_p.invchead_adjtax_rateb,0.0),
				    COALESCE(_p.invchead_adjtax_ratec,0.0));
  IF (_taxBaseValue IS NULL) THEN
    PERFORM deleteGLSeries(_p.sequence);
    DELETE FROM cohist
     WHERE ((cohist_sequence=_p.sequence)
       AND  (cohist_invcnumber=_p.invchead_invcnumber));
    RETURN -16;
  END IF;
  _totalAmount := _totalAmount + currToCurr(_p.invchead_tax_curr_id,
					    _p.invchead_curr_id,
					    COALESCE(_p.invchead_adjtax_ratea,0.0) +
					    COALESCE(_p.invchead_adjtax_rateb,0.0) +
					    COALESCE(_p.invchead_adjtax_ratec,0.0),
					    _firstExchDate);
  _totalRoundedBase := _totalRoundedBase + _taxBaseValue;

--  Record Sales History for the Adj Tax
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
    cohist_curr_id, cohist_sequence, cohist_taxtype_id,
    cohist_tax_pcta, cohist_tax_pctb, cohist_tax_pctc,
    cohist_tax_ratea, cohist_tax_rateb, cohist_tax_ratec)
  VALUES
  ( _p.invchead_cust_id, -1, _p.invchead_shipto_id, _p.invchead_adjtax_id,
    ''T'', ''Misc Tax Adjustment'',
    _p.invchead_shipdate, _p.invchead_shipvia,
    _p.invchead_ordernumber, _p.invchead_ponumber, _p.invchead_orderdate,
    ''I'', _p.invchead_invcnumber, _p.invchead_invcdate,
    1, 0.0, 0.0,
    _p.invchead_salesrep_id, 0, FALSE,
    _p.invchead_billto_name, _p.invchead_billto_address1,
    _p.invchead_billto_address2, _p.invchead_billto_address3,
    _p.invchead_billto_city, _p.invchead_billto_state, _p.invchead_billto_zipcode,
    _p.invchead_shipto_name, _p.invchead_shipto_address1,
    _p.invchead_shipto_address2, _p.invchead_shipto_address3,
    _p.invchead_shipto_city, _p.invchead_shipto_state,
    _p.invchead_shipto_zipcode, _p.invchead_tax_curr_id,
    _p.sequence, _r.invcitem_taxtype_id,
    _p.invchead_adjtax_pcta, _p.invchead_adjtax_pctb, _p.invchead_adjtax_pctc,
    COALESCE(_p.invchead_adjtax_ratea,0.0), COALESCE(_p.invchead_adjtax_rateb,0.0), COALESCE(_p.invchead_adjtax_ratec,0.0));

-- ToDo: handle rounding errors
    _exchGain := currGain(_p.invchead_curr_id, _totalAmount,
                          _firstExchDate, _glDate);
    IF (_exchGain <> 0) THEN
        SELECT insertIntoGLSeries( _p.sequence, ''A/R'', ''IN'',
                                   _p.invchead_invcnumber, getGainLossAccntId(),
                                   round(_exchGain, 2) * -1,
                                   _glDate ) INTO _test ;
        IF (_test < 0) THEN
          PERFORM deleteGLSeries(_p.sequence);
          DELETE FROM cohist
           WHERE ((cohist_sequence=_p.sequence)
             AND  (cohist_invcnumber=_p.invchead_invcnumber));
          RETURN _test;
        END IF;
    END IF;

--  Debit A/R for the total Amount
  IF (_totalRoundedBase <> 0) THEN
    IF (_p.araccntid != -1) THEN
      PERFORM insertIntoGLSeries( _p.sequence, ''A/R'', ''IN'', _p.invchead_invcnumber,
                                  _p.araccntid, round(_totalRoundedBase * -1, 2),
                                  _glDate );
    ELSE
      PERFORM deleteGLSeries(_p.sequence);
      DELETE FROM cohist
       WHERE ((cohist_sequence=_p.sequence)
         AND  (cohist_invcnumber=_p.invchead_invcnumber));
      RETURN -17;
    END IF;
  END IF;

--  Commit the GLSeries;
  SELECT postGLSeries(_p.sequence, pJournalNumber) INTO _test;
  IF (_test < 0) THEN
    PERFORM deleteGLSeries(_p.sequence);
    DELETE FROM cohist
     WHERE ((cohist_sequence=_p.sequence)
       AND  (cohist_invcnumber=_p.invchead_invcnumber));
    RETURN _test;
  END IF;

  IF (round(_totalAmount, 2) <> 0) THEN
--  Create the Invoice aropen item
    SELECT nextval(''aropen_aropen_id_seq'') INTO _aropenid;
    INSERT INTO aropen
    ( aropen_id, aropen_username, aropen_journalnumber,
      aropen_open, aropen_posted,
      aropen_cust_id, aropen_ponumber,
      aropen_docnumber, aropen_applyto, aropen_doctype,
      aropen_docdate, aropen_duedate, aropen_terms_id,
      aropen_amount, aropen_paid,
      aropen_salesrep_id, aropen_commission_due, aropen_commission_paid,
      aropen_ordernumber, aropen_notes, aropen_cobmisc_id,
      aropen_curr_id )
    VALUES
    ( _aropenid, CURRENT_USER, pJournalNumber,
      TRUE, FALSE,
      _p.invchead_cust_id, _p.invchead_ponumber,
      _p.invchead_invcnumber, _p.invchead_invcnumber, ''I'',
      _p.invchead_invcdate, determineDueDate(_p.invchead_terms_id, _p.invchead_invcdate), _p.invchead_terms_id,
      round(_totalAmount, 2), 0, 
      _p.invchead_salesrep_id, _commissionDue, FALSE,
      _p.invchead_ordernumber::text, _p.invchead_notes, pInvcheadid,
      _p.invchead_curr_id );
  END IF;

--  Mark the invoice as posted
  UPDATE invchead
  SET invchead_posted=TRUE, invchead_gldistdate=_glDate
  WHERE (invchead_id=pInvcheadid);
 
  IF (_totalAmount > 0) THEN
    -- get a list of allocated CMs
    FOR _r IN SELECT aropen_id,
		     CASE WHEN((aropen_amount - aropen_paid) >=
				currToCurr(aropenco_curr_id, aropen_curr_id,
					  aropenco_amount, aropen_docdate)) THEN
			      currToCurr(aropenco_curr_id, aropen_curr_id,
					 aropenco_amount, aropen_docdate)
			  ELSE (aropen_amount - aropen_paid)
		     END AS balance,
		     aropen_curr_id
                FROM aropenco, aropen, cohead
               WHERE ( (aropenco_aropen_id=aropen_id)
                 AND   (aropenco_cohead_id=cohead_id)
                 AND   (cohead_number=_p.invchead_ordernumber) ) LOOP

      _appliedAmount := _r.balance;
      IF (_totalAmount < currToCurr(_r.aropen_curr_id, _p.invchead_curr_id,
				    _appliedAmount, _firstExchDate)) THEN
        _appliedAmount := _totalAmount;
	_tmpCurrId := _p.invchead_curr_id;
      ELSE
	_tmpCurrId := _r.aropen_curr_id;
      END IF;

      -- ignore if no appliable balance
      IF (_appliedAmount > 0) THEN
        -- create an arcreditapply record linking the source c/m and the target invoice
        -- for an amount that is equal to the balance on the invoice or the balance on
        -- c/m whichever is greater.
        INSERT INTO arcreditapply
              (arcreditapply_source_aropen_id, arcreditapply_target_aropen_id,
	       arcreditapply_amount, arcreditapply_curr_id)
        VALUES(_r.aropen_id, _aropenid, _appliedAmount, _tmpCurrId);

        -- call postARCreditMemoApplication(aropen_id of C/M)
        SELECT postARCreditMemoApplication(_r.aropen_id) into _test;

        -- if no error decrement the balance and contiue on
        IF (_test >= 0) THEN
          _totalAmount := _totalAmount - currToCurr(_tmpCurrId, _p.invchead_curr_id,
						    _appliedAmount, _firstExchDate);
        END IF;
      END IF;
    END LOOP;
  END IF;

  RETURN pJournalNumber;

END;
' LANGUAGE plpgsql;
