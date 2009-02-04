CREATE OR REPLACE FUNCTION getFreightTaxSelection(INTEGER) RETURNS INTEGER AS '
DECLARE
  pTaxauthid ALIAS FOR $1;
  _taxtypeid INTEGER;
  _taxid INTEGER;

BEGIN
  _taxtypeid := getFreightTaxTypeId();
  SELECT taxsel_tax_id
    INTO _taxid
    FROM taxsel
   WHERE ((taxsel_taxauth_id=pTaxauthid)
     AND  (taxsel_taxtype_id=_taxtypeid));
  IF (NOT FOUND) THEN
    SELECT taxsel_tax_id
      INTO _taxid
      FROM taxsel
     WHERE ((taxsel_taxauth_id IS NULL)
       AND  (taxsel_taxtype_id=_taxtypeid));
    IF (NOT FOUND) THEN
      RETURN NULL;
    END IF;
  END IF;

  RETURN _taxid;
END;
' LANGUAGE 'plpgsql';
