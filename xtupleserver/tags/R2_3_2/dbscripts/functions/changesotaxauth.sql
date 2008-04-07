CREATE OR REPLACE FUNCTION changeSOTaxAuth(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    pcoheadId		ALIAS FOR $1;
    pTaxauthId		ALIAS FOR $2;
    _socurr		INTEGER;
    _oldtaxcurr		INTEGER;
    _taxauthid		INTEGER;
    _taxcurr		INTEGER;

  BEGIN
    SELECT cohead_taxauth_id, cohead_curr_id,
	   COALESCE(taxauth_curr_id, cohead_curr_id)
	     INTO _taxauthid, _socurr, _oldtaxcurr
    FROM cohead LEFT OUTER JOIN taxauth ON (cohead_taxauth_id=taxauth_id)
    WHERE (cohead_id=pcoheadId);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxauthid = pTaxauthId) THEN
      RETURN pcoheadId;
    END IF;

    IF (pTaxauthId < 0) THEN
      _taxauthid = NULL;
    ELSE
      _taxauthid = pTaxauthId;
    END IF;

    IF (_taxauthid IS NULL) THEN
      UPDATE cohead SET cohead_taxauth_id=NULL
      WHERE cohead_id=pcoheadId;

      UPDATE coitem SET
	coitem_tax_id=NULL
      WHERE (coitem_cohead_id=pcoheadId);

    ELSE -- there is a tax authority with jurisdiction
      SELECT COALESCE(taxauth_curr_id, _socurr) INTO _taxcurr
      FROM taxauth
      WHERE (taxauth_id=_taxauthid);

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE cohead SET cohead_taxauth_id=_taxauthid
      WHERE cohead_id=pcoheadId;

      -- normal case
      UPDATE coitem SET coitem_tax_id=tax_id
      FROM itemsite, tax
      WHERE ((itemsite_id=coitem_itemsite_id)
	AND  (tax_id=getTaxSelection(_taxauthid,
				getItemTaxType(itemsite_item_id, _taxauthid)))
	AND  (coitem_cohead_id=pcoheadId));

      -- case where taxselection is null
      UPDATE coitem SET coitem_tax_id=NULL
      FROM itemsite, tax
      WHERE ((itemsite_id=coitem_itemsite_id)
        AND  (getTaxSelection(_taxauthid, getItemTaxType(itemsite_item_id,
							 _taxauthid)) IS NULL)
	AND  (coitem_cohead_id=pcoheadId));
    END IF;

    RETURN pcoheadId;
  END;
' LANGUAGE 'plpgsql';
