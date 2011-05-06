CREATE OR REPLACE FUNCTION changecobtaxzone(integer, integer)
  RETURNS integer AS
$BODY$
  DECLARE
    pcobmiscId		ALIAS FOR $1;
    pTaxzoneId		ALIAS FOR $2;
    _freighttaxtype	INTEGER;
    _cobcurr		INTEGER;
    _invcdate		DATE;
    _oldtaxcurr		INTEGER;
    _taxzoneid		INTEGER;

  BEGIN

    SELECT COALESCE(cobmisc_taxzone_id,-1), cobmisc_curr_id,
	   COALESCE(cobmisc_invcdate, CURRENT_DATE),
	   COALESCE(cobmisc_tax_curr_id, cobmisc_curr_id)
    INTO _taxzoneid, _cobcurr, _invcdate, _oldtaxcurr
    FROM cobmisc WHERE (cobmisc_id=pcobmiscId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxzoneid = pTaxzoneId) THEN
      RETURN pcobmiscId;
    END IF;

    IF (pTaxzoneId < 0) THEN
      _taxzoneid = NULL;
    ELSE
      _taxzoneid = pTaxzoneId;
    END IF;

    IF (_taxzoneid IS NULL) THEN --if taxzone is null
      UPDATE cobmisc SET cobmisc_taxzone_id = NULL,
			  cobmisc_tax_curr_id = cobmisc_curr_id,
			  cobmisc_freighttaxtype_id = NULL
      WHERE cobmisc_id = pcobmiscId;

      UPDATE cobill SET --if taxzone is null
	cobill_taxtype_id = NULL
      WHERE (cobill_cobmisc_id = pcobmiscId);

    ELSE -- there is a tax authority with jurisdiction
      SELECT getfreighttaxtypeid()
	    INTO _freighttaxtype;

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE cobmisc SET cobmisc_taxzone_id = _taxzoneid,--NR currency part
			  cobmisc_tax_curr_id = _cobcurr,
			  cobmisc_freighttaxtype_id = _freighttaxtype
      WHERE cobmisc_id = pcobmiscId;

      -- first do the normal case - cobill has an item record
      UPDATE cobill SET --to be changed
	cobill_taxtype_id = getitemtaxtype(item_id, _taxzoneid)
      FROM coitem, itemsite, item
      WHERE ((cobill_coitem_id = coitem_id)
        AND  (coitem_itemsite_id = itemsite_id)
	AND  (itemsite_item_id = item_id)
	AND  (cobill_cobmisc_id = pcobmiscId));

    END IF;

    RETURN pcobmiscId;
  END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;