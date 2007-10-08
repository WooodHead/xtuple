CREATE OR REPLACE FUNCTION deleteTaxAuthority(INTEGER) RETURNS INTEGER AS '
DECLARE
  pTaxauthid ALIAS FOR $1;
  _result INTEGER;
BEGIN

  SELECT taxsel_id
    INTO _result
    FROM taxsel
   WHERE (taxsel_taxauth_id=pTaxauthid);
  IF (FOUND) THEN
    RETURN -1;
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
