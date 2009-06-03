CREATE OR REPLACE FUNCTION recalculateinvcheadtaxtotal(integer)
  RETURNS void AS
$BODY$
DECLARE
  pInvcheadid ALIAS FOR $1;
  _r RECORD;
  _tax NUMERIC := 0.0;
BEGIN

    SELECT SUM(tax) as tax
    INTO _r
    FROM
	(
        SELECT COALESCE(taxhist_tax, 0.0)  AS tax
	FROM invchead 
	LEFT OUTER JOIN invcheadtax ON (invchead_id=taxhist_parent_id)
				AND (invchead_freighttaxtype_id = taxhist_taxtype_id)
	WHERE    (invchead_id=pInvcheadid)
	UNION ALL                 
	SELECT COALESCE(SUM(COALESCE(taxhist_tax, 0.0)), 0.0) AS tax
	FROM invchead 
	LEFT OUTER JOIN invcheadtax ON (invchead_id=taxhist_parent_id)
				AND (invchead_adjtaxtype_id = taxhist_taxtype_id)
	WHERE (invchead_id=pInvcheadid)
	UNION ALL                 
	SELECT COALESCE(SUM(COALESCE(taxhist_tax, 0.0)), 0.0) AS tax
	FROM invcitem 
	LEFT OUTER JOIN invcheadtax ON (invcitem_id=taxhist_parent_id)
	WHERE (invcitem_invchead_id=pInvcheadid)
        ) AS tax;
    
   
  IF (FOUND) THEN
    UPDATE invchead
       SET invchead_tax = 
       currToCurr(invchead_tax_curr_id, invchead_curr_id,_r.tax, invchead_invcdate)
     WHERE (invchead_id=pInvcheadid);
  END IF;

  RETURN;
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;