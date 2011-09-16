CREATE OR REPLACE FUNCTION createBillingHeader(INTEGER) RETURNS INTEGER AS '
DECLARE
  pSoheadid		ALIAS FOR $1;
  _cobmiscid		INTEGER;
  _cohead		cohead%ROWTYPE;
  _freight		NUMERIC;
  _invcDate		DATE;
  _schedDate		DATE;
  _shipDate		DATE;
  _shipVia		TEXT;
  _tax			RECORD;

BEGIN

  --  Check for an existing cobmisc
  SELECT cobmisc_id INTO _cobmiscid
  FROM cobmisc
  WHERE ( (NOT cobmisc_posted)
   AND (cobmisc_cohead_id=pSoheadid) );

  IF (FOUND) THEN
    RETURN _cobmiscid;
  END IF;

  SELECT * INTO _cohead
  FROM cohead
  WHERE (cohead_id=pSoheadid);

  SELECT NEXTVAL(''cobmisc_cobmisc_id_seq'') INTO _cobmiscid;

  --  Check for a valid shipdate
  SELECT MIN(shiphead_shipdate) INTO _shipDate
  FROM shiphead, shipitem
  WHERE ( (shipitem_shiphead_id=shiphead_id)
   AND (NOT shipitem_invoiced)
   AND (shiphead_shipped)
   AND (shiphead_order_type=''SO'')
   AND (shiphead_order_id=pSoheadid) );

  --  Schema shouldn''t allow, but we''ll try for now
  IF (_shipDate IS NULL) THEN
    SELECT MAX(shipitem_shipdate) INTO _shipDate
    FROM shipitem, shiphead
    WHERE ( (shipitem_shiphead_id=shiphead_id)
     AND (shiphead_order_type=''SO'')
     AND (shiphead_order_id=pSoheadid) );

    --  How about a transaction date
    IF (_shipDate IS NULL) THEN
      SELECT COALESCE(MAX(shipitem_transdate), CURRENT_DATE) INTO _shipDate
      FROM shipitem, shiphead
      WHERE ((shipitem_shiphead_id=shiphead_id)
        AND  (shiphead_order_type=''SO'')
        AND  (shiphead_order_id=pSoheadid) );
    END IF;
  END IF;

  --  Get the earliest schedule date for this order.
  SELECT MIN(coitem_scheddate) INTO _schedDate
    FROM coitem
   WHERE ((coitem_status <> ''X'') AND (coitem_cohead_id=pSoheadid));

  IF (_schedDate IS NULL) THEN
    _schedDate := _shipDate;
  END IF;

  --  Find a Shipping-Entered freight charge
  SELECT MAX(currToCurr(shiphead_freight_curr_id, _cohead.cohead_curr_id,
			shiphead_freight, CURRENT_DATE)),
	 shiphead_shipvia INTO _freight, _shipVia
  FROM shiphead, shipitem
  WHERE ((shipitem_shiphead_id=shiphead_id)
    AND  (NOT shipitem_invoiced)
    AND  (shiphead_order_type=''SO'')
    AND  (shiphead_order_id=pSoheadid) )
  GROUP BY shiphead_shipvia;

  --  Nope, use the cohead freight charge
  IF (_freight IS NULL) THEN
    _freight	   := _cohead.cohead_freight;
  END IF;

  --  Finally, look for a Shipping-Entered Ship Via
  SELECT shiphead_shipvia INTO _shipVia
  FROM shiphead, shipitem
  WHERE ( (shipitem_shiphead_id=shiphead_id)
   AND (NOT shipitem_invoiced)
   AND (shiphead_order_type=''SO'')
   AND (shiphead_order_id=pSoheadid) )
  LIMIT 1;
  IF (NOT FOUND) THEN
    _shipVia := _cohead.cohead_shipvia;
  END IF;

  --  Determine any tax
  SELECT freight_taxtype_id,
	 freight_tax_id,
	 COALESCE(tax_ratea, 0.0) AS freight_pcnta,
	 COALESCE(tax_rateb, 0.0) AS freight_pcntb,
	 COALESCE(tax_ratec, 0.0) AS freight_pcntc,
	 calculateTax(tax_id, _freight, 0.0, ''A'') AS freight_ratea,
	 calculateTax(tax_id, _freight, 0.0, ''B'') AS freight_rateb,
	 calculateTax(tax_id, _freight, 0.0, ''C'') AS freight_ratec
    INTO _tax
    FROM (SELECT getFreightTaxTypeId() AS freight_taxtype_id,
		 getFreightTaxSelection(_cohead.cohead_taxauth_id) AS freight_tax_id
	 ) AS data
	 LEFT OUTER JOIN tax ON (tax_id=freight_tax_id);

  --  Determine if we are using the _shipDate or _schedDate for the _invcDate
  IF( fetchMetricText(''InvoiceDateSource'')=''scheddate'') THEN
    _invcDate := _schedDate;
  ELSE
    _invcDate := _shipDate;
  END IF;

  INSERT INTO cobmisc
  ( cobmisc_id, cobmisc_cohead_id,
    cobmisc_shipdate, cobmisc_invcdate,
    cobmisc_misc, cobmisc_misc_accnt_id, cobmisc_misc_descrip,
    cobmisc_freight, cobmisc_tax,
    cobmisc_tax_ratea, cobmisc_tax_rateb, cobmisc_tax_ratec,
    cobmisc_payment, cobmisc_shipvia, cobmisc_posted, cobmisc_closeorder,
    cobmisc_curr_id,
    cobmisc_taxauth_id, cobmisc_tax_curr_id,
    cobmisc_adjtax_id, cobmisc_adjtaxtype_id,
    cobmisc_adjtax_pcta, cobmisc_adjtax_pctb, cobmisc_adjtax_pctc,
    cobmisc_adjtax_ratea, cobmisc_adjtax_rateb, cobmisc_adjtax_ratec,
    cobmisc_freighttax_id, cobmisc_freighttaxtype_id,
    cobmisc_freighttax_pcta, cobmisc_freighttax_pctb, cobmisc_freighttax_pctc,
    cobmisc_freighttax_ratea, cobmisc_freighttax_rateb, cobmisc_freighttax_ratec )
  SELECT _cobmiscid, _cohead.cohead_id,
         _shipDate, _invcDate,
         _cohead.cohead_misc, _cohead.cohead_misc_accnt_id, _cohead.cohead_misc_descrip,
         _freight, _tax.freight_ratea + _tax.freight_rateb + _tax.freight_ratec,
         _tax.freight_ratea, _tax.freight_rateb, _tax.freight_ratec,
         0, _shipVia, FALSE, NOT(cust_backorder),
	 _cohead.cohead_curr_id,
         _cohead.cohead_taxauth_id, _cohead.cohead_curr_id,
         NULL, NULL, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
         _tax.freight_tax_id, _tax.freight_taxtype_id,
         _tax.freight_pcnta, _tax.freight_pcntb, _tax.freight_pcntc,
         _tax.freight_ratea, _tax.freight_rateb, _tax.freight_ratec
  FROM custinfo
  WHERE (cust_id=_cohead.cohead_cust_id);

  RETURN _cobmiscid;

END;
' LANGUAGE 'plpgsql';
