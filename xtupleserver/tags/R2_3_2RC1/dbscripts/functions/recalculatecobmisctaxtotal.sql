CREATE OR REPLACE FUNCTION recalculateCobmiscTaxTotal(INTEGER) RETURNS VOID AS '
DECLARE
  pCobmiscid ALIAS FOR $1;
  _r RECORD;
BEGIN
  SELECT COALESCE(cobmisc_adjtax_ratea, 0.0) + COALESCE(cobmisc_freighttax_ratea, 0.0) + COALESCE(SUM(COALESCE(cobill_tax_ratea, 0.0)), 0.0) AS rateA,
         COALESCE(cobmisc_adjtax_rateb, 0.0) + COALESCE(cobmisc_freighttax_rateb, 0.0) + COALESCE(SUM(COALESCE(cobill_tax_rateb, 0.0)), 0.0) AS rateB,
         COALESCE(cobmisc_adjtax_ratec, 0.0) + COALESCE(cobmisc_freighttax_ratec, 0.0) + COALESCE(SUM(COALESCE(cobill_tax_ratec, 0.0)), 0.0) AS rateC
    INTO _r
    FROM cobmisc LEFT OUTER JOIN cobill ON (cobill_cobmisc_id=cobmisc_id)
   WHERE (cobmisc_id=pCobmiscid)
   GROUP BY cobmisc_adjtax_ratea, cobmisc_freighttax_ratea,
            cobmisc_adjtax_rateb, cobmisc_freighttax_rateb,
            cobmisc_adjtax_ratec, cobmisc_freighttax_ratec;
  IF (FOUND) THEN
    UPDATE cobmisc
       SET cobmisc_tax = _r.rateA + _r.rateB + _r.rateC,
           cobmisc_tax_ratea = _r.rateA,
           cobmisc_tax_rateb = _r.rateB,
           cobmisc_tax_ratec = _r.rateC
     WHERE (cobmisc_id=pCobmiscid);
  END IF;

  RETURN;
END;
' LANGUAGE 'plpgsql';
