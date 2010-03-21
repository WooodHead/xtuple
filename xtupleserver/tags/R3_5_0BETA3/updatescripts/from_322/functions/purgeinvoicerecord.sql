CREATE OR REPLACE FUNCTION purgeInvoiceRecord(DATE, INTEGER) RETURNS TEXT AS $$
DECLARE
  pCutoffDate ALIAS FOR $1;
  pInvcheadId ALIAS FOR $2;
  _r RECORD;
  _ra RECORD;
  _raheadid INTEGER;
  _result INTEGER;
  _debug BOOLEAN := FALSE;

BEGIN

-- Purge records where the entire Invoice, Billing, Shipper, Sales Order
-- chain of associated documents are closed and complete

  FOR _r IN
  SELECT invchead_id, cobmisc_id, shiphead_id, cohead_id
    FROM invchead LEFT OUTER JOIN invcitem ON (invcitem_invchead_id=invchead_id)
                  LEFT OUTER JOIN cobmisc ON (cobmisc_invcnumber::TEXT=invchead_invcnumber)
                  LEFT OUTER JOIN shipitem ON (shipitem_invcitem_id=invcitem_id)
                  LEFT OUTER JOIN shiphead ON (shiphead_id=shipitem_shiphead_id)
                  LEFT OUTER JOIN coitem ON (coitem_id=invcitem_coitem_id)
                  LEFT OUTER JOIN cohead ON (cohead_id=coitem_cohead_id)
   WHERE ( (invchead_id = pInvcheadId)
     AND   (invchead_posted)
     AND   (checkInvoiceSitePrivs(invchead_id)) )
  GROUP BY invchead_id, cobmisc_id, shiphead_id, cohead_id LOOP

-- Check Billing

-- Billing header (cobmisc) must be posted
    SELECT cobmisc_id INTO _result
      FROM cobmisc
     WHERE ( (cobmisc_id=_r.cobmisc_id) AND (NOT cobmisc_posted) );
    IF (FOUND) THEN
      RETURN 'Billing not closed';
    END IF;

-- Billing line items (cobill), associated Invoice line items, and
-- associated Sales Order line items must be closed, posted, and after cutoff date
    SELECT cobill_id INTO _result
      FROM cobill JOIN invcitem ON (invcitem_id=cobill_invcitem_id)
                  JOIN invchead ON ( (invchead_id=invcitem_invchead_id) AND
                                     ((NOT invchead_posted) OR (invchead_invcdate > pCutoffDate)) )
                  JOIN coitem ON ( (coitem_id=cobill_coitem_id) AND
                                   (coitem_status NOT IN ('C', 'X')) )
     WHERE (cobill_cobmisc_id=_r.cobmisc_id);
    IF (FOUND) THEN
      RETURN 'Invoice/Sales Order associated with Billing not closed';
    END IF;

-- Check Shipping

-- Shipping header (shiphead) must be shipped
    SELECT shiphead_id INTO _result
      FROM shiphead
     WHERE ( (shiphead_id=_r.shiphead_id) AND (NOT shiphead_shipped) );
    IF (FOUND) THEN
      RETURN 'Shipper not closed';
    END IF;

-- Shipping line items (shipitem) and associated Sales Order line items
-- must be closed
    SELECT shiphead_id INTO _result
      FROM shiphead, cohead, coitem
     WHERE ( (shiphead_id=_r.shiphead_id)
       AND   ( (shiphead_order_type='SO') AND (shiphead_order_id=cohead_id) )
       AND   (coitem_cohead_id=cohead_id)
       AND   (coitem_status NOT IN ('C', 'X')) );
    IF (FOUND) THEN
      RETURN 'Sales Order associated with Shipper not closed';
    END IF;

-- Shipping line items (shipitem) and associated Invoices must be posted
-- and after cutoff date
    SELECT shiphead_id INTO _result
      FROM shiphead JOIN shipitem ON (shipitem_shiphead_id=shiphead_id)
                    JOIN invcitem ON (invcitem_id=shipitem_invcitem_id)
                    JOIN invchead ON ( (invchead_id=invcitem_invchead_id) AND
                                       ((NOT invchead_posted) OR (invchead_invcdate > pCutoffDate)) )
     WHERE (shiphead_id=_r.shiphead_id);
    IF (FOUND) THEN
      RETURN 'Invoice associated with Shipper not closed';
    END IF;

-- Check Sales Order

-- Sales Order line items (coitem) must be closed
    SELECT cohead_id INTO _result
      FROM cohead JOIN coitem ON ( (coitem_cohead_id=cohead_id) AND
                                   (coitem_status NOT IN ('C', 'X')) )
     WHERE (cohead_id=_r.cohead_id);
    IF (FOUND) THEN
      RETURN 'Sales Order not closed';
    END IF;

-- Check Original Return Authorization and cross check to New Sales Order
    SELECT rahead_id INTO _result
      FROM rahead JOIN raitem ON ( (raitem_rahead_id=rahead_id) AND
                                   (raitem_status NOT IN ('C', 'X')) )
                  JOIN coitem ON ( (coitem_id=raitem_new_coitem_id) AND
                                   (coitem_status NOT IN ('C', 'X')) )
                  JOIN invcitem ON (invcitem_coitem_id=coitem_id)
                  JOIN invchead ON ( (invchead_id=invcitem_invchead_id) AND
                                     ((NOT invchead_posted) OR (invchead_invcdate > pCutoffDate)) )
     WHERE (rahead_orig_cohead_id=_r.cohead_id);
    IF (FOUND) THEN
      RETURN 'Original Return Authorization not closed';
    END IF;

-- Check New Return Authorization
    SELECT rahead_id INTO _result
      FROM rahead JOIN raitem ON ( (raitem_rahead_id=rahead_id) AND
                                   (NOT raitem_status IN ('C', 'X')) )
                  JOIN coitem ON ( (coitem_id=raitem_orig_coitem_id) AND
                                   (NOT coitem_status IN ('C', 'X')) )
                  JOIN invcitem ON (invcitem_coitem_id=coitem_id)
                  JOIN invchead ON ( (invchead_id=invcitem_invchead_id) AND
                                     ((NOT invchead_posted) OR (invchead_invcdate > pCutoffDate)) )
     WHERE (rahead_new_cohead_id=_r.cohead_id);
    IF (FOUND) THEN
      RETURN 'New Return Authorization not closed';
    END IF;

-- Check Lot/Serial Registration

-- Registration associated with Sales Order must be expired
    SELECT lsreg_id INTO _result
      FROM lsreg
     WHERE ( (lsreg_cohead_id=_r.cohead_id)
       AND   (lsreg_expiredate > CURRENT_DATE) );
    IF (FOUND) THEN
      RETURN 'Sales Order Lot/Serial Registration not closed';
    END IF;

-- Registration associated with Shipping must be expired
    SELECT lsreg_id INTO _result
      FROM lsreg
     WHERE ( (lsreg_cohead_id=_r.shiphead_id)
       AND   (lsreg_expiredate > CURRENT_DATE) );
    IF (FOUND) THEN
      RETURN 'Shipper Lot/Serial Registration not closed';
    END IF;

-- Registration associated with Original Return Authorization must be expired
    SELECT rahead_id INTO _result
      FROM rahead JOIN raitem ON (raitem_rahead_id=rahead_id)
                  JOIN raitemls ON (raitemls_raitem_id=raitem_id)
                  JOIN lsreg ON ( (lsreg_ls_id=raitemls_ls_id) AND
                                  (lsreg_expiredate > CURRENT_DATE) )
     WHERE (rahead_orig_cohead_id=_r.cohead_id);
    IF (FOUND) THEN
      RETURN 'Original Return Authorization Lot/Serial Registration not closed';
    END IF;

-- Registration associated with New Return Authorization must be expired
    SELECT rahead_id INTO _result
      FROM rahead JOIN raitem ON (raitem_rahead_id=rahead_id)
                  JOIN raitemls ON (raitemls_raitem_id=raitem_id)
                  JOIN lsreg ON ( (lsreg_ls_id=raitemls_ls_id) AND
                                  (lsreg_expiredate > CURRENT_DATE) )
     WHERE (rahead_new_cohead_id=_r.cohead_id);
    IF (FOUND) THEN
      RETURN 'New Return Authorization Lot/Serial Registration not closed';
    END IF;

-- Cash Advances associated with Sales Order cannot exist
    SELECT aropenco_cohead_id INTO _result   
      FROM aropenco
     WHERE (aropenco_cohead_id=_r.cohead_id);
    IF (FOUND) THEN
      RETURN 'Cash Advance not closed';
    END IF;

  END LOOP;

-- Everything is OK, delete the chain
  FOR _r IN
  SELECT invchead_id, cobmisc_id, shiphead_id, cohead_id
    FROM invchead LEFT OUTER JOIN invcitem ON (invcitem_invchead_id=invchead_id)
                  LEFT OUTER JOIN cobmisc ON (cobmisc_invcnumber::TEXT=invchead_invcnumber)
                  LEFT OUTER JOIN shipitem ON (shipitem_invcitem_id=invcitem_id)
                  LEFT OUTER JOIN shiphead ON (shiphead_id=shipitem_shiphead_id)
                  LEFT OUTER JOIN coitem ON (coitem_id=invcitem_coitem_id)
                  LEFT OUTER JOIN cohead ON (cohead_id=coitem_cohead_id)
   WHERE ( (invchead_id = pInvcheadId)
     AND   (invchead_posted)
     AND   (checkInvoiceSitePrivs(invchead_id)) )
  GROUP BY invchead_id, cobmisc_id, shiphead_id, cohead_id LOOP

    FOR _ra IN
      SELECT rahead_id
      FROM rahead
      WHERE (rahead_orig_cohead_id=_r.cohead_id) LOOP
      IF (_debug) THEN
        RAISE NOTICE 'Deleting Original Return head id %', _ra.rahead_id;
      END IF;
      DELETE FROM raitemls WHERE (raitemls_raitem_id=(SELECT raitem_id
                                                        FROM raitem
                                                       WHERE (raitem_rahead_id=_ra.rahead_id)));
      DELETE FROM rahist WHERE (rahist_rahead_id=_ra.rahead_id);
      DELETE FROM raitem WHERE (raitem_rahead_id=_ra.rahead_id);
      DELETE FROM rahead WHERE (rahead_id=_ra.rahead_id);
    END LOOP;

    FOR _ra IN
      SELECT rahead_id
        FROM rahead
       WHERE (rahead_new_cohead_id=_r.cohead_id) LOOP
      IF (_debug) THEN
        RAISE NOTICE 'Deleting New Return head id %', _ra.rahead_id;
      END IF;
      DELETE FROM raitemls WHERE (raitemls_raitem_id=(SELECT raitem_id
                                                        FROM raitem
                                                       WHERE (raitem_rahead_id=_ra.rahead_id)));
      DELETE FROM rahist WHERE (rahist_rahead_id=_ra.rahead_id);
      DELETE FROM raitem WHERE (raitem_rahead_id=_ra.rahead_id);
      DELETE FROM rahead WHERE (rahead_id=_ra.rahead_id);
    END LOOP;

    IF (_debug) THEN
      RAISE NOTICE 'Deleting Lot/Serial Registrations';
    END IF;
    DELETE FROM lsreg WHERE (lsreg_cohead_id=_r.cohead_id);
    DELETE FROM lsreg WHERE (lsreg_shiphead_id=_r.shiphead_id);

    IF (_debug) THEN
      RAISE NOTICE 'Deleting Sales Order head id %', _r.cohead_id;
    END IF;
    DELETE FROM payco WHERE (payco_cohead_id=_r.cohead_id);
    DELETE FROM backup_payco WHERE (payco_cohead_id=_r.cohead_id);
    DELETE FROM coitem WHERE (coitem_cohead_id=_r.cohead_id);
    DELETE FROM cohead WHERE (cohead_id=_r.cohead_id);

    IF (_debug) THEN
      RAISE NOTICE 'Deleting Ship head id %', _r.shiphead_id;
    END IF;
    DELETE FROM shipitem WHERE (shipitem_shiphead_id=_r.shiphead_id);
    DELETE FROM pack WHERE (pack_shiphead_id=_r.shiphead_id);
    DELETE FROM shiphead WHERE (shiphead_id=_r.shiphead_id);

    IF (_debug) THEN
      RAISE NOTICE 'Deleting Billing head id %', _r.cobmisc_id;
    END IF;
    DELETE FROM cobill WHERE (cobill_cobmisc_id=_r.cobmisc_id);
    DELETE FROM cobmisc WHERE (cobmisc_id=_r.cobmisc_id);
  END LOOP;
  
-- Everything is OK, delete the Invoice
  IF (_debug) THEN
    RAISE NOTICE 'Deleting Invoice head id %', _r.invchead_id;
  END IF;
  DELETE FROM invcitem WHERE (invcitem_invchead_id=_r.invchead_id);
  DELETE FROM invchead WHERE (invchead_id=_r.invchead_id);

  RETURN 'Purged';

END;
$$ LANGUAGE 'plpgsql';
