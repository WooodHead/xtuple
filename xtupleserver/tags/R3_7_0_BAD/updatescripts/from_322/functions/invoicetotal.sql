CREATE OR REPLACE FUNCTION invoiceTotal(INTEGER) RETURNS NUMERIC AS $$
DECLARE
  pInvoiceId ALIAS FOR $1;
  _result NUMERIC;

BEGIN

  SELECT noNeg(invchead_freight + invchead_misc_amount +
                          invchead_tax +
                          COALESCE(SUM(ROUND(((invcitem_billed * invcitem_qty_invuomratio) *
                                              (invcitem_price / COALESCE(invcitem_price_invuomratio,1))),2)), 0) -
                          MAX(total_allocated)) into _result
  FROM invchead
     LEFT OUTER JOIN invcitem ON (invcitem_invchead_id=invchead_id)
     LEFT OUTER JOIN item ON (invcitem_item_id=item_id),
    (SELECT COALESCE(SUM(CASE WHEN((aropen_amount - aropen_paid) >=
                       currToCurr(aropenco_curr_id, aropen_curr_id,
                          aropenco_amount, aropen_docdate))
           THEN currToCurr(aropenco_curr_id, invchead_curr_id,
                   aropenco_amount, aropen_docdate)
           ELSE currToCurr(aropen_curr_id, invchead_curr_id,
                   aropen_amount - aropen_paid, aropen_docdate)
           END),0) AS total_allocated
     FROM aropenco, aropen, cohead, invchead
    WHERE ( (aropenco_aropen_id=aropen_id)
      AND   (aropenco_cohead_id=cohead_id)
      AND   ((aropen_amount - aropen_paid) > 0)
      AND   (cohead_number=invchead_ordernumber)
      AND   (NOT invchead_posted)
      AND   (invchead_id=pInvoiceId) )
    UNION
    SELECT COALESCE(SUM(currToCurr(arapply_curr_id, t.aropen_curr_id,
                                   arapply_applied, t.aropen_docdate)),0) AS total_allocated
     FROM arapply, aropen s, aropen t, invchead
    WHERE ( (s.aropen_id=arapply_source_aropen_id)
      AND   (arapply_target_aropen_id=t.aropen_id)
      AND   (arapply_target_doctype='I')
      AND   (arapply_target_docnumber=invchead_invcnumber)
      AND   (arapply_source_aropen_id=s.aropen_id)
      AND   (invchead_posted)
      AND   (invchead_id=pInvoiceId) )
    ) AS totalalloc
  WHERE (invchead_id=pInvoiceId)
  GROUP BY invchead_freight, invchead_misc_amount, invchead_tax, invchead_payment;

  IF (NOT FOUND) THEN
    return 0;
  ELSE
    RETURN _result;
  END IF;

END;
$$ LANGUAGE 'plpgsql';