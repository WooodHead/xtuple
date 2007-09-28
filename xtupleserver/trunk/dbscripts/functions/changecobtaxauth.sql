CREATE OR REPLACE FUNCTION changeCobTaxAuth(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    pcobmiscId		ALIAS FOR $1;
    pTaxauthId		ALIAS FOR $2;
    _freighttaxtype	INTEGER;
    _cobcurr		INTEGER;
    _invcdate		DATE;
    _oldtaxcurr		INTEGER;
    _taxauthid		INTEGER;

  BEGIN

    SELECT COALESCE(cobmisc_taxauth_id,-1), cobmisc_curr_id,
	   COALESCE(cobmisc_invcdate, CURRENT_DATE),
	   COALESCE(cobmisc_tax_curr_id, cobmisc_curr_id)
	     INTO _taxauthid, _cobcurr, _invcdate, _oldtaxcurr
    FROM cobmisc WHERE (cobmisc_id=pcobmiscId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxauthid = pTaxauthId) THEN
      RETURN pcobmiscId;
    END IF;

    IF (pTaxauthId < 0) THEN
      _taxauthid = NULL;
    ELSE
      _taxauthid = pTaxauthId;
    END IF;

    IF (_taxauthid IS NULL) THEN
      UPDATE cobmisc SET cobmisc_taxauth_id=NULL,
			  cobmisc_tax_curr_id=cobmisc_curr_id,
			  cobmisc_adjtax_ratea=NULL,
			  cobmisc_adjtax_rateb=NULL,
			  cobmisc_adjtax_ratec=NULL,
			  cobmisc_freighttax_id=NULL,
			  cobmisc_freighttaxtype_id=NULL
      WHERE cobmisc_id=pcobmiscId;

      UPDATE cobill SET
	cobill_tax_id=NULL,
	cobill_taxtype_id=NULL,
	cobill_tax_pcta=NULL, cobill_tax_pctb=NULL, cobill_tax_pctc=NULL,
	cobill_tax_ratea=NULL, cobill_tax_rateb=NULL, cobill_tax_ratec=NULL
      WHERE (cobill_cobmisc_id=pcobmiscId);

    ELSE -- there is a tax authority with jurisdiction
      SELECT getFreightTaxTypeId()
	    INTO _freighttaxtype;

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE cobmisc SET cobmisc_taxauth_id=_taxauthid,
			  cobmisc_tax_curr_id=_cobcurr,
			  cobmisc_adjtax_ratea=currToCurr(_oldtaxcurr, _cobcurr,
					      cobmisc_adjtax_ratea, _invcdate),
			  cobmisc_adjtax_rateb=currToCurr(_oldtaxcurr, _cobcurr,
					      cobmisc_adjtax_rateb, _invcdate),
			  cobmisc_adjtax_ratec=currToCurr(_oldtaxcurr, _cobcurr,
					      cobmisc_adjtax_ratec, _invcdate),
			  cobmisc_freighttax_id=getTaxSelection(_taxauthid,
							      _freighttaxtype),
			  cobmisc_freighttaxtype_id=_freighttaxtype
      WHERE cobmisc_id=pcobmiscId;

      -- first do the normal case - cobill has an item record
      UPDATE cobill SET
	cobill_tax_id=tax_id,
	cobill_taxtype_id=getItemTaxType(item_id, _taxauthid),
	cobill_tax_pcta=tax_ratea,
	cobill_tax_pctb=tax_rateb,
	cobill_tax_pctc=tax_ratec,
	cobill_tax_ratea=calculateTax(tax_id,
            cobill_qty * coitem_price / COALESCE(iteminvpricerat(item_id), 1), 0, ''A''),
	cobill_tax_rateb=calculateTax(tax_id,
            cobill_qty * coitem_price / COALESCE(iteminvpricerat(item_id), 1), 0, ''B''),
	cobill_tax_ratec=calculateTax(tax_id,
            cobill_qty * coitem_price / COALESCE(iteminvpricerat(item_id), 1), 0, ''C'')
      FROM coitem, itemsite, item, tax
      WHERE ((cobill_coitem_id=coitem_id)
        AND  (coitem_itemsite_id=itemsite_id)
	AND  (itemsite_item_id=item_id)
	AND  (tax_id=getTaxSelection(_taxauthid, getItemTaxType(item_id, _taxauthid)))
	AND  (cobill_cobmisc_id=pcobmiscId));

      -- finally catch those items that have no taxselection
      UPDATE cobill SET
	cobill_tax_id=NULL,
	cobill_tax_pcta=NULL, cobill_tax_pctb=NULL, cobill_tax_pctc=NULL,
	cobill_tax_ratea=NULL, cobill_tax_rateb=NULL, cobill_tax_ratec=NULL
      WHERE ((getTaxSelection(_taxauthid, cobill_taxtype_id) IS NULL)
	AND  (cobill_cobmisc_id=pcobmiscId));
    END IF;

    RETURN pcobmiscId;
  END;
' LANGUAGE 'plpgsql';
