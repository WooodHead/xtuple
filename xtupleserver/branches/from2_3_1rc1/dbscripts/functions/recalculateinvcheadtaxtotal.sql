CREATE OR REPLACE FUNCTION recalculateInvcheadTaxTotal(INTEGER) RETURNS VOID AS '
DECLARE
  pInvcheadid ALIAS FOR $1;
  _r RECORD;
BEGIN
  SELECT COALESCE(invchead_adjtax_ratea, 0.0) +
	 COALESCE(invchead_freighttax_ratea, 0.0) +
	 COALESCE(SUM(COALESCE(invcitem_tax_ratea, 0.0)), 0.0) AS rateA,
         COALESCE(invchead_adjtax_rateb, 0.0) +
	 COALESCE(invchead_freighttax_rateb, 0.0) +
	 COALESCE(SUM(COALESCE(invcitem_tax_rateb, 0.0)), 0.0) AS rateB,
         COALESCE(invchead_adjtax_ratec, 0.0) +
	 COALESCE(invchead_freighttax_ratec, 0.0) +
	 COALESCE(SUM(COALESCE(invcitem_tax_ratec, 0.0)), 0.0) AS rateC
    INTO _r
    FROM invchead LEFT OUTER JOIN invcitem ON (invcitem_invchead_id=invchead_id)
   WHERE (invchead_id=pInvcheadid)
   GROUP BY invchead_adjtax_ratea, invchead_freighttax_ratea,
            invchead_adjtax_rateb, invchead_freighttax_rateb,
            invchead_adjtax_ratec, invchead_freighttax_ratec;
  -- invchead_tax and invchead_tax_rate[abc] have been retained for
  -- backward-compatibility, so put them in the invoice currency
  IF (FOUND) THEN
    UPDATE invchead
       SET invchead_tax = currToCurr(invchead_tax_curr_id, invchead_curr_id,
			    _r.rateA + _r.rateB + _r.rateC, invchead_invcdate),
           invchead_tax_ratea = currToCurr(invchead_tax_curr_id,
				invchead_curr_id, _r.rateA, invchead_invcdate),
           invchead_tax_rateb = currToCurr(invchead_tax_curr_id,
				invchead_curr_id, _r.rateB, invchead_invcdate),
           invchead_tax_ratec = currToCurr(invchead_tax_curr_id,
				invchead_curr_id, _r.rateC, invchead_invcdate)
     WHERE (invchead_id=pInvcheadid);
  END IF;

  RETURN;
END;
' LANGUAGE 'plpgsql';
