CREATE OR REPLACE FUNCTION recalculateCmheadTaxTotal(INTEGER) RETURNS VOID AS '
DECLARE
  pCmheadid ALIAS FOR $1;
  _r RECORD;
BEGIN
  SELECT COALESCE(cmhead_adjtax_ratea, 0.0) +
	 COALESCE(cmhead_freighttax_ratea, 0.0) +
	 COALESCE(SUM(COALESCE(cmitem_tax_ratea, 0.0)), 0.0) AS rateA,
         COALESCE(cmhead_adjtax_rateb, 0.0) +
	 COALESCE(cmhead_freighttax_rateb, 0.0) +
	 COALESCE(SUM(COALESCE(cmitem_tax_rateb, 0.0)), 0.0) AS rateB,
         COALESCE(cmhead_adjtax_ratec, 0.0) +
	 COALESCE(cmhead_freighttax_ratec, 0.0) +
	 COALESCE(SUM(COALESCE(cmitem_tax_ratec, 0.0)), 0.0) AS rateC
    INTO _r
    FROM cmhead LEFT OUTER JOIN cmitem ON (cmitem_cmhead_id=cmhead_id)
   WHERE (cmhead_id=pCmheadid)
   GROUP BY cmhead_adjtax_ratea, cmhead_freighttax_ratea,
            cmhead_adjtax_rateb, cmhead_freighttax_rateb,
            cmhead_adjtax_ratec, cmhead_freighttax_ratec;
  -- cmhead_tax and cmhead_tax_rate[abc] have been retained for
  -- backward-compatibility, so put them in the invoice currency
  IF (FOUND) THEN
    UPDATE cmhead
       SET cmhead_tax = _r.rateA + _r.rateB + _r.rateC,
           cmhead_tax_ratea = _r.rateA,
           cmhead_tax_rateb = _r.rateB,
           cmhead_tax_ratec = _r.rateC
     WHERE (cmhead_id=pCmheadid);
  END IF;

  RETURN;
END;
' LANGUAGE 'plpgsql';
