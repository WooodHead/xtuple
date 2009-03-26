CREATE OR REPLACE FUNCTION changeQuoteTaxAuth(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    pquheadId		ALIAS FOR $1;
    pTaxauthId		ALIAS FOR $2;
    _qucurr		INTEGER;
    _oldtaxcurr		INTEGER;
    _taxauthid		INTEGER;
    _taxcurr		INTEGER;

  BEGIN
    SELECT quhead_taxauth_id, quhead_curr_id,
	   COALESCE(taxauth_curr_id, quhead_curr_id)
	     INTO _taxauthid, _qucurr, _oldtaxcurr
    FROM quhead LEFT OUTER JOIN taxauth ON (quhead_taxauth_id=taxauth_id)
    WHERE (quhead_id=pquheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxauthid = pTaxauthId) THEN
      RETURN pquheadId;
    END IF;

    IF (pTaxauthId < 0) THEN
      _taxauthid = NULL;
    ELSE
      _taxauthid = pTaxauthId;
    END IF;

    IF (_taxauthid IS NULL) THEN
      UPDATE quhead SET quhead_taxauth_id=NULL
      WHERE quhead_id=pquheadId;

      UPDATE quitem SET
	quitem_tax_id=NULL
      WHERE (quitem_quhead_id=pquheadId);

    ELSE -- there is a tax authority with jurisdiction
      SELECT COALESCE(taxauth_curr_id, _qucurr) INTO _taxcurr
      FROM taxauth
      WHERE (taxauth_id=_taxauthid);

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE quhead SET quhead_taxauth_id=_taxauthid
      WHERE quhead_id=pquheadId;

      -- normal case
      UPDATE quitem SET quitem_tax_id=tax_id
      FROM itemsite, tax
      WHERE ((itemsite_id=quitem_itemsite_id)
	AND  (tax_id=getTaxSelection(_taxauthid,
				getItemTaxType(itemsite_item_id, _taxauthid)))
	AND  (quitem_quhead_id=pquheadId));

      -- case where taxselection is null
      UPDATE quitem SET quitem_tax_id=NULL
      FROM itemsite, tax
      WHERE ((itemsite_id=quitem_itemsite_id)
        AND  (getTaxSelection(_taxauthid, getItemTaxType(itemsite_item_id,
							 _taxauthid)) IS NULL)
	AND  (quitem_quhead_id=pquheadId));
    END IF;

    RETURN pquheadId;
  END;
' LANGUAGE 'plpgsql';
