CREATE OR REPLACE FUNCTION changeCMHeadTaxAuth(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    pcmheadId		ALIAS FOR $1;
    pTaxauthId		ALIAS FOR $2;
    _cmcurr		INTEGER;
    _cmdate		DATE;
    _freighttaxtype	INTEGER;
    _oldtaxcurr		INTEGER;
    _taxauthid		INTEGER;
    _taxcurr		INTEGER;

  BEGIN
    SELECT cmhead_taxauth_id, cmhead_curr_id, cmhead_docdate,
	   COALESCE(cmhead_tax_curr_id, cmhead_curr_id)
	     INTO _taxauthid, _cmcurr, _cmdate, _oldtaxcurr
    FROM cmhead
    WHERE (cmhead_id=pcmheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxauthid = pTaxauthId) THEN
      RETURN pcmheadId;
    END IF;

    IF (pTaxauthId < 0) THEN
      _taxauthid = NULL;
    ELSE
      _taxauthid = pTaxauthId;
    END IF;

    IF (_taxauthid IS NULL) THEN
      UPDATE cmhead SET cmhead_taxauth_id=NULL,
			cmhead_tax_curr_id=cmhead_curr_id,
			cmhead_adjtax_ratea=NULL,
			cmhead_adjtax_rateb=NULL,
			cmhead_adjtax_ratec=NULL,
			cmhead_freighttax_id=NULL,
			cmhead_freighttaxtype_id=NULL
      WHERE cmhead_id=pcmheadId;

      UPDATE cmitem SET
	cmitem_tax_id=NULL,
	cmitem_taxtype_id=NULL,
	cmitem_tax_pcta=NULL, cmitem_tax_pctb=NULL, cmitem_tax_pctc=NULL,
	cmitem_tax_ratea=NULL, cmitem_tax_rateb=NULL, cmitem_tax_ratec=NULL
      WHERE (cmitem_cmhead_id=pcmheadId);

    ELSE -- there is a tax authority with jurisdiction
      SELECT COALESCE(taxauth_curr_id, _cmcurr), getFreightTaxTypeId()
	    INTO _taxcurr, _freighttaxtype
      FROM taxauth
      WHERE (taxauth_id=_taxauthid);

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE cmhead SET cmhead_taxauth_id=_taxauthid,
			cmhead_tax_curr_id=_taxcurr,
			cmhead_adjtax_ratea=currToCurr(_oldtaxcurr, _taxcurr,
					    cmhead_adjtax_ratea, _cmdate),
			cmhead_adjtax_rateb=currToCurr(_oldtaxcurr, _taxcurr,
					    cmhead_adjtax_rateb, _cmdate),
			cmhead_adjtax_ratec=currToCurr(_oldtaxcurr, _taxcurr,
					    cmhead_adjtax_ratec, _cmdate),
			cmhead_freighttax_id=getTaxSelection(_taxauthid,
							    _freighttaxtype),
			cmhead_freighttaxtype_id=_freighttaxtype
      WHERE cmhead_id=pcmheadId;

      -- first do the normal case
      UPDATE cmitem SET
	cmitem_taxtype_id=getItemTaxType(item_id, _taxauthid),
	cmitem_tax_id=tax_id,
	cmitem_tax_pcta=tax_ratea,
	cmitem_tax_pctb=tax_rateb,
	cmitem_tax_pctc=tax_ratec,
	cmitem_tax_ratea=currToCurr(_cmcurr, _taxcurr,
				      calculateTax(tax_id,
					  (cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice /
					  COALESCE(cmitem_price_invuomratio, 1)),
					  0, ''A''),
				      _cmdate),
	cmitem_tax_rateb=currToCurr(_cmcurr, _taxcurr,
				      calculateTax(tax_id,
					  (cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice /
					  COALESCE(cmitem_price_invuomratio, 1)),
					  0, ''B''),
				      _cmdate),
	cmitem_tax_ratec=currToCurr(_cmcurr, _taxcurr,
				      calculateTax(tax_id,
					  (cmitem_qtycredit * cmitem_qty_invuomratio) * (cmitem_unitprice /
					  COALESCE(cmitem_price_invuomratio, 1)),
					  0, ''C''),
				      _cmdate)
      FROM itemsite, item, tax
      WHERE ((itemsite_id=cmitem_itemsite_id)
	AND  (itemsite_item_id=item_id)
	AND  (tax_id=getTaxSelection(_taxauthid,
				getItemTaxType(itemsite_item_id, _taxauthid)))
	AND  (cmitem_cmhead_id=pcmheadId));

      -- then catch lines that have a null taxselection
      UPDATE cmitem SET
	cmitem_taxtype_id=getItemTaxType(itemsite_item_id, _taxauthid),
	cmitem_tax_id=NULL,
	cmitem_tax_pcta=NULL, cmitem_tax_pctb=NULL, cmitem_tax_pctc=NULL,
	cmitem_tax_ratea=NULL, cmitem_tax_rateb=NULL, cmitem_tax_ratec=NULL
      FROM itemsite, tax
      WHERE ((itemsite_id=cmitem_itemsite_id)
	AND  (getTaxSelection(_taxauthid,
			  getItemTaxType(itemsite_item_id, _taxauthid)) IS NULL)
	AND  (cmitem_cmhead_id=pcmheadId));

    END IF;

    RETURN pcmheadId;
  END;
' LANGUAGE 'plpgsql';
