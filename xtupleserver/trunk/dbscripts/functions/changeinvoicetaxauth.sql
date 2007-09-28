CREATE OR REPLACE FUNCTION changeInvoiceTaxAuth(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    pInvcheadId		ALIAS FOR $1;
    pTaxauthId		ALIAS FOR $2;
    _freighttaxtype	INTEGER;
    _invccurr		INTEGER;
    _invcdate		DATE;
    _oldtaxcurr		INTEGER;
    _taxauthid		INTEGER;
    _taxcurr		INTEGER;

  BEGIN

    SELECT invchead_taxauth_id, invchead_curr_id, invchead_invcdate,
	   COALESCE(invchead_tax_curr_id, invchead_curr_id)
	     INTO _taxauthid, _invccurr, _invcdate, _oldtaxcurr
    FROM invchead WHERE (invchead_id=pInvcheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxauthid = pTaxauthId) THEN
      RETURN pInvcheadId;
    END IF;

    IF (pTaxauthId < 0) THEN
      _taxauthid = NULL;
    ELSE
      _taxauthid = pTaxauthId;
    END IF;

    IF (_taxauthid IS NULL) THEN
      UPDATE invchead SET invchead_taxauth_id=NULL,
			  invchead_tax_curr_id=invchead_curr_id,
			  invchead_adjtax_ratea=NULL,
			  invchead_adjtax_rateb=NULL,
			  invchead_adjtax_ratec=NULL,
			  invchead_freighttax_id=NULL,
			  invchead_freighttaxtype_id=NULL
      WHERE invchead_id=pInvcheadId;

      UPDATE invcitem SET
	invcitem_tax_id=NULL,
	invcitem_tax_pcta=NULL, invcitem_tax_pctb=NULL, invcitem_tax_pctc=NULL,
	invcitem_tax_ratea=NULL, invcitem_tax_rateb=NULL, invcitem_tax_ratec=NULL
      WHERE (invcitem_invchead_id=pInvcheadId);

    ELSE -- there is a tax authority with jurisdiction
      SELECT COALESCE(taxauth_curr_id, _invccurr), getFreightTaxTypeId()
	    INTO _taxcurr, _freighttaxtype
      FROM taxauth
      WHERE (taxauth_id=_taxauthid);

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE invchead SET invchead_taxauth_id=_taxauthid,
			  invchead_tax_curr_id=_taxcurr,
			  invchead_adjtax_ratea=currToCurr(_oldtaxcurr, _taxcurr,
					      invchead_adjtax_ratea, _invcdate),
			  invchead_adjtax_rateb=currToCurr(_oldtaxcurr, _taxcurr,
					      invchead_adjtax_rateb, _invcdate),
			  invchead_adjtax_ratec=currToCurr(_oldtaxcurr, _taxcurr,
					      invchead_adjtax_ratec, _invcdate),
			  invchead_freighttax_id=getTaxSelection(_taxauthid,
							      _freighttaxtype),
			  invchead_freighttaxtype_id=_freighttaxtype
      WHERE invchead_id=pInvcheadId;

      -- first do the normal case - invcitem has an item record
      UPDATE invcitem SET
	invcitem_tax_id=tax_id,
	invcitem_taxtype_id=getItemTaxType(item_id, _taxauthid),
	invcitem_tax_pcta=tax_ratea,
	invcitem_tax_pctb=tax_rateb,
	invcitem_tax_pctc=tax_ratec,
	invcitem_tax_ratea=currToCurr(_invccurr, _taxcurr,
				      calculateTax(tax_id,
					  invcitem_billed * invcitem_price /
					  COALESCE(iteminvpricerat(item_id), 1),
					  0, ''A''),
				      _invcdate),
	invcitem_tax_rateb=currToCurr(_invccurr, _taxcurr,
				      calculateTax(tax_id,
					  invcitem_billed * invcitem_price /
					  COALESCE(iteminvpricerat(item_id), 1),
					  0, ''B''),
				      _invcdate),
	invcitem_tax_ratec=currToCurr(_invccurr, _taxcurr,
				      calculateTax(tax_id,
					  invcitem_billed * invcitem_price /
					  COALESCE(iteminvpricerat(item_id), 1),
					  0, ''C''),
				      _invcdate)
      FROM item, tax
      WHERE ((item_id=invcitem_item_id)
	AND  (tax_id=getTaxSelection(_taxauthid, getItemTaxType(item_id, _taxauthid)))
	AND  (invcitem_invchead_id=pInvcheadId));

      -- now catch misc items, those without an item record
      UPDATE invcitem SET
	invcitem_tax_id=tax_id,
	invcitem_tax_pcta=tax_ratea,
	invcitem_tax_pctb=tax_rateb,
	invcitem_tax_pctc=tax_ratec,
	invcitem_tax_ratea=currToCurr(_invccurr, _taxcurr,
				      calculateTax(tax_id,
					  invcitem_billed * invcitem_price,
					  0, ''A''),
				      _invcdate),
	invcitem_tax_rateb=currToCurr(_invccurr, _taxcurr,
				      calculateTax(tax_id,
					  invcitem_billed * invcitem_price,
					  0, ''B''),
				      _invcdate),
	invcitem_tax_ratec=currToCurr(_invccurr, _taxcurr,
				      calculateTax(tax_id,
					  invcitem_billed * invcitem_price,
					  0, ''C''),
				      _invcdate)
      FROM tax
      WHERE ((invcitem_item_id NOT IN (SELECT item_id FROM item))
	AND  (tax_id=getTaxSelection(_taxauthid, invcitem_taxtype_id))
	AND  (invcitem_invchead_id=pInvcheadId));

      -- finally catch those items that have no taxselection
      UPDATE invcitem SET
	invcitem_tax_id=NULL,
	invcitem_tax_pcta=NULL, invcitem_tax_pctb=NULL, invcitem_tax_pctc=NULL,
	invcitem_tax_ratea=NULL, invcitem_tax_rateb=NULL, invcitem_tax_ratec=NULL 
      WHERE ((getTaxSelection(_taxauthid, invcitem_taxtype_id) IS NULL)
	AND  (invcitem_invchead_id=pInvcheadId));
    END IF;

    RETURN pInvcheadId;
  END;
' LANGUAGE 'plpgsql';
