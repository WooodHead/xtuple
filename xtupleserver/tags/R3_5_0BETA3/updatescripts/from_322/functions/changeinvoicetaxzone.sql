CREATE OR REPLACE FUNCTION changeinvoicetaxzone(integer, integer)
  RETURNS integer AS
$BODY$
  DECLARE
    pInvcheadId		ALIAS FOR $1;
    pTaxzoneId		ALIAS FOR $2;
    _freighttaxtype	INTEGER;
    _invccurr		INTEGER;
    _invcdate		DATE;
    _taxzoneid		INTEGER;
    _taxcurr		INTEGER;

  BEGIN

    SELECT invchead_taxzone_id, invchead_curr_id, invchead_invcdate,
	   COALESCE(invchead_tax_curr_id, invchead_curr_id)
	     INTO _taxzoneid, _invccurr, _invcdate, _taxcurr
    FROM invchead WHERE (invchead_id = pInvcheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxzoneid = pTaxzoneId) THEN
      RETURN pInvcheadId;
    END IF;

    IF (pTaxzoneId < 0) THEN
      _taxzoneid = NULL;
    ELSE
      _taxzoneid = pTaxzoneId;
    END IF;

    IF (_taxzoneid IS NULL) THEN
      UPDATE invchead SET invchead_taxzone_id = NULL,
			  invchead_tax_curr_id = invchead_curr_id,
			  invchead_freighttaxtype_id = NULL
      WHERE invchead_id = pInvcheadId;

      UPDATE invcitem SET
	invcitem_taxtype_id = NULL
      WHERE (invcitem_invchead_id = pInvcheadId);

    ELSE -- there is a tax zone
      SELECT getfreighttaxtypeid()
	    INTO _freighttaxtype;

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE invchead SET invchead_taxzone_id = _taxzoneid,
			  invchead_tax_curr_id = _taxcurr,
			  invchead_freighttaxtype_id = _freighttaxtype
      WHERE invchead_id = pInvcheadId;

      -- first do the normal case - invcitem has an item record
      UPDATE invcitem SET
	invcitem_taxtype_id = getitemtaxtype(item_id, _taxzoneid)
      FROM item
      WHERE ((item_id = invcitem_item_id)
	AND  (invcitem_invchead_id = pInvcheadId));
      
    END IF;

    RETURN pInvcheadId;
  END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;