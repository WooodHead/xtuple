CREATE OR REPLACE FUNCTION deleteTaxAuthority(INTEGER) RETURNS INTEGER AS '
DECLARE
  pTaxauthid ALIAS FOR $1;
  _result INTEGER;
BEGIN

  SELECT tax_id
    INTO _result
    FROM tax
   WHERE (tax_taxauth_id=pTaxauthid);
  IF (FOUND) THEN
    RETURN -1;
  END IF;

  SELECT taxreg_id
    INTO _result
    FROM taxreg
   WHERE (taxreg_taxauth_id=pTaxauthid);
  IF (FOUND) THEN
    RETURN -2;
  END IF;

  SELECT checkhead_recip_id INTO _result
    FROM checkhead
   WHERE ((checkhead_recip_id=pTaxauthid)
     AND  (checkhead_recip_type=''T''))
   LIMIT 1;
   IF (FOUND) THEN
     RETURN -7;
   END IF;

  UPDATE crmacct SET crmacct_taxauth_id = NULL
  WHERE (crmacct_taxauth_id=pTaxauthid);

  DELETE
    FROM taxauth
   WHERE (taxauth_id=pTaxauthid);

  RETURN pTaxauthid;

END;
' LANGUAGE 'plpgsql';
