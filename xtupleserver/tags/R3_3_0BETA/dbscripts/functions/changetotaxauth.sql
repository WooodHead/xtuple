CREATE OR REPLACE FUNCTION changeTOTaxAuth(INTEGER, INTEGER) RETURNS INTEGER AS '
  DECLARE
    ptoheadid		ALIAS FOR $1;
    ptaxauthId		ALIAS FOR $2;
    _oldtaxcurr		INTEGER;
    _taxauthid		INTEGER;
    _taxcurr		INTEGER;
    _tocurr		INTEGER;

  BEGIN
    SELECT tohead_taxauth_id, tohead_freight_curr_id,
	   COALESCE(taxauth_curr_id, tohead_freight_curr_id)
	     INTO _taxauthid, _tocurr, _oldtaxcurr
    FROM tohead LEFT OUTER JOIN taxauth ON (tohead_taxauth_id=taxauth_id)
    WHERE (tohead_id=ptoheadid);

    IF (NOT FOUND) THEN
      RETURN -1;
    ELSIF (_taxauthid = ptaxauthid OR
	   (_taxauthid IS NULL AND ptaxauthid IS NULL)) THEN
      RETURN ptoheadid;
    END IF;

    IF (ptaxauthid < 0) THEN
      _taxauthid = NULL;
    ELSE
      _taxauthid = ptaxauthId;
    END IF;

    IF (_taxauthid IS NULL) THEN
      UPDATE tohead SET tohead_taxauth_id=NULL
      WHERE tohead_id=ptoheadid;

      UPDATE toitem SET
	toitem_freighttax_id=NULL
      WHERE (toitem_tohead_id=ptoheadid);

    ELSE -- there is a tax authority with jurisdiction
      SELECT COALESCE(taxauth_curr_id, _tocurr) INTO _taxcurr
      FROM taxauth
      WHERE (taxauth_id=_taxauthid);

      IF (NOT FOUND) THEN
	RETURN -2;
      END IF;

      UPDATE tohead SET tohead_taxauth_id=_taxauthid
      WHERE tohead_id=ptoheadid;

      -- normal case
      UPDATE toitem SET toitem_freighttax_id=tax_id
      FROM tax
      WHERE ((tax_id=getTaxSelection(_taxauthid,
			      getItemTaxType(toitem_item_id, _taxauthid)))
	AND  (toitem_tohead_id=ptoheadid));

      -- case where taxselection is null
      UPDATE toitem SET toitem_freighttax_id=NULL
      FROM tax
      WHERE ((getTaxSelection(_taxauthid,
		      getItemTaxType(toitem_item_id, _taxauthid)) IS NULL)
	AND  (toitem_tohead_id=ptoheadid));
    END IF;

    RETURN ptoheadid;
  END;
' LANGUAGE 'plpgsql';
