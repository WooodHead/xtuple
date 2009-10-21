CREATE OR REPLACE FUNCTION createbillingheader(integer)
  RETURNS integer AS
$BODY$
DECLARE
  pSoheadid		ALIAS FOR $1;
  _cobmiscid		INTEGER;
  _cohead		cohead%ROWTYPE;
  _freight		NUMERIC;
  _freighttypeid        INTEGER;
  _invcDate		DATE;
  _schedDate		DATE;
  _shipDate		DATE;
  _shipVia		TEXT;
  _tax			NUMERIC;

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

  SELECT NEXTVAL('cobmisc_cobmisc_id_seq') INTO _cobmiscid;

  --  Check for a valid shipdate
  SELECT MIN(shiphead_shipdate) INTO _shipDate
  FROM shiphead, shipitem
  WHERE ( (shipitem_shiphead_id=shiphead_id)
   AND (NOT shipitem_invoiced)
   AND (shiphead_shipped)
   AND (shiphead_order_type='SO')
   AND (shiphead_order_id=pSoheadid) );

  --  Schema shouldn't allow, but we'll try for now
  IF (_shipDate IS NULL) THEN
    SELECT MAX(shipitem_shipdate) INTO _shipDate
    FROM shipitem, shiphead
    WHERE ( (shipitem_shiphead_id=shiphead_id)
     AND (shiphead_order_type='SO')
     AND (shiphead_order_id=pSoheadid) );

    --  How about a transaction date
    IF (_shipDate IS NULL) THEN
      SELECT COALESCE(MAX(shipitem_transdate), CURRENT_DATE) INTO _shipDate
      FROM shipitem, shiphead
      WHERE ((shipitem_shiphead_id=shiphead_id)
        AND  (shiphead_order_type='SO')
        AND  (shiphead_order_id=pSoheadid) );
    END IF;
  END IF;

  --  Get the earliest schedule date for this order.
  SELECT MIN(coitem_scheddate) INTO _schedDate
    FROM coitem
   WHERE ((coitem_status <> 'X') AND (coitem_cohead_id=pSoheadid));

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
    AND  (shiphead_order_type='SO')
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
   AND (shiphead_order_type='SO')
   AND (shiphead_order_id=pSoheadid) )
  LIMIT 1;
  IF (NOT FOUND) THEN
    _shipVia := _cohead.cohead_shipvia;
  END IF;

  --Determine any tax

  SELECT 
  getFreightTaxTypeId() INTO _freighttypeid;
  SELECT SUM(COALESCE(taxdetail_tax, 0.00)) INTO _tax
  FROM calculatetaxdetail(_cohead.cohead_taxzone_id, _freighttypeid, _cohead.cohead_orderdate,_cohead.cohead_curr_id, _freight);

  --  Determine if we are using the _shipDate or _schedDate or current_date for the _invcDate
  IF( fetchMetricText('InvoiceDateSource')='scheddate') THEN
    _invcDate := _schedDate;
  ELSIF( fetchMetricText('InvoiceDateSource')='shipdate') THEN
    _invcDate := _shipDate;
  ELSE
    _invcDate := current_date;
  END IF;

   INSERT INTO cobmisc (
	cobmisc_id, cobmisc_cohead_id, cobmisc_shipvia, cobmisc_freight, cobmisc_misc, cobmisc_payment 
	,cobmisc_notes,cobmisc_shipdate ,cobmisc_invcdate,cobmisc_posted ,cobmisc_tax,cobmisc_misc_accnt_id 
	,cobmisc_misc_descrip,cobmisc_closeorder
	,cobmisc_curr_id,cobmisc_tax_curr_id,cobmisc_adjtaxtype_id
	,cobmisc_freighttaxtype_id,cobmisc_taxtype_id
	,cobmisc_taxzone_id
	)
	SELECT
	_cobmiscid,_cohead.cohead_id,_shipVia,_freight,_cohead.cohead_misc
	,0,_cohead.cohead_ordercomments,_shipDate,_invcDate,FALSE
	,_tax,_cohead.cohead_misc_accnt_id,_cohead.cohead_misc_descrip,NOT(cust_backorder),
        _cohead.cohead_curr_id,_cohead.cohead_curr_id
	,NULL,_freighttypeid
	,NULL,_cohead.cohead_taxzone_id
	FROM custinfo
	WHERE (cust_id=_cohead.cohead_cust_id);

  RETURN _cobmiscid;

END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;