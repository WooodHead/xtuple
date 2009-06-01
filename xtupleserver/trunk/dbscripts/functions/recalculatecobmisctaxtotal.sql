CREATE OR REPLACE FUNCTION recalculatecobmisctaxtotal(integer)
  RETURNS void AS
$BODY$
DECLARE
  pCobmiscid ALIAS FOR $1;
  _r RECORD;
BEGIN
   SELECT SUM(tax) as tax
    INTO _r
   FROM
	(SELECT COALESCE(taxhist_tax, 0.0)  AS tax
	FROM cobmisc 
	LEFT OUTER JOIN cobmisctax ON (cobmisc_id=taxhist_parent_id)
				AND (cobmisc_freighttaxtype_id = taxhist_taxtype_id)
   WHERE    (cobmisc_id = pCobmiscid)
   UNION ALL                 
   SELECT COALESCE(SUM(COALESCE(taxhist_tax, 0.0)), 0.0) AS tax
   FROM cobmisc 
   LEFT OUTER JOIN cobmisctax ON (cobmisc_id=taxhist_parent_id )
			AND (cobmisc_adjtaxtype_id = taxhist_taxtype_id)
   WHERE (cobmisc_id=pCobmiscid)
   UNION ALL                 
   SELECT COALESCE(SUM(COALESCE(taxhist_tax, 0.0)), 0.0) AS tax
   FROM cobill
   LEFT OUTER JOIN cobilltax ON (cobill_id=taxhist_parent_id )
   WHERE (cobill_cobmisc_id=pCobmiscid)) AS tax;

            
  IF (FOUND) THEN
    UPDATE cobmisc
       SET cobmisc_tax = currToCurr(cobmisc_tax_curr_id, cobmisc_curr_id,_r.tax, cobmisc_invcdate)
     WHERE (cobmisc_id=pCobmiscid);
  END IF;

  RETURN;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;